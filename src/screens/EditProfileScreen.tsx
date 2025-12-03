// In src/screens/EditProfileScreen.tsx
import React, { useState, useMemo } from 'react';
import { View, StyleSheet, ScrollView, KeyboardAvoidingView, Platform } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import Text from '../components/ui/Text';

const EditProfileScreen = ({ navigation }) => {
  const { user, updateProfile } = useAuth();
  const { isDark } = useTheme();
  
  const [name, setName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [bio, setBio] = useState(user?.bio || '');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Memoize theme colors to prevent unnecessary re-renders
  const { textColor, placeholderColor, iconColor } = useMemo(() => ({
    textColor: isDark ? '#F9FAFB' : '#111827',
    placeholderColor: isDark ? '#9CA3AF' : '#6B7280',
    iconColor: isDark ? '#9CA3AF' : '#6B7280',
  }), [isDark]);

  const handleSave = async () => {
    try {
      setLoading(true);
      setError('');
      await updateProfile({ name, email, bio });
      navigation.goBack();
    } catch (err) {
      setError('Failed to update profile. Please try again.');
      console.error('Update profile error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={[styles.container, isDark && styles.darkContainer]}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text variant="heading2" style={[styles.headerText, { color: textColor }]}>
            Edit Profile
          </Text>
          <Text style={[styles.subtitle, { color: placeholderColor }]}>
            Update your personal information
          </Text>
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
            leftIcon={<Feather name="edit-3" size={20} color={iconColor} />}
            value={bio}
            onChangeText={setBio}
            placeholder="Tell us about yourself"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            style={[styles.bioInput, { minHeight: 120 }]}
          />

          {error ? (
            <Text style={[styles.errorText, isDark && styles.darkErrorText]}>
              {error}
            </Text>
          ) : null}

          <View style={styles.buttonContainer}>
            <Button
              onPress={handleSave}
              loading={loading}
              variant="primary"
              size="lg"
              style={styles.saveButton}
              leftIcon={!loading && <Feather name="save" size={20} color="#FFFFFF" />}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </Button>

            <Button
              onPress={() => navigation.goBack()}
              variant="outline"
              size="lg"
              leftIcon={<Feather name="x" size={20} color={isDark ? '#F9FAFB' : '#111827'} />}
            >
              Cancel
            </Button>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  darkContainer: {
    backgroundColor: '#111827',
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    marginBottom: 24,
  },
  headerText: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    opacity: 0.8,
  },
  form: {
    flex: 1,
  },
  bioInput: {
    textAlignVertical: 'top',
  },
  buttonContainer: {
    marginTop: 24,
    gap: 12,
  },
  saveButton: {
    marginTop: 8,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  darkErrorText: {
    color: '#FCA5A5',
  },
});

export default EditProfileScreen;