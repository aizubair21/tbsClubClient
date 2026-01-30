import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)

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

  db.data.users.splice(userIndex, 1)
  await db.write()

  return { message: 'User deleted successfully' }
})
