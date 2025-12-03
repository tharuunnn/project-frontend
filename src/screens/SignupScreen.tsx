// src/screens/SignupScreen.tsx
import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";

export default function SignupScreen({ navigation }: any) {
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    setError("");
    const ok = await signup(name, email, password);

    if (!ok) {
      setError("Signup failed. Try again.");
    }
  };

  return (
    <View className="flex-1 bg-black items-center justify-center px-6">
      <Text className="text-white text-3xl font-bold mb-8">Create Account</Text>

      <TextInput
        className="w-full bg-gray-900 text-white px-4 py-3 rounded-lg mb-3 border border-gray-700"
        placeholder="Name"
        placeholderTextColor="#777"
        onChangeText={setName}
        value={name}
      />

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
        onPress={handleSignup}
        className="w-full bg-green-600 py-3 rounded-lg active:bg-green-700"
      >
        <Text className="text-center text-white text-lg font-medium">Sign Up</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => navigation.navigate("Login")}
        className="mt-4"
      >
        <Text className="text-blue-400">Already have an account? Login</Text>
      </TouchableOpacity>
    </View>
  );
}
