import React from 'react';
import { View, StyleSheet } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, withSpring } from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import Text from './ui/Text';

type ProfileStrengthMeterProps = {
  name: string;
  bio: string;
  email: string;
};

const ProfileStrengthMeter: React.FC<ProfileStrengthMeterProps> = ({ name, bio, email }) => {
  const { isDark } = useTheme();
  
  // Calculate profile strength score (0-100)
  const calculateScore = React.useMemo(() => {
    let score = 0;
    
    // Name (max 20 points)
    if (name?.trim().length > 0) score += 10;
    if (name?.trim().length > 3) score += 10;
    
    // Email (max 20 points)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (email?.match(emailRegex)) score += 20;
    
    // Bio (max 30 points)
    if (bio?.trim().length > 0) score += 10;
    if (bio?.trim().length > 20) score += 10;
    if (bio?.trim().length > 50) score += 10;
    
    // Additional factors (max 30 points)
    const hasNameAndBio = name?.trim() && bio?.trim();
    const hasDetailedBio = bio?.trim().split(' ').length > 5;
    
    if (hasNameAndBio) score += 15;
    if (hasDetailedBio) score += 15;
    
    return Math.min(100, Math.max(0, score)); // Ensure score is between 0-100
  }, [name, bio, email]);
  
  // Get color based on score
  const getColorForScore = (score: number) => {
    if (score < 40) return '#EF4444'; // Red
    if (score < 70) return '#F59E0B'; // Yellow
    return '#10B981'; // Green
  };
  
  const animatedWidth = useAnimatedStyle(() => {
    return {
      width: withSpring(`${calculateScore}%`, {
        damping: 15,
        stiffness: 100,
      }),
    };
  }, [calculateScore]);
  
  const getStrengthLabel = () => {
    if (calculateScore < 40) return 'Weak';
    if (calculateScore < 70) return 'Good';
    return 'Excellent';
  };
  
  const bgColor = isDark ? '#1F2937' : '#E5E7EB';
  const trackColor = getColorForScore(calculateScore);
  const textColor = isDark ? '#F3F4F6' : '#1F2937';
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text variant="caption" style={{ color: textColor }}>Profile Strength</Text>
        <Text variant="caption" style={{ color: trackColor, fontWeight: '600' }}>
          {getStrengthLabel()} • {calculateScore}%
        </Text>
      </View>
      
      <View style={[styles.track, { backgroundColor: bgColor }]}>
        <Animated.View 
          style={[
            styles.progress, 
            { backgroundColor: trackColor },
            animatedWidth
          ]} 
        />
      </View>
      
      <View style={styles.tips}>
        {calculateScore < 70 && (
          <Text variant="caption" style={{ color: isDark ? '#9CA3AF' : '#6B7280' }}>
            {calculateScore < 40 
              ? 'Add more details to improve your profile.' 
              : 'Your profile is looking good! Add more details to make it great.'}
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    width: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  track: {
    height: 6,
    borderRadius: 3,
    overflow: 'hidden',
    width: '100%',
  },
  progress: {
    height: '100%',
    borderRadius: 3,
  },
  tips: {
    marginTop: 8,
  },
});

export default ProfileStrengthMeter;
