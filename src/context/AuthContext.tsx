import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import * as SecureStore from "expo-secure-store";
import {
  loginRequest,
  signupRequest,
  getProfileRequest,
  updateProfileRequest,
} from "../api/auth";

interface User {
  id: number;
  email: string;
  name: string;
  bio: string|null;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<boolean>;
  setUser: (u: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Load token + user on app start, for autologin if the token exists
  useEffect(() => {
    const loadUser = async () => {
      const token = await SecureStore.getItemAsync("token");
      if (token) {
        try {
          const res = await getProfileRequest();
          setUser(res.data);
        } catch {
          await SecureStore.deleteItemAsync("token");
          setUser(null);
        }
      }
      setLoading(false);
    };
    loadUser();
  }, []);

  // LOGIN
  const login = async (email: string, password: string) => {
    try {
      const res = await loginRequest({ email, password });
      const token = res.data.access_token;

      await SecureStore.setItemAsync("token", token);

      const profile = await getProfileRequest();
      setUser(profile.data);

      return true;
    } catch (err) {
      return false;
    }
  };

  // SIGNUP
  const signup = async (name: string, email: string, password: string) => {
    try {
      await signupRequest({ email, password, name });
      return await login(email, password);
    } catch {
      return false;
    }
  };

  // LOGOUT
  const logout = async () => {
    await SecureStore.deleteItemAsync("token");
    setUser(null);
  };

  // REFRESH PROFILE
  const refreshProfile = async () => {
    try {
      const res = await getProfileRequest();
      setUser(res.data);
    } catch (_) {}
  };

  // UPDATE PROFILE
  const updateProfile = async (data: Partial<User>) => {
    try {
      const res = await updateProfileRequest(data);
      setUser(res.data);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        loading,
        login,
        signup,
        logout,
        refreshProfile,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

//central auth logic page 
