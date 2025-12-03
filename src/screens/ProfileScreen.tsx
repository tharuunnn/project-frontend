import { View, Text, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Feather } from "@expo/vector-icons";

export default function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth();

  return (
    <View className="flex-1 bg-black">

      {/* Header */}
      <View className="flex-row items-center justify-between px-6 pt-14 pb-6 border-b border-gray-800">
        <Text className="text-white text-2xl font-bold">Profile</Text>

        <TouchableOpacity onPress={() => navigation.navigate("EditProfile")}>
          <Feather name="edit" size={24} color="white" />
        </TouchableOpacity>
      </View>

      {/* Content */}
      <View className="px-6 mt-8">

        <Text className="text-gray-400 text-sm">Name</Text>
        <Text className="text-white text-xl mb-6">{user?.name || "—"}</Text>

        <Text className="text-gray-400 text-sm">Email</Text>
        <Text className="text-white text-xl mb-6">{user?.email}</Text>

        <Text className="text-gray-400 text-sm">Bio</Text>
        <Text className="text-white text-lg leading-6 mb-10">
          {user?.bio || "—"}
        </Text>

        {/* Logout */}
        <TouchableOpacity
          onPress={logout}
          className="bg-red-600 px-6 py-3 rounded-lg w-full mt-6"
        >
          <Text className="text-white text-center text-lg font-medium">
            Logout
          </Text>
        </TouchableOpacity>

      </View>
    </View>
  );
}
