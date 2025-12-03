import { View, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Feather } from "@expo/vector-icons";
import Button from "../components/ui/Button";
import Text from "../components/ui/Text";
import ThemeToggle from "../components/ThemeToggle";

export default function ProfileScreen({ navigation }: any) {
  const { user, logout } = useAuth();
  const { isDark } = useTheme();

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <View style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Text variant="h2" style={styles.headerTitle}>Profile</Text>
          <View style={styles.headerActions}>
            <ThemeToggle />
            <TouchableOpacity 
              onPress={() => navigation.navigate("EditProfile")}
              style={styles.editButton}
              activeOpacity={0.7}
            >
              <Feather 
                name="edit-3" 
                size={22} 
                color={isDark ? '#E5E7EB' : '#4B5563'} 
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView 
        style={styles.content}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.profileSection}>
          <View style={styles.avatarPlaceholder}>
            <Text variant="h1" style={styles.avatarText}>
              {user?.name?.charAt(0)?.toUpperCase() || 'U'}
            </Text>
          </View>
          
          <View style={styles.infoContainer}>
            <Text variant="h2" style={styles.name}>
              {user?.name || "No Name"}
            </Text>
            <Text variant="subtitle" style={styles.email}>
              {user?.email}
            </Text>
          </View>
        </View>

        {user?.bio && (
          <View style={styles.bioContainer}>
            <Text variant="subtitle" style={styles.sectionTitle}>
              About
            </Text>
            <Text variant="body" style={styles.bioText}>
              {user.bio}
            </Text>
          </View>
        )}

        <View style={styles.actionsContainer}>
          <Button 
            variant="primary" 
            size="lg" 
            onPress={() => navigation.navigate("EditProfile")}
            style={styles.actionButton}
          >
            Edit Profile
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            onPress={handleLogout}
            style={[styles.actionButton, styles.logoutButton]}
            leftIcon={
              <Feather 
                name="log-out" 
                size={20} 
                color={isDark ? '#F3F4F6' : '#1F2937'} 
              />
            }
          >
            Sign Out
          </Button>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lightContainer: {
    backgroundColor: '#F9FAFB',
  },
  darkContainer: {
    backgroundColor: '#111827',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 20,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.1)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editButton: {
    marginLeft: 16,
    padding: 8,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    padding: 24,
    paddingTop: 32,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#3B82F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: '600',
  },
  infoContainer: {
    alignItems: 'center',
  },
  name: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 4,
    textAlign: 'center',
  },
  email: {
    color: '#6B7280',
  },
  bioContainer: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#4B5563',
  },
  bioText: {
    lineHeight: 24,
    color: '#4B5563',
  },
  actionsContainer: {
    width: '100%',
    marginTop: 16,
  },
  actionButton: {
    marginBottom: 16,
  },
  logoutButton: {
    borderColor: '#E5E7EB',
  },
});
