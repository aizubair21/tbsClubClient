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

  const body = await readBody(event)

  // Ensure deposits array exists
  if (!db.data.deposits) {
    db.data.deposits = []
  }

  // Generate new ID
  const newId = db.data.deposits.length > 0 ? Math.max(...db.data.deposits.map(d => d.id)) + 1 : 1

  const newDeposit = {
    id: newId,
    member_code: body.member_code,
    amount: body.amount,
    type: body.type,
    session: body.session,
    month: body.month,
    method: body.method,
    pay_to: body.pay_to,
    send_number: body.send_number || '',
    receive_number: body.receive_number || '',
    date: body.date,
    trx_id: body.trx_id || '',
    created_at: body.created_at || new Date().toISOString()
  }

  db.data.deposits.push(newDeposit)
  await db.write()

  return newDeposit
})
