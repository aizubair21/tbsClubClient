import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'
import bcrypt from 'bcryptjs'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  const body = await readBody(event)

  // Initialize lowdb
  const adapter = new JSONFile('db.json')
  const db = new Low(adapter, {})
  await db.read()

  // Ensure users array exists
  if (!db.data.users) {
    db.data.users = []
  }

  const userIndex = db.data.users.findIndex(u => u.id === id)
  if (userIndex === -1) {
    throw createError({ statusCode: 404, statusMessage: 'User not found' })
  }

  const user = db.data.users[userIndex]

  // Update fields
  if (body.username) user.username = body.username
  if (body.role) user.role = body.role
  if (body.name) user.name = body.name
  if (body.email) user.email = body.email
  if (body.father_name) user.father_name = body.father_name
  if (body.mother_name) user.mother_name = body.mother_name
  if (body.nid) user.nid = body.nid
  if (body.address) user.address = body.address
  if (body.phone) user.phone = body.phone

  // Update password if provided
  if (body.password) {
    user.password = await bcrypt.hash(body.password, 10)
  }

  await db.write()

  // Return user without password
  const { password, ...userWithoutPassword } = user
  return userWithoutPassword
})
