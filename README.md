# HNTD Client

A React frontend for the HNTD (Haunted Location Finder) application. Discover and share haunted locations across the country.

## Technologies

- React 18
- React Router DOM
- CSS3 (Custom styling with dark/purple theme)
- Backblaze B2 (Image uploads via API)

## Features

- User authentication (login, register, logout)
- Browse haunted locations with search and filters
- View detailed location information
- Add/remove locations to favorites
- Create, edit, and delete your own locations
- User profile with image upload
- Responsive design for mobile and desktop

## Prerequisites

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [HNTD API](https://github.com/yourusername/HntdApi)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/christophuff/HNTD-Client.git
cd HNTD-Client
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=http://localhost:5104/api
```

**Note:** Make sure this matches the port your backend API is running on.

### 4. Start the Backend API

Make sure the [HNTD API](https://github.com/christophuff/HntdApi) is running before starting the frontend. See the API README for setup instructions.

### 5. Start the Development Server

```bash
npm start
```

The app will open in your browser at `http://localhost:3000`.

## Key Concepts

### Authentication Flow

1. User logs in with email/password
2. Credentials are Base64 encoded and sent via Authorization header
3. Backend validates and returns a session cookie
4. Cookie is automatically sent with all subsequent requests
5. `getMe()` on app load checks if session is valid

### Managers

API calls are organized into manager files:
- `authManager.js` - Login, logout, register, profile updates
- `locationManager.js` - CRUD operations for haunted locations
- `favoritesManager.js` - Add/remove favorites
- `filterManager.js` - Fetch filter options (types, levels, activities)
- `imageManager.js` - Upload images to Backblaze via API

## Troubleshooting

### "Failed to fetch" errors
- Make sure the backend API is running on `http://localhost:5104`
- Check that CORS is configured correctly on the backend
- Verify your `.env` file has the correct API URL

### Login not persisting after refresh
- Ensure `credentials: "include"` is set in all fetch requests
- Backend must have `AllowCredentials()` in CORS configuration
- Check browser isn't blocking third-party cookies

### Images not displaying
- Backblaze bucket must be set to Public
- Check browser console for 404 errors on image URLs
- Verify the image URL was saved to the database

### Styling issues
- Clear browser cache and refresh
- Check for CSS conflicts in browser dev tools

## Building for Production

```bash
npm run build
```

This creates an optimized build in the `build/` folder ready for deployment.