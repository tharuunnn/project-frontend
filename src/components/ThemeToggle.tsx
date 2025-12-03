import React from 'react';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Animated, { 
  useAnimatedStyle, 
  withTiming, 
  interpolateColor, 
  useDerivedValue 
} from 'react-native-reanimated';
import { useTheme } from '../context/ThemeContext';
import Svg, { Circle, Path } from 'react-native-svg';

const TRACK_WIDTH = 52;
const THUMB_SIZE = 24;
const TRACK_PADDING = 2;

const ThemeToggle: React.FC = () => {
  const { isDark, toggleTheme } = useTheme();
  
  const progress = useDerivedValue(() => {
    return withTiming(isDark ? 1 : 0, { duration: 200 });
  }, [isDark]);
  
  const animatedTrackStyle = useAnimatedStyle(() => {
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['#E5E7EB', '#4B5563']
    );
    
    return {
      backgroundColor,
    };
  });
  
  const animatedThumbStyle = useAnimatedStyle(() => {
    const translateX = progress.value * (TRACK_WIDTH - THUMB_SIZE - TRACK_PADDING * 2);
    const backgroundColor = interpolateColor(
      progress.value,
      [0, 1],
      ['#FFFFFF', '#F59E0B']
    );
    
    return {
      transform: [{ translateX }],
      backgroundColor,
    };
  });
  
  const animatedIconStyle = useAnimatedStyle(() => {
    const opacity = progress.value;
    return {
      opacity: withTiming(opacity, { duration: 200 }),
    };
  });
  
  const animatedSunIconStyle = useAnimatedStyle(() => {
    const opacity = 1 - progress.value;
    return {
      opacity: withTiming(opacity, { duration: 200 }),
    };
  });

  return (
    <TouchableOpacity 
      activeOpacity={0.8} 
      onPress={toggleTheme}
      style={styles.container}
    >
      <Animated.View style={[styles.track, animatedTrackStyle]}>
        <Animated.View style={[styles.thumb, animatedThumbStyle]}>
          <Animated.View style={[styles.iconContainer, animatedSunIconStyle]}>
            <SunIcon />
          </Animated.View>
          <Animated.View style={[styles.iconContainer, animatedIconStyle, styles.moonIcon]}>
            <MoonIcon />
          </Animated.View>
        </Animated.View>
      </Animated.View>
    </TouchableOpacity>
  );
};

const SunIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Circle cx="12" cy="12" r="5" />
    <Path d="M12 1v2" />
    <Path d="M12 21v2" />
    <Path d="M4.22 4.22l1.42 1.42" />
    <Path d="M18.36 18.36l1.42 1.42" />
    <Path d="M1 12h2" />
    <Path d="M21 12h2" />
    <Path d="M4.22 19.78l1.42-1.42" />
    <Path d="M18.36 5.64l1.42-1.42" />
  </Svg>
);

const MoonIcon = () => (
  <Svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <Path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
  </Svg>
);

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  track: {
    width: TRACK_WIDTH,
    height: THUMB_SIZE + TRACK_PADDING * 2,
    borderRadius: 20,
    padding: TRACK_PADDING,
    justifyContent: 'center',
  },
  thumb: {
    width: THUMB_SIZE,
    height: THUMB_SIZE,
    borderRadius: THUMB_SIZE / 2,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2.5,
    elevation: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  moonIcon: {
    transform: [{ rotate: '40deg' }],
  },
});

export default ThemeToggle;
