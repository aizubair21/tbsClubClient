import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

const SECRET = 'committee_secret_key'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)
  const { username, password, phone } = body

  // Initialize lowdb
  const adapter = new JSONFile('db.json')
  const db = new Low(adapter, {})
  await db.read()

  const users = db.data.users || []
  let user

  if (phone) {
    // Phone-based login (no password required)
    user = users.find(u => u.phone === phone)
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'User not found'
      })
    }
  } else {
    // Username/password login
    user = users.find(u => u.username === username)
    if (!user) {
      throw createError({
        statusCode: 401,
        statusMessage: 'User not found'
      })
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw createError({
        statusCode: 401,
        statusMessage: 'Invalid credentials'
      })
    }
  }

  const token = jwt.sign({ id: user.id, role: user.role }, SECRET, { expiresIn: '1h' })
  return { token, role: user.role }
})
