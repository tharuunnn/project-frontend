import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { useAuth } from "../context/AuthContext";
import { updateProfileRequest } from "../api/auth";

export default function EditProfileScreen({ navigation }: any) {
  const { user, setUser } = useAuth();

  const [name, setName] = useState(user?.name || "");
  const [bio, setBio] = useState(user?.bio || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSave = async () => {
    setError("");
    setLoading(true);

    try {
      const payload: any = {};
      if (name.trim() !== "") payload.name = name;
      if (bio.trim() !== "") payload.bio = bio;

      const res = await updateProfileRequest(payload);

      // Update auth context with new user data
      if (res?.data) {
        try{
            setUser(res.data);
        }catch(ctxErr){
            console.log("CONTEXT ERROR", ctxErr)
        }
      }

      navigation.goBack();
    } catch (err: any) {
      console.log("Update error:", err?.response?.data);
      setError(err?.response?.data?.detail || "Failed to update profile");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 bg-black px-6 pt-12">
      {/* Header */}
      <Text className="text-white text-3xl font-bold mb-8">
        Edit Profile
      </Text>

      {/* Name */}
      <Text className="text-gray-400 mb-2">Name</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        className="bg-gray-900 text-white p-4 rounded-lg mb-6 text-lg"
        placeholder="Enter your name"
        placeholderTextColor="#666"
      />

      {/* Bio */}
      <Text className="text-gray-400 mb-2">Bio</Text>
      <TextInput
        value={bio}
        onChangeText={setBio}
        className="bg-gray-900 text-white p-4 rounded-lg mb-6 text-lg"
        placeholder="Write something about yourself..."
        placeholderTextColor="#666"
        multiline
        numberOfLines={4}
      />

      {error !== "" && (
        <Text className="text-red-500 mb-4 text-center">{error}</Text>
      )}

      {/* Save button */}
      <TouchableOpacity
        onPress={handleSave}
        disabled={loading}
        className="bg-blue-600 py-4 rounded-lg mb-4"
      >
        {loading ? (
          <ActivityIndicator color="white" />
        ) : (
          <Text className="text-white text-center text-lg font-semibold">
            Save Changes
          </Text>
        )}
      </TouchableOpacity>

      {/* Cancel */}
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="bg-gray-800 py-4 rounded-lg"
      >
        <Text className="text-gray-300 text-center text-lg font-semibold">
          Cancel
        </Text>
      </TouchableOpacity>
    </View>
  );
}
