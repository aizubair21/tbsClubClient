# TODO: Update Deposits Functionality

## Tasks to Complete

- [x] Update `stores/auth.js` to store the user ID upon login.
- [x] Modify `server/api/deposits.get.js` to authenticate requests, retrieve the user ID from headers, and filter deposits: admins see all, users see only their own (where `member_code` matches their user ID).
- [x] Create `server/api/deposits.post.js` for adding deposits, restricted to admins.
- [x] Create `server/api/deposits/[id].put.js` for updating deposits, restricted to admins.
- [x] Create `server/api/deposits/[id].delete.js` for deleting deposits, restricted to admins.
- [x] Update frontend fetches in `pages/deposits/index.vue` and `pages/deposits/add.vue` to use local `/api/deposits`.
- [x] Update `pages/deposits/index.vue` to display the deposit list, with edit/delete buttons only for admins.
- [x] Update `pages/deposits/add.vue` to handle adding deposits only (remove edit/delete logic from script, keep form).
