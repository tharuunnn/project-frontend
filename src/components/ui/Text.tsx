import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet } from 'react-native';
import { useTheme } from '../../context/ThemeContext';

type TextVariant = 'h1' | 'h2' | 'h3' | 'subtitle' | 'body' | 'caption' | 'button';

type TextProps = RNTextProps & {
  variant?: TextVariant;
  bold?: boolean;
  semibold?: boolean;
  light?: boolean;
  center?: boolean;
  color?: string;
  children: React.ReactNode;
};

const Text: React.FC<TextProps> = ({
  variant = 'body',
  bold = false,
  semibold = false,
  light = false,
  center = false,
  color,
  style,
  children,
  ...props
}) => {
  const { isDark } = useTheme();
  
  const getFontFamily = () => {
    if (bold) return 'Inter-Bold';
    if (semibold) return 'Inter-SemiBold';
    if (light) return 'Inter-Light';
    return 'Inter-Regular';
  };

  const getVariantStyle = () => {
    const baseStyle = {
      fontFamily: getFontFamily(),
      color: isDark ? '#FFFFFF' : '#1F2937', // Default text color based on theme
    };

    switch (variant) {
      case 'h1':
        return { ...baseStyle, fontSize: 32, lineHeight: 40, fontWeight: '700' };
      case 'h2':
        return { ...baseStyle, fontSize: 28, lineHeight: 36, fontWeight: '600' };
      case 'h3':
        return { ...baseStyle, fontSize: 22, lineHeight: 28, fontWeight: '600' };
      case 'subtitle':
        return { ...baseStyle, fontSize: 16, lineHeight: 24, fontWeight: '500' };
      case 'body':
        return { ...baseStyle, fontSize: 16, lineHeight: 24 };
      case 'caption':
        return { ...baseStyle, fontSize: 14, lineHeight: 20, color: isDark ? '#9CA3AF' : '#6B7280' };
      case 'button':
        return { ...baseStyle, fontSize: 16, lineHeight: 24, fontWeight: '600', letterSpacing: 0.5 };
      default:
        return baseStyle;
    }
  };

  return (
    <RNText
      style={[
        getVariantStyle(),
        center && { textAlign: 'center' },
        color ? { color } : {},
        style,
      ]}
      {...props}
    >
      {children}
    </RNText>
  );
};

export default Text;
