// server/api/session/session.get.ts
import gss from '../../../services/GSS.service';
import { sheetConfigs } from '../../../Credentials/sheets.config';

export default defineEventHandler(async (event) => {
  try {
    const sessions = await gss.getSheetData(sheetConfigs.sessions)
    
    return sessions
  } catch (error) {
    console.error('Error fetching sessions:', error)
    throw createError({ statusCode: 500, message: 'Failed to fetch sessions' })
  }
})