import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)
  const body = await readBody(event)

  // Initialize lowdb
  const adapter = new JSONFile('db.json')
  const db = new Low(adapter, {})
  await db.read()

  // Find and update member
  const memberIndex = db.data.members.findIndex(m => m.id === id)
  if (memberIndex === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Member not found' })
  }

  db.data.members[memberIndex] = {
    ...db.data.members[memberIndex],
    code: body.code,
    name: body.name,
    approved: body.approved
  }

  await db.write()

  return db.data.members[memberIndex]
})
