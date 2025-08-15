# Frontend Ecommerce Site Setup

## 🚨 **Issue: Blank Page**

The frontend was showing a blank page because it was trying to make API calls to a backend server that wasn't running.

## 🔧 **Solutions**

### Option 1: Use Supabase (Recommended)
The frontend now uses the same Supabase database as the admin site, eliminating the need for a separate backend.

### Option 2: Start the Backend Server
If you prefer to use the custom backend API, start the server first.

## 📋 **Setup Steps**

### Step 1: Install Dependencies
```bash
cd frontend
npm install
```

### Step 2: Configure Environment Variables
1. Copy the content from `env-template.txt`
2. Create a new file called `.env.local`
3. Paste the content and fill in your Supabase values:

```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_key_here
```

### Step 3: Start the Frontend
```bash
npm run dev
```

The site should now load without the blank page!

## 🔍 **What Was Fixed**

1. **Updated useAuth hook** to use Supabase instead of custom API
2. **Added Supabase client** configuration
3. **Eliminated dependency** on backend server for authentication
4. **Shared database** between admin and frontend sites

## 🌐 **How It Works Now**

- **Frontend**: Connects directly to Supabase
- **Admin Site**: Also connects to Supabase
- **Shared Data**: Both sites see the same products, orders, etc.
- **Real-time Updates**: Changes in admin appear instantly on frontend

## 🚀 **Benefits**

- ✅ No more blank page
- ✅ Instant data synchronization
- ✅ No backend server required
- ✅ Shared database between sites
- ✅ Real-time updates

## 🆘 **Troubleshooting**

### Still seeing blank page?
1. Check browser console for errors
2. Verify `.env.local` file exists with correct values
3. Ensure Supabase project is accessible
4. Check network tab for failed requests

### Environment variables not loading?
1. Restart the dev server after creating `.env.local`
2. Verify file is in the `frontend` directory
3. Check that variable names start with `VITE_`

### Supabase connection issues?
1. Verify your Supabase URL and anon key
2. Check Supabase project status
3. Ensure RLS policies allow public access
