import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // Initialize lowdb
  const adapter = new JSONFile('db.json')
  const db = new Low(adapter, {})
  await db.read()

  // Ensure members array exists
  if (!db.data.members) {
    db.data.members = []
  }

  // Generate new ID
  const newId = db.data.members.length > 0 ? Math.max(...db.data.members.map(m => m.id)) + 1 : 1

  const newMember = {
    id: newId,
    code: body.code,
    name: body.name,
    approved: body.approved
  }

  db.data.members.push(newMember)
  await db.write()

  return newMember
})
