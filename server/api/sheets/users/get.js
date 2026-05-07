// server/api/sheets/users.get.ts
import gss from '../../../services/GSS.service';
import { sheetConfigs } from '../../../Credentials/sheets.config';

export default defineEventHandler(async (event) => {
  try {
    const users = await gss.getSheetData(sheetConfigs.users)
    
    // Return in the original array format for backward compatibility
    // Convert objects back to array format
    const usersArray = users.map(user => [
      user.user_id,
      user.name_bangla,
      user.name_english,
      user.father_name,
      user.mother_name,
      user.date_of_birth,
      user.educational_qualification,
      user.occupation,
      user.phone_number,
      user.email,
      user.present_address,
      user.permanent_address,
      user.reference,
      user.joined_date,
      user.role,
      user.status,
      user.user_id_display
    ])
    
    return usersArray
  } catch (error) {
    console.error('Error fetching users:', error)
    throw createError({ statusCode: 500, message: 'Failed to fetch users' })
  }
})