import React from 'react';
import { TouchableOpacity, TouchableOpacityProps, ActivityIndicator, ViewStyle, StyleProp, View } from 'react-native';
import Animated, { useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';
import { useTheme } from '../../context/ThemeContext';
import Text from './Text';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';

type ButtonProps = TouchableOpacityProps & {
  variant?: ButtonVariant;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  loading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  children: React.ReactNode;
};

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  loading = false,
  disabled = false,
  leftIcon,
  rightIcon,
  children,
  style,
  onPressIn,
  onPressOut,
  ...props
}) => {
  const { isDark } = useTheme();
  const [isPressed, setIsPressed] = React.useState(false);

  const getButtonStyle = (): StyleProp<ViewStyle> => {
    const baseStyle: ViewStyle = {
      borderRadius: 12,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal: size === 'sm' ? 16 : size === 'lg' ? 24 : 20,
      paddingVertical: size === 'sm' ? 8 : size === 'lg' ? 14 : 12,
      opacity: disabled ? 0.6 : 1,
      width: fullWidth ? '100%' : undefined,
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyle,
          backgroundColor: isDark ? '#3B82F6' : '#2563EB',
        };
      case 'secondary':
        return {
          ...baseStyle,
          backgroundColor: isDark ? '#374151' : '#F3F4F6',
        };
      case 'outline':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: isDark ? '#4B5563' : '#D1D5DB',
        };
      case 'ghost':
        return {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
      case 'danger':
        return {
          ...baseStyle,
          backgroundColor: isDark ? '#DC2626' : '#EF4444',
        };
      default:
        return baseStyle;
    }
  };

  const getTextColor = (): string => {
    if (variant === 'primary' || variant === 'danger') return '#FFFFFF';
    if (variant === 'secondary') return isDark ? '#F9FAFB' : '#111827';
    if (variant === 'outline') return isDark ? '#F9FAFB' : '#111827';
    return isDark ? '#F3F4F6' : '#1F2937';
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withSpring(isPressed ? 0.98 : 1, {
            damping: 10,
            stiffness: 200,
          }),
        },
      ],
      opacity: withTiming(disabled ? 0.6 : 1, { duration: 200 }),
    };
  }, [isPressed, disabled]);

  const handlePressIn = (e: any) => {
    setIsPressed(true);
    onPressIn?.(e);
  };

  const handlePressOut = (e: any) => {
    setIsPressed(false);
    onPressOut?.(e);
  };

  return (
    <AnimatedTouchable
      style={[getButtonStyle(), animatedStyle, style]}
      activeOpacity={0.8}
      disabled={disabled || loading}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      {...props}
    >
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <>
          {leftIcon && <View style={{ marginRight: 8 }}>{leftIcon}</View>}
          <Text
            variant="button"
            style={{
              color: getTextColor(),
              opacity: isPressed ? 0.8 : 1,
            }}
          >
            {children}
          </Text>
          {rightIcon && <View style={{ marginLeft: 8 }}>{rightIcon}</View>}
        </>
      )}
    </AnimatedTouchable>
  );
};

export default Button;
