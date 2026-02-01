export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const headers = getHeaders(event)

  try {
    const response = await $fetch('https://tbs-vercel.vercel.app/members', {
      method: 'POST',
      body: body,
      headers: headers
    })
    return response
  } catch (error) {
    throw createError({ statusCode: error.status || 500, statusMessage: error.message || 'Internal Server Error' })
  }
})
