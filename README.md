PROJECT OVERVIEW
This is a modern cross-platform application built with React Native, Expo, and TypeScript that provides a seamless user experience for managing user profiles. The app connects to a secure backend API and works on both mobile and web platforms with responsive design powered by NativeWind (Tailwind CSS for React Native).

FEATURES
- User authentication (login/signup)
- Secure JWT token storage using SecureStore
- Automatic session management with token refresh
- View and edit user profiles
- Responsive design that works on mobile and web
- Type-safe development with TypeScript
- Modern UI with NativeWind styling
- Form validation and error handling
- Clean and maintainable code structure

TECH STACK
- React Native
- Expo
- TypeScript
- NativeWind (Tailwind CSS for React Native)
- React Navigation
- Axios for API requests
- SecureStore for secure token storage
- React Hook Form for form handling

SETUP INSTRUCTIONS
1. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

2. Create a .env file in the project root with your API URL:
   ```
   EXPO_PUBLIC_API_URL=http://your-backend-url.com/api
   ```

3. Start the development server:
   ```bash
   npx expo start
   ```

4. Run on specific platforms:
   - Web: Press 'w' in the terminal after starting
   - Android: Press 'a' (requires Android Studio/emulator or device)
   - iOS: Press 'i' (requires Xcode and macOS)

FOLDER STRUCTURE
```
project-frontend/
├── app/                   # Main app directory
│   ├── (auth)/           # Authentication screens
│   ├── (tabs)/           # Main app tabs
│   ├── _layout.tsx       # Root layout
│   └── index.tsx         # Entry point
├── components/           # Reusable UI components
│   ├── ui/               # Base UI components
│   └── forms/            # Form components
├── constants/            # App constants
├── context/              # React context providers
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── services/             # API services
│   ├── api.ts            # Axios instance
│   └── auth.ts           # Auth service
├── types/                # TypeScript type definitions
└── utils/                # Helper functions
```

API INTEGRATION
- The app uses a centralized Axios instance for all API requests
- Authentication tokens are automatically attached to requests
- Request/response interceptors handle common scenarios (token refresh, error handling)
- API calls are abstracted into service modules

PROFILE UPDATE FLOW
1. User navigates to the Edit Profile screen
2. Form is pre-filled with current user data
3. On submission:
   - Form data is validated
   - PATCH request is sent to the backend
   - Success/error feedback is shown
   - On success, the profile data is updated in the global state
   - User is returned to the profile view with updated data

DEMONSTRATION
You can find sample screenshots in the `sample/` directory showing the app's UI and user flows, including:
- Login/Signup screens
- Profile view
- Edit profile form
- Responsive layouts for different screen sizes

TROUBLESHOOTING
- Ensure the backend server is running and accessible
- Verify environment variables are correctly set
- Check browser console/device logs for errors
- Clear app cache if experiencing stale data issues

CONTRIBUTING
1. Create a new branch for your feature/fix
2. Follow the existing code style
3. Write tests for new functionality
4. Submit a pull request with a clear description
