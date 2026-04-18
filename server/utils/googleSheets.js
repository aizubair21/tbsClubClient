import { google } from 'googleapis'

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets']

// Get auth client for Google Sheets
const getAuthClient = () => {
  const { GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY } = process.env

  const auth = new google.auth.JWT(
    GOOGLE_SERVICE_ACCOUNT_EMAIL,
    null,
    GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    SCOPES
  )

  return auth
}

// Get the sheets instance
const getSheets = () => {
  const auth = getAuthClient()
  return google.sheets({ version: 'v4', auth })
}

// Read all data from a sheet
export const readSheet = async (sheetName) => {
  const { GOOGLE_SHEET_ID } = process.env
  const sheets = getSheets()

  try {
    const response = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: sheetName
    })

    const rows = response.data.values || []
    
    if (rows.length === 0) {
      return []
    }

    // First row is headers
    const headers = rows[0].map(h => h.trim())
    
    // Map rows to objects
    const data = rows.slice(1).map(row => {
      const obj = {}
      headers.forEach((header, index) => {
        obj[header] = row[index] || ''
      })
      return obj
    })

    return data
  } catch (error) {
    console.error('Error reading sheet:', error)
    throw error
  }
}

// Append a new row to the sheet
export const appendRow = async (sheetName, data) => {
  const { GOOGLE_SHEET_ID } = process.env
  const sheets = getSheets()

  try {
    // First get headers
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${sheetName}!1:1`
    })

    const headers = headerResponse.data.values?.[0] || []
    
    // Create row data in the order of headers
    const rowData = headers.map(header => {
      const key = header.trim()
      return data[key] !== undefined ? String(data[key]) : ''
    })

    const response = await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: sheetName,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData]
      }
    })

    return response.data
  } catch (error) {
    console.error('Error appending row:', error)
    throw error
  }
}

// Update an existing row in the sheet
export const updateRow = async (sheetName, rowIndex, data) => {
  const { GOOGLE_SHEET_ID } = process.env
  const sheets = getSheets()

  try {
    // First get headers
    const headerResponse = await sheets.spreadsheets.values.get({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: `${sheetName}!1:1`
    })

    const headers = headerResponse.data.values?.[0] || []
    
    // Create row data in the order of headers
    const rowData = headers.map(header => {
      const key = header.trim()
      return data[key] !== undefined ? String(data[key]) : ''
    })

    const range = `${sheetName}!${rowIndex}:${rowIndex}`
    
    const response = await sheets.spreadsheets.values.update({
      spreadsheetId: GOOGLE_SHEET_ID,
      range,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [rowData]
      }
    })

    return response.data
  } catch (error) {
    console.error('Error updating row:', error)
    throw error
  }
}

// Delete a row from the sheet (by clearing its contents)
export const deleteRow = async (sheetName, rowIndex) => {
  const { GOOGLE_SHEET_ID } = process.env
  const sheets = getSheets()

  try {
    const range = `${sheetName}!${rowIndex}:${rowIndex}`
    
    const response = await sheets.spreadsheets.values.clear({
      spreadsheetId: GOOGLE_SHEET_ID,
      range
    })

    return response.data
  } catch (error) {
    console.error('Error deleting row:', error)
    throw error
  }
}

// Find row index by ID
export const findRowById = async (sheetName, id) => {
  const data = await readSheet(sheetName)
  const rowIndex = data.findIndex(row => String(row.ID) === String(id))
  
  // Row index in Google Sheets is 1-based and +2 because:
  // 1 = header row, data starts at row 2
  return rowIndex !== -1 ? rowIndex + 2 : -1
}
