// import { readSheet } from '~/server/utils/googleSheets'

// export default defineEventHandler(async (event) => {
//   const { GOOGLE_SHEET_TAB_NAME } = process.env

//   try {
//     const deposits = await readSheet(GOOGLE_SHEET_TAB_NAME || 'deposits')
//     return deposits
//   } catch (error) {
//     console.error('Error fetching deposits:', error)
//     throw createError({
//       statusCode: error.status || 500,
//       statusMessage: error.message || 'Failed to fetch deposits from Google Sheet'
//     })
//   }
// })


// server/api/sheets.get.ts
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const range = query.range || 'Transactions!A:L' // Allow dynamic range

  const url = `${config.public.endpoint}/${config.private.spreadsheetId}/values/${range}?key=${config.private.googleApiKey}`

  try {
    const response = await $fetch(url)
    return response.values.reverse();
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, message: 'Failed to fetch sheet data' })
  }
})
