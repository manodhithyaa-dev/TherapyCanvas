# Frontend-Backend Connection Guide

## ✅ Completed Integration

The frontend is now fully connected to the Flask backend API. All authentication, data fetching, and mutations go through the backend.

## 📁 Files Created/Modified

### New Files:
1. **`src/lib/api.ts`** - Centralized API client with all endpoints
2. **`src/components/marketplace/PurchaseButton.tsx`** - Purchase button component with backend integration

### Modified Files:
1. **`src/pages/Signup.tsx`** - Now calls `/api/auth/signup`
2. **`src/pages/Login.tsx`** - Now calls `/api/auth/login`
3. **`src/components/family/TutorSelector.tsx`** - Fetches tutors from `/api/tutors`
4. **`src/components/tutor/TutorDashboard.tsx`** - Fetches activities from `/api/activities`
5. **`src/pages/Marketplace.tsx`** - Fetches from `/api/marketplace/activities` and handles purchases
6. **`src/components/family/FamilyDashboard.tsx`** - Fetches purchases from `/api/purchases/user/:id`

## 🔌 API Integration Details

### Authentication
- **Signup**: `POST /api/auth/signup`
  - Creates user in database
  - Returns user with UUID
  - Handles both tutor and family roles
  
- **Login**: `POST /api/auth/login`
  - Validates credentials
  - Returns user data
  - Updates last login timestamp

### Data Fetching
- **Tutors**: `GET /api/tutors?region=north`
- **Activities**: `GET /api/activities?authorId=xxx`
- **Marketplace**: `GET /api/marketplace/activities?region=...&language=...`
- **Purchases**: `GET /api/purchases/user/:userId`

### Data Mutations
- **Publish Activity**: `POST /api/marketplace/activities/:id/publish`
- **Create Purchase**: `POST /api/purchases`
- **Check Purchase**: `GET /api/purchases/check/:userId/:activityId`

## 🎯 Features

### Error Handling
- ✅ Try-catch blocks around all API calls
- ✅ User-friendly error messages
- ✅ Toast notifications for success/errors
- ✅ Fallback to mock data if backend unavailable

### Loading States
- ✅ Loading spinners during API calls
- ✅ Disabled buttons during operations
- ✅ Loading messages

### Data Synchronization
- ✅ Frontend state syncs with backend
- ✅ LocalStorage for offline access
- ✅ Real-time updates after mutations

## 🧪 Testing the Connection

### 1. Start Backend
```bash
cd backend
python app.py
```

### 2. Test Signup
- Go to `/signup`
- Fill in form
- Submit
- Check backend: `python check_database.py`
- You should see the new user with a UUID

### 3. Test Login
- Go to `/login`
- Use credentials from signup
- Should log in successfully
- User data comes from backend

### 4. Test Marketplace
- Go to `/marketplace`
- Activities load from backend
- Purchase an activity
- Check purchases in "My Purchases" tab

## 🔍 Debugging

### Check if Backend is Running
```bash
curl http://localhost:5000/api/health
```

### Check Database
```bash
cd backend
python check_database.py
```

### Check Browser Console
- Open DevTools (F12)
- Look for API calls in Network tab
- Check for errors in Console

### Common Issues

1. **CORS Error**
   - Make sure backend CORS_ORIGINS includes your frontend URL
   - Check `.env` file

2. **Connection Refused**
   - Backend not running
   - Wrong port (should be 5000)
   - Check `backend/app.py` is running

3. **404 Errors**
   - Check API URL in `src/config/config.tsx`
   - Should be `http://localhost:5000/api`

4. **Authentication Fails**
   - Check password hashing
   - Verify user exists in database
   - Check backend logs

## 📊 Data Flow

### Signup Flow:
```
User fills form → Frontend validates → API call → Backend creates user → Returns UUID → Frontend saves to context
```

### Login Flow:
```
User enters credentials → API call → Backend validates → Returns user data → Frontend saves to context
```

### Purchase Flow:
```
User clicks purchase → API call → Backend creates purchase record → Updates activity purchase count → Returns success → Frontend updates state
```

## 🚀 Next Steps

1. **Add JWT Authentication** (optional)
   - Token-based auth instead of session
   - More secure for production

2. **Add Activity Creation API**
   - Connect AuthoringStudio to backend
   - Save activities to database

3. **Add File Upload**
   - For activity thumbnails
   - For audio recordings
   - For custom assets

4. **Add Real-time Updates**
   - WebSocket for live updates
   - Notifications

---

**All frontend pages are now connected to the backend!** 🎉

