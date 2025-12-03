import React, { forwardRef, useState, useEffect, useRef } from 'react';
import { 
  TextInput as RNTextInput, 
  TextInputProps as RNTextInputProps, 
  View, 
  StyleSheet, 
  StyleProp, 
  ViewStyle,
  TextInputFocusEventData,
  NativeSyntheticEvent,
  Animated,
  Easing
} from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import Text from './Text';

type InputProps = RNTextInputProps & {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  containerStyle?: StyleProp<ViewStyle>;
  placeholder?: string;
};

const Input = forwardRef<RNTextInput, InputProps>(({
  label,
  error,
  leftIcon,
  rightIcon,
  onFocus,
  onBlur,
  value,
  style,
  containerStyle,
  placeholder,
  ...props
}, ref) => {
  const { isDark } = useTheme();
  const [isFocused, setIsFocused] = useState(false);
  const scaleValue = useRef(new Animated.Value(1)).current;
  const opacityValue = useRef(new Animated.Value(1)).current;
  const inputRef = useRef<RNTextInput>(null);

  // Colors
  const backgroundColor = isFocused 
    ? isDark ? 'rgba(59, 130, 246, 0.1)' : 'rgba(37, 99, 235, 0.1)'
    : error
      ? 'rgba(239, 68, 68, 0.1)'
      : isDark ? 'rgba(31, 41, 55, 0.8)' : 'rgba(0, 0, 0, 0.03)';

  const textColor = isDark ? '#F9FAFB' : '#111827';
  const placeholderColor = isDark ? '#6B7280' : '#9CA3AF';
  const selectionColor = isDark ? 'rgba(59, 130, 246, 0.5)' : 'rgba(37, 99, 235, 0.5)';

  useEffect(() => {
    Animated.parallel([
      Animated.spring(scaleValue, {
        toValue: isFocused ? 1.005 : 1,
        useNativeDriver: true,
        speed: 20,
        bounciness: 0,
      }),
      Animated.timing(opacityValue, {
        toValue: isFocused ? 0.95 : 1,
        duration: 150,
        useNativeDriver: true,
        easing: Easing.out(Easing.ease)
      })
    ]).start();
  }, [isFocused]);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
    onFocus?.(e);
  };
  
  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const animatedStyle = {
    transform: [{ scale: scaleValue }],
    opacity: opacityValue,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <Animated.View 
        style={[
          styles.inputContainer, 
          {
            backgroundColor,
            borderColor: error
              ? 'rgba(239, 68, 68, 0.7)'
              : isDark
                ? 'rgba(55, 65, 81, 1)'
                : 'rgba(209, 213, 219, 1)',
          },
          animatedStyle,
          error && styles.errorContainer,
        ]}
      >
        {leftIcon && (
          <View style={styles.leftIcon}>
            {leftIcon}
          </View>
        )}
        
        <RNTextInput
          ref={inputRef}
          style={[
            styles.input,
            { 
              color: textColor,
              paddingLeft: leftIcon ? 12 : 16,
              paddingRight: rightIcon ? 12 : 16,
            },
            style,
          ]}
          placeholderTextColor={placeholderColor}
          selectionColor={selectionColor}
          onFocus={handleFocus}
          onBlur={handleBlur}
          value={value}
          placeholder={placeholder ?? label}
          {...props}
        />
        
        {rightIcon && (
          <View style={styles.rightIcon}>
            {rightIcon}
          </View>
        )}
      </Animated.View>
      
      {error && (
        <Text variant="caption" style={styles.errorText}>
          {error}
        </Text>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    minHeight: 56,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'transparent',
  },
  input: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    paddingVertical: 16,
    margin: 0,
    backgroundColor: 'transparent',
    includeFontPadding: false,
  },
  leftIcon: {
    paddingLeft: 16,
    paddingRight: 8,
  },
  rightIcon: {
    paddingLeft: 8,
    paddingRight: 16,
  },
  errorContainer: {
    borderColor: 'rgba(239, 68, 68, 0.5)',
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
});

export default Input;