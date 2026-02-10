export const useDataStore = defineStore('data', () => {

    const monthArray = ref(
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
    const sessionArray = ref(
        [
            '2023-24',
            '2024-25',
            '2025-26',
            '2026-27',
            '2027-28',
        ]
    );

    const typeArray = ref(['Monthly', 'Yearly', 'Cost']);
    const methodArray = ref(['Bkash', 'Nogod', 'Cash', 'Bank']);


    return {monthArray, sessionArray, typeArray, methodArray}
});