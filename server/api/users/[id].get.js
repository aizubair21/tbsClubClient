export default defineEventHandler(async (event) => {
  const id = event.context.params.id
  const headers = getHeaders(event)

  try {
    const response = await $fetch(`https://tbs-vercel.vercel.app/users/${id}`, {
      method: 'GET',
      headers: headers
    })
    return response
  } catch (error) {
    throw createError({ statusCode: error.status || 500, statusMessage: error.message || 'Internal Server Error' })
  }
})
