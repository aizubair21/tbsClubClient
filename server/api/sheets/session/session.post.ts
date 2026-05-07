// server/api/sessions.post.ts
import { google } from 'googleapis'

export default defineEventHandler(async (event) => {

  const config = useRuntimeConfig()

  try {
    const body = await readBody(event)
    const { sessionName, monthlyDeposit, yearlyDeposit, totalDeposit } = body
    
    // Validate required fields
    if (!sessionName || !monthlyDeposit || !yearlyDeposit) {
      throw createError({
        statusCode: 400,
        message: 'Session name, monthly deposit and yearly deposit are required'
      })
    }
    
    // Authenticate using service account
    const auth = new google.auth.GoogleAuth({
      keyFile: 'server/Credentials/tarokaraji-e3946aeb32ae.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })
    
    const authClient = await auth.getClient()
    const sheets = google.sheets({ version: 'v4', auth: authClient as any })
    
    // Your spreadsheet ID
    const spreadsheetId = config.spreadsheetId
    
    // Get current data to find next row
    const getResponse = await sheets.spreadsheets.values.get({
      spreadsheetId,
      range: 'Sessions!A:E' // Assuming columns: Session Name, Monthly Deposit, Yearly Deposit, Total Deposit, Created At
    })
    
    const rows = getResponse.data.values || []
    const nextRow = rows.length + 1
    
    // Prepare new row data
    const newRow = [
      sessionName,
      monthlyDeposit.toString(),
      yearlyDeposit.toString(),
      totalDeposit?.toString() || '0',
      new Date().toISOString()
    ]
    
    // Append to sheet
    const appendResponse = await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: `Sessions!A${nextRow}:E${nextRow}`,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [newRow]
      }
    })
    
    return {
      success: true,
      message: 'Session created successfully',
      data: {
        sessionName,
        monthlyDeposit,
        yearlyDeposit,
        totalDeposit: totalDeposit || 0,
        row: nextRow
      }
    }
    
  } catch (error: any) {
    console.error('Sessions API Error:', error.message)
    throw createError({
      statusCode: 500,
      message: error.message || 'Failed to create session'
    })
  }
})