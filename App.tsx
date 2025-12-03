// In App.tsx
import "./global.css";
import { NavigationContainer, DefaultTheme, DarkTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StatusBar } from 'expo-status-bar';
import { View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from 'react-native-safe-area-context';

// Context Providers
import { AuthProvider, useAuth } from "./src/context/AuthContext";
import { ThemeProvider, useTheme } from "./src/context/ThemeContext";

// Screens
import LoginScreen from "./src/screens/LoginScreen";
import SignupScreen from "./src/screens/SignupScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import EditProfileScreen from "./src/screens/EditProfileScreen";

// Components
import Text from "./src/components/ui/Text";

const Stack = createNativeStackNavigator();

// Custom light theme for navigation
const CustomLightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#2563EB',
    background: '#FFFFFF',
    card: '#FFFFFF',
    text: '#111827',
    border: '#E5E7EB',
    notification: '#DC2626',
  },
};

// Custom dark theme for navigation
const CustomDarkTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    primary: '#3B82F6',
    background: '#111827',
    card: '#1F2937',
    text: '#F9FAFB',
    border: '#374151',
    notification: '#EF4444',
  },
};

function RootNavigator() {
  const { user, loading } = useAuth();
  const { isDark } = useTheme();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: isDark ? '#111827' : '#FFFFFF' }}>
        <ActivityIndicator size="large" color={isDark ? '#3B82F6' : '#2563EB'} />
      </View>
    );
  }

  return (
    <Stack.Navigator 
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: isDark ? CustomDarkTheme.colors.card : CustomLightTheme.colors.card,
        },
        headerTintColor: isDark ? CustomDarkTheme.colors.text : CustomLightTheme.colors.text,
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
        },
        contentStyle: {
          backgroundColor: isDark ? CustomDarkTheme.colors.background : CustomLightTheme.colors.background,
        },
      }}
    >
      {user ? (
        <>
          <Stack.Screen 
            name="Profile" 
            component={ProfileScreen} 
            options={{ 
              title: 'My Profile',
              headerShown: false,
            }} 
          />
          <Stack.Screen 
            name="EditProfile" 
            component={EditProfileScreen} 
            options={{ 
              title: 'Edit Profile',
              headerBackTitle: 'Back',
            }} 
          />
        </>
      ) : (
        <>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ 
              title: 'Sign In',
              headerShown: false,
            }} 
          />
          <Stack.Screen 
            name="Signup" 
            component={SignupScreen} 
            options={{ 
              title: 'Create Account',
              headerBackTitle: 'Back',
            }} 
          />
        </>
      )}
    </Stack.Navigator>
  );
}

function AppContent() {
  const { isDark } = useTheme();
  
  return (
    <SafeAreaProvider>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <NavigationContainer theme={isDark ? CustomDarkTheme : CustomLightTheme}>
        <RootNavigator />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}