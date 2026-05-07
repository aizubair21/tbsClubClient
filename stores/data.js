import { defineStore } from 'pinia'

export const useDataStore = defineStore('data', () => {

    const months = ref(
        [
            'January', 
            'February', 
            'March', 
            'April',
            'May',
            'June', 
            'July', 
            'August', 
            'September',
            'October',
            'November',
            'December'
        ]
    );
    const sessions = ref(
        [
            '2023-24',
            '2024-25',
            '2025-26',
            '2026-27',
            '2027-28',
        ]
    );

    // Index mapping for user data
    const USER_INDEX = {
      user_id: 0,
      name_bangla: 1,
      name_english: 2,
      father_name: 3,
      mother_name: 4,
      educational_qualification: 6,
      occupation: 7,
      phone_number: 11,
      email: 12,
      present_address: 13,
      user_id_display: 16,
      role: 17
    }

    // Index mapping for deposit data
    const DEPOSIT_INDEX = {
      user_id: 0,
      session: 1,
      amount: 2,
      type: 3,
      month: 4,
      method: 5,
      pay_to: 6,
      send_from: 7,
      date: 10
    }

    const types = ref(['Monthly', 'Yearly', 'Cost']);
    const methods = ref(['Bkash', 'Nogod', 'Cash', 'Bank']);
    const deposits = ref([]);

    const refreshDeposits = async (userId) => 
    {
        return await $fetch('/api/sheets/deposits');
    }

    const resetDeposits = () => 
    {
        deposits.value = null;
    }

    return {months, sessions, types, methods, deposits, refreshDeposits, resetDeposits}
}, 
{
  persist: true,
}
);