import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

export default defineEventHandler(async (event) => {
  const headers = getHeaders(event)
  const authHeader = headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, statusMessage: 'Unauthorized' })
  }

  const token = authHeader.substring(7)
  if (token !== 'authenticated') {
    throw createError({ statusCode: 401, statusMessage: 'Invalid token' })
  }

  const userId = parseInt(headers['x-user-id'])
  if (!userId) {
    throw createError({ statusCode: 400, statusMessage: 'User ID required' })
  }

  // Initialize lowdb
  const adapter = new JSONFile('db.json')
  const db = new Low(adapter, {})
  await db.read()

  const users = db.data.users || []
  const user = users.find(u => u.id === userId)
  if (!user || user.role !== 'admin') {
    throw createError({ statusCode: 403, statusMessage: 'Forbidden: Admin access required' })
  }

  const id = parseInt(event.context.params.id)
  if (!id) {
    throw createError({ statusCode: 400, statusMessage: 'Invalid deposit ID' })
  }

  const deposits = db.data.deposits || []
  const depositIndex = deposits.findIndex(d => d.id === id)
  if (depositIndex === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Deposit not found' })
  }

  deposits.splice(depositIndex, 1)
  await db.write()

  return { message: 'Deposit deleted successfully' }
})
