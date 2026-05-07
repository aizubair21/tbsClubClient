// server/api/sessions/[id].put.ts
import { google } from 'googleapis'

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
  try {
    const id = parseInt(event.context.params?.id || '0')
    const body = await readBody(event)
    const { sessionName, monthlyDeposit, yearlyDeposit, totalDeposit } = body
    
    const auth = new google.auth.GoogleAuth({
      keyFile: 'server/Credentials/tarokaraji-e3946aeb32ae.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })
    
    const authClient = await auth.getClient()
    const sheets = google.sheets({ version: 'v4', auth: authClient as any })
    
    const spreadsheetId = config.spreadsheetId
    const rowNumber = id // Because rows are 1-indexed in Sheets
    
    const updateRange = `Sessions!A${rowNumber}:E${rowNumber}`
    const updatedRow = [
      sessionName,
      monthlyDeposit.toString(),
      yearlyDeposit.toString(),
      totalDeposit?.toString() || '0',
      new Date().toISOString()
    ]
    
    await sheets.spreadsheets.values.update({
      spreadsheetId,
      range: updateRange,
      valueInputOption: 'USER_ENTERED',
      requestBody: {
        values: [updatedRow]
      }
    })
    
    return {
      success: true,
      message: 'Session updated successfully',
      data: { id, ...body }
    }
    
  } catch (error: any) {
    console.error('Sessions Update Error:', error.message)
    throw createError({
      statusCode: 500,
      message: 'Failed to update session'
    })
  }
})