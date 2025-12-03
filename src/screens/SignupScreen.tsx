// src/screens/SignupScreen.tsx
import React, { useState, useMemo } from "react";
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from "react-native";
import { Feather } from "@expo/vector-icons";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import Text from "../components/ui/Text";

export default function SignupScreen({ navigation }: any) {
  const { signup } = useAuth();
  const { isDark } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const { textColor, mutedColor, iconColor } = useMemo(
    () => ({
      textColor: isDark ? "#F9FAFB" : "#111827",
      mutedColor: isDark ? "#9CA3AF" : "#6B7280",
      iconColor: isDark ? "#9CA3AF" : "#6B7280",
    }),
    [isDark]
  );

  const handleSignup = async () => {
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const ok = await signup(name, email, password);
      if (!ok) {
        setError("Signup failed. Try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, isDark && styles.darkContainer]}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={[styles.title, { color: textColor }]}>Create account</Text>
          <Text style={[styles.subtitle, { color: mutedColor }]}>Join us by filling in the details below.</Text>
        </View>

        <View style={styles.form}>
          <Input
            leftIcon={<Feather name="user" size={20} color={iconColor} />}
            value={name}
            onChangeText={setName}
            placeholder="Full name"
            autoCapitalize="words"
            returnKeyType="next"
          />

          <Input
            leftIcon={<Feather name="mail" size={20} color={iconColor} />}
            value={email}
            onChangeText={setEmail}
            placeholder="Email address"
            keyboardType="email-address"
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect={false}
            returnKeyType="next"
          />

          <Input
            leftIcon={<Feather name="lock" size={20} color={iconColor} />}
            value={password}
            onChangeText={setPassword}
            placeholder="Password"
            secureTextEntry
            returnKeyType="done"
          />

          {error ? (
            <Text style={[styles.errorText]}>{error}</Text>
          ) : null}

          <View style={styles.buttonGroup}>
            <Button
              onPress={handleSignup}
              loading={loading}
              variant="primary"
              size="lg"
              leftIcon={!loading && <Feather name="user-plus" size={20} color="#FFFFFF" />}
            >
              {loading ? "Creating account..." : "Create Account"}
            </Button>

            <Button
              onPress={() => navigation.navigate("Login")}
              variant="ghost"
              size="lg"
            >
              Already have an account? Sign in
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  darkContainer: {
    backgroundColor: "#111827",
  },
  content: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
    justifyContent: "center",
  },
  header: {
    marginBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  form: {
    width: "100%",
  },
  buttonGroup: {
    marginTop: 24,
    gap: 12,
  },
  errorText: {
    color: "#EF4444",
    fontSize: 14,
    marginTop: 8,
    textAlign: "center",
  },
});
