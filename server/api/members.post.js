import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Initialize lowdb
  const adapter = new JSONFile('db.json')
  const db = new Low(adapter, {})
  await db.read()

  // Ensure users array exists
  if (!db.data.members) {
    db.data.members = []
  }

  // Generate new ID
  const newId = db.data.members.length > 0 ? Math.max(...db.data.members.map(u => u.id)) + 1 : 1

  const newUser = {
    id: newId,
    username: body.username,
    name: body.name,
    email: body.email,
    father_name: body.father_name,
    mother_name: body.mother_name,
    nid: body.nid,
    address: body.address,
    role: body.role,
    phone: body.phone
  }

  db.data.members.push(newUser)
  await db.write()

  return newUser
})
