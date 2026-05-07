# তারকারাজী বিজনেস - Member & Deposit Management Dashboard

**তারকারাজী বিজনেস** হল একটি আধুনিক ওয়েব অ্যাপ্লিকেশন যা সদস্য ব্যবস্থাপনা এবং আমানত সংগ্রহ ট্র্যাক করার জন্য তৈরি। এটি Google Sheets এর সাথে রিয়েল-টাইম ইন্টিগ্রেশন করে সকল তথ্য স্বয়ংক্রিয়ভাবে সিঙ্ক করে। অ্যাডমিন এবং সাধারণ সদস্য উভয়ের জন্য ড্যাশবোর্ড. 

## ✨ বৈশিষ্ট্যসমূহ

- **রিয়েল-টাইম ডেটা**: Google Sheets থেকে লাইভ ডেটা লোড
- **সম্পূর্ণ CRUD**: Deposits, Users এর জন্য. 
- **উন্নত ড্যাশবোর্ড**: 
  - মোট/মাসিক/বার্ষিক আমানত
  - শীর্ষ অবদানকারী
  - পেমেন্ট মেথড বিশ্লেষণ
  - গ্রোথ ট্রেন্ডস
  - সংগ্রহ দক্ষতা
- **Role-based Access**: Admin এবং User
- **Responsive Design**: TailwindCSS দিয়ে মোবাইল-ফ্রেন্ডলি
- **Authentication**: JWT/Pinia State Management + bcrypt
- **State Management**: Pinia (persisted)
- **Bengali Support**: সম্পূর্ণ বাংলা UI

## 🛠️ টেকনোলজি স্ট্যাক

| Frontend | Backend | Database | Tools |
|----------|---------|----------|-------|
| Nuxt 3 + Vue 3 | Nitro Server | Google Sheets | TailwindCSS, Pinia |
| TypeScript | Google API | Service Account | FontAwesome, Google Fonts |

## 🚀 দ্রুত শুরু

### 1. Dependencies ইনস্টল করুন
```bash
yarn install
# অথবা
npm install
```

### 2. Environment Variables সেট করুন
`.env` ফাইল তৈরি করুন:
```env
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-service-account@project.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEET_ID=your_google_sheet_id
GOOGLE_API_ENDPOINT=https://your-domain.com  # Optional
```

**Google Sheets Setup:**
1. [Google Cloud Console](https://console.cloud.google.com) এ নতুন প্রজেক্ট তৈরি
2. Sheets API enable করুন
3. Service Account তৈরি করে JSON key ডাউনলোড
4. Sheet share করুন service account email এর সাথে (Editor)

### 3. Development Server চালান
```bash
yarn dev
# http://localhost:3000
```

### 4. Build & Deploy
```bash
yarn build
yarn preview
```

## 📁 প্রজেক্ট স্ট্রাকচার

```
├── pages/
│   ├── index.vue          # ড্যাশবোর্ড
│   ├── deposits/          # আমানত CRUD
│   ├── members/           # সদস্য
│   └── users/             # ইউজার ম্যানেজমেন্ট
├── server/api/sheets/     # Google Sheets API
├── stores/                # Pinia stores
├── components/            # UI Components
└── server/utils/          # Google Sheets utils
```

## 🎯 Google Sheets Format

### Deposits Sheet (Columns):
```
User ID | Session | Amount | Type | Month | Method | Pay To | Send From | ... | Date
```

### Users Sheet (Columns):
```
ID | Name | ... | Role (admin/user)
```

## 📊 ড্যাশবোর্ড ফিচারস

| Admin | User |
|-------|------|
| সম্পূর্ণ Analytics | ব্যক্তিগত Deposits |
| সকল Member View | সর্বশেষ Transactions |
| CRUD Operations | Monthly Summary |

## 🔐 Authentication

- **Login**: `/api/login.post.js`
- **Stores**: `auth.js`, `data.js`
- **Roles**: Admin দেখতে পারে সব, User শুধু নিজের

## 🌐 Deployment

### Vercel/Netlify:
1. Environment variables সেট করুন
2. `yarn build` করে deploy

### Custom Server:
```bash
node server.js
```

## 📄 লাইসেন্স

[MIT License](LICENSE)

## 👨‍💻 Developer

Built with ❤️ for member management. Issues/Suggestions: Open Issue!

---

**তারকারাজী বিজনেস** - সহজ, শক্তিশালী, স্মার্ট সদস্য ব্যবস্থাপনা!

