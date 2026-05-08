// server/api/[sheet]/index.ts

import CRUDManagerService from '../../../services/crudManager.service'
import { registerSchemas } from '../../../init/schemas'

// Register schemas once
registerSchemas()

export default defineEventHandler(async (event) => {
  const sheet = event.context.params?.sheet
  const method = event.node.req.method
  const query = getQuery(event)
  const id = query.id ? parseInt(query.id as string) : null

  if (!sheet) {
    throw createError({ statusCode: 400, message: 'Sheet name is required' })
  }

  try {
    //console.log('API [sheet] index registered');

    // GET operations
    if (method === 'GET') {
      if (id !== null && !isNaN(id)) {
        // Get single record
        const record = await CRUDManagerService.getById(sheet, id)
        if (!record || Object.keys(record).length === 0) {
          throw createError({ statusCode: 404, message: 'Record not found' })
        }
        return record
      } else if (query.search) {
        // Search records
        const filters = typeof query.search === 'string' ? JSON.parse(query.search) : query.search
        const results = await CRUDManagerService.search(sheet, filters)
        return results
      } else if (query.stats === 'true') {
        // Get statistics
        const stats = await CRUDManagerService.getStats(sheet)
        return stats
      } else {
        // Get all records
        const records = await CRUDManagerService.getAll(sheet)
        return records
      }
    }

    // POST - Create record
    if (method === 'POST') {
      const body = await readBody(event)
      const result = await CRUDManagerService.create(sheet, body)
      return result
    }

    // PUT - Update record
    if (method === 'PUT') {
      if (!id) {
        throw createError({ statusCode: 400, message: 'ID is required for update' })
      }
      const body = await readBody(event)
      const result = await CRUDManagerService.update(sheet, id, body)
      return result
    }

    // DELETE - Remove record
    if (method === 'DELETE') {
      if (!id) {
        throw createError({ statusCode: 400, message: 'ID is required for deletion' })
      }
      const result = await CRUDManagerService.delete(sheet, id)
      return result
    }

    throw createError({ statusCode: 405, message: 'Method not allowed' })

  } catch (error: any) {
    //console.log('API [sheet] index registered Error');
    //console.error(`CRUD Error [${sheet}]:`, error)
    throw createError({
      statusCode: error.statusCode || 500,
      message: error.message || `Failed to process ${sheet} request`
    })
  }
})