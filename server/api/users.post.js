import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Initialize lowdb
  const adapter = new JSONFile('db.json')
  const db = new Low(adapter, {})
  await db.read()

  // Ensure users array exists
  if (!db.data.users) {
    db.data.users = []
  }

  // Check if username already exists
  const existingUser = db.data.users.find(u => u.username === body.username)
  if (existingUser) {
    throw createError({ statusCode: 400, statusMessage: 'Username already exists' })
  }

  // Generate new ID
  const newId = db.data.users.length > 0 ? Math.max(...db.data.users.map(u => u.id)) + 1 : 1

  const hashedPassword = await bcrypt.hash(body.password, 10)

  const newUser = {
    id: newId,
    username: body.username,
    password: hashedPassword,
    role: body.role,
    name: body.name || '',
    email: body.email || '',
    father_name: body.father_name || '',
    mother_name: body.mother_name || '',
    nid: body.nid || '',
    address: body.address || '',
    phone: body.phone || ''
  }

  db.data.users.push(newUser)
  await db.write()

  // Return user without password
  const { password, ...userWithoutPassword } = newUser
  return userWithoutPassword
})
