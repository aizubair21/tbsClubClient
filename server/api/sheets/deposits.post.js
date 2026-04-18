import { appendRow } from '~/server/utils/googleSheets'

export default defineEventHandler(async (event) => {
  const { GOOGLE_SHEET_TAB_NAME } = process.env
  const body = await readBody(event)

  try {
    // Generate new ID (find max ID and add 1)
    const { readSheet } = await import('~/server/utils/googleSheets')
    const existingData = await readSheet(GOOGLE_SHEET_TAB_NAME || 'deposits')
    
    let newId = 1
    if (existingData.length > 0) {
      const maxId = Math.max(...existingData
        .map(row => parseInt(row.ID) || 0)
        .filter(id => !isNaN(id)))
      newId = maxId + 1
    }

    // Add the new ID to the data
    const depositData = {
      ...body,
      ID: newId.toString()
    }

    const result = await appendRow(GOOGLE_SHEET_TAB_NAME || 'deposits', depositData)
    
    return {
      success: true,
      message: 'Deposit created successfully',
      data: depositData
    }
  } catch (error) {
    console.error('Error creating deposit:', error)
    throw createError({
      statusCode: error.status || 500,
      statusMessage: error.message || 'Failed to create deposit'
    })
  }
})
