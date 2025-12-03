// src/screens/LoginScreen.tsx
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function LoginScreen({ navigation }: any) {
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    // Frontend validation
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    const ok = await login(email, password);

    if (!ok) {
      setError("Invalid email or password.");
    }
  };

  return (
    <View className="flex-1 bg-black items-center justify-center px-6">
      <Text className="text-white text-3xl font-bold mb-8">Login</Text>

      <TextInput
        className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg mb-3 border border-gray-700"
        placeholder="Email"
        placeholderTextColor="#777"
        autoCapitalize="none"
        onChangeText={setEmail}
        value={email}
      />

      <TextInput
        className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg mb-3 border border-gray-700"
        placeholder="Password"
        placeholderTextColor="#777"
        secureTextEntry
        onChangeText={setPassword}
        value={password}
      />

      {error ? <Text className="text-red-400 mb-3">{error}</Text> : null}

      <TouchableOpacity
        onPress={handleLogin}
        className="w-full bg-blue-600 py-3 rounded-lg active:bg-blue-700"
      >
        <Text className="text-center text-white text-lg font-medium">Login</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Signup")}
        className="mt-4"
      >
        <Text className="text-blue-400">Create an account</Text>
      </TouchableOpacity>
    </View>
  );
}
