// server/services/googleSheets.service.ts
import { google } from 'googleapis'
const config = useRuntimeConfig();
interface SheetConfig {
  sheetName: string
  range: string
  columns: string[]
}

class GoogleSheetsService {
  private auth: any
  private spreadsheetId: string

  constructor() {
    this.spreadsheetId = config.spreadsheetId
  }

  private async getAuth() {
    if (!this.auth) {
      this.auth = new google.auth.GoogleAuth({
        keyFile: 'server/Credentials/tarokaraji-e3946aeb32ae.json',
        scopes: ['https://www.googleapis.com/auth/spreadsheets']
      })
    }
    return this.auth
  }

  private async getSheets() {
    const auth = await this.getAuth()
    const authClient = await auth.getClient()
    return google.sheets({ version: 'v4', auth: authClient as any })
  }

  // Get all data from a sheet
  async getSheetData(sheetConfig: SheetConfig) {
    try {
      const sheets = await this.getSheets()
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetConfig.sheetName}!${sheetConfig.range}`
      })
      
      const rows = response.data.values || []
      if (rows.length === 0) return []
      
      // Convert to objects with column names
      const headers = sheetConfig.columns
      const data = rows.slice(1).map((row: any[], index: number) => {
        const obj: any = { id: index, rowNumber: index + 2 } // +2 because of header and 0-index
        headers.forEach((header, idx) => {
          obj[header] = row[idx] || ''
        })
        return obj
      })
      
      return data
    } catch (error) {
      console.error(`Error fetching data from ${sheetConfig.sheetName}:`, error)
      throw error
    }
  }

  // Get single row by ID
  async getRowById(sheetConfig: SheetConfig, id: number) {
    try {
      const sheets = await this.getSheets()
      const rowNumber = id + 2 // +2 for header and 0-index
      const response = await sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetConfig.sheetName}!A${rowNumber}:${String.fromCharCode(65 + sheetConfig.columns.length - 1)}${rowNumber}`
      })
      
      const row = response.data.values?.[0] || []
      const obj: any = { id, rowNumber }
      sheetConfig.columns.forEach((header, idx) => {
        obj[header] = row[idx] || ''
      })
      
      return obj
    } catch (error) {
      console.error(`Error fetching row ${id} from ${sheetConfig.sheetName}:`, error)
      throw error
    }
  }

  // Create new row
  async createRow(sheetConfig: SheetConfig, data: Record<string, any>) {
    try {
      const sheets = await this.getSheets()
      
      // Get current data to find next row
      const currentData = await sheets.spreadsheets.values.get({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetConfig.sheetName}!${sheetConfig.range}`
      })
      
      const nextRow = (currentData.data.values?.length || 1) + 1
      
      // Prepare row data in correct column order
      const rowData = sheetConfig.columns.map(column => {
        const value = data[column]
        return value !== undefined && value !== null ? value.toString() : ''
      })
      
      // Add timestamp if column exists
      const hasTimestamp = sheetConfig.columns.includes('created_at')
      if (hasTimestamp && !data.created_at) {
        const timestampIndex = sheetConfig.columns.indexOf('created_at')
        rowData[timestampIndex] = new Date().toISOString()
      }
      
      // Append to sheet
      await sheets.spreadsheets.values.append({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetConfig.sheetName}!A${nextRow}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [rowData]
        }
      })
      
      return { success: true, id: nextRow - 2, rowNumber: nextRow }
    } catch (error) {
      console.error(`Error creating row in ${sheetConfig.sheetName}:`, error)
      throw error
    }
  }

  // Update existing row
  async updateRow(sheetConfig: SheetConfig, id: number, data: Record<string, any>) {
    try {
      const sheets = await this.getSheets()
      const rowNumber = id + 2
      
      // Prepare updated row data
      const rowData = sheetConfig.columns.map(column => {
        const value = data[column]
        return value !== undefined && value !== null ? value.toString() : ''
      })
      
      // Update timestamp if column exists
      const hasUpdatedAt = sheetConfig.columns.includes('updated_at')
      if (hasUpdatedAt) {
        const updatedAtIndex = sheetConfig.columns.indexOf('updated_at')
        rowData[updatedAtIndex] = new Date().toISOString()
      }
      
      await sheets.spreadsheets.values.update({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetConfig.sheetName}!A${rowNumber}:${String.fromCharCode(65 + sheetConfig.columns.length - 1)}${rowNumber}`,
        valueInputOption: 'USER_ENTERED',
        requestBody: {
          values: [rowData]
        }
      })
      
      return { success: true, id, rowNumber }
    } catch (error) {
      console.error(`Error updating row ${id} in ${sheetConfig.sheetName}:`, error)
      throw error
    }
  }

  // Delete row (clear content)
  async deleteRow(sheetConfig: SheetConfig, id: number) {
    try {
      const sheets = await this.getSheets()
      const rowNumber = id + 2
      
      await sheets.spreadsheets.values.clear({
        spreadsheetId: this.spreadsheetId,
        range: `${sheetConfig.sheetName}!A${rowNumber}:${String.fromCharCode(65 + sheetConfig.columns.length - 1)}${rowNumber}`
      })
      
      return { success: true, id }
    } catch (error) {
      console.error(`Error deleting row ${id} from ${sheetConfig.sheetName}:`, error)
      throw error
    }
  }

  // Search/filter data
  async searchData(sheetConfig: SheetConfig, filters: Record<string, any>) {
    const allData = await this.getSheetData(sheetConfig)
    return allData.filter(row => {
      return Object.entries(filters).every(([key, value]) => {
        if (!value) return true
        const rowValue = row[key]?.toString().toLowerCase()
        const searchValue = value.toString().toLowerCase()
        return rowValue?.includes(searchValue)
      })
    })
  }
}

export default new GoogleSheetsService()