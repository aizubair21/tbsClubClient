export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const query = getQuery(event)
  const range = query.range || 'Users!A:S' // Allow dynamic range

  const url = `${config.public.endpoint}/${config.private.spreadsheetId}/values/${range}?key=${config.private.googleApiKey}`

  try {
    const response = await $fetch(url)
    return response.values;
  } catch (error) {
    console.error(error)
    throw createError({ statusCode: 500, message: 'Failed to fetch sheet data' })
  }
})