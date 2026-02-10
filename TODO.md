# TODO: Implement Filter System for Deposits Index Page

- [x] Add reactive state for filters (selected values and search terms for member_code, session, month, type, method)
- [x] After fetching deposits, compute unique values for each filter field and set all as selected by default
- [x] Create a computed property for filteredDeposits based on selected values
- [x] Update the modal content to include filter UI for each field (search input, selected count, select all/clear buttons, checkboxes)
- [x] Replace the table's deposits with filteredDeposits to apply filters
- [ ] Test the filters to ensure they work correctly
