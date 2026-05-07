// server/api/sessions/[id].delete.ts
import { google } from 'googleapis'

export default defineEventHandler(async (event) => {
	const config = useRuntimeConfig()
  try {
    const id = parseInt(event.context.params?.id || '0')
    
    const auth = new google.auth.GoogleAuth({
      keyFile: 'server/Credentials/tarokaraji-e3946aeb32ae.json',
      scopes: ['https://www.googleapis.com/auth/spreadsheets']
    })
    
    const authClient = await auth.getClient()
    const sheets = google.sheets({ version: 'v4', auth: authClient as any })
    
    const spreadsheetId = config.spreadsheetId
    const rowNumber = id + 1
    
    // Clear the row data
    await sheets.spreadsheets.values.clear({
      spreadsheetId,
      range: `Sessions!A${rowNumber}:E${rowNumber}`
    })
    
    return {
      success: true,
      message: 'Session deleted successfully'
    }
    
  } catch (error: any) {
    console.error('Sessions Delete Error:', error.message)
    throw createError({
      statusCode: 500,
      message: 'Failed to delete session'
    })
  }
})