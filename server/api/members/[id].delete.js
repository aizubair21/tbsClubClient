import { Low } from 'lowdb'
import { JSONFile } from 'lowdb/node'

export default defineEventHandler(async (event) => {
  const id = parseInt(event.context.params.id)

  // Initialize lowdb
  const adapter = new JSONFile('db.json')
  const db = new Low(adapter, {})
  await db.read()

  // Find and remove member
  const memberIndex = db.data.members.findIndex(m => m.id === id)
  if (memberIndex === -1) {
    throw createError({ statusCode: 404, statusMessage: 'Member not found' })
  }

  const deletedMember = db.data.members.splice(memberIndex, 1)[0]
  await db.write()

  return deletedMember
})
