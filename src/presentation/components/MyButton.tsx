import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../theme';

interface MyButtonProps {
  title: string;
  customClick: () => void;
  variant?: 'primary' | 'danger' | 'secondary' | 'outline';
  icon?: React.ComponentProps<typeof FontAwesome>['name'];
  loading?: boolean;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}

export const MyButton: React.FC<MyButtonProps> = ({
  title,
  customClick,
  variant = 'primary',
  icon,
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const isDanger = variant === 'danger';
  const isSecondary = variant === 'secondary';
  const isOutline = variant === 'outline';

  const getBackgroundColor = () => {
    if (disabled) return theme.colors.border;
    if (isOutline) return 'transparent';
    if (isDanger) return theme.colors.danger;
    if (isSecondary) return theme.colors.secondary;
    return theme.colors.primary;
  };

  const getTextColor = () => {
    if (disabled) return theme.colors.textMuted;
    if (isOutline) return theme.colors.primary;
    return theme.colors.textInverse;
  };

  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: getBackgroundColor() },
        isOutline && styles.outlineBorder,
        style,
      ]}
      onPress={customClick}
      activeOpacity={0.8}
      disabled={disabled || loading}>
      {loading ? (
        <ActivityIndicator size="small" color={getTextColor()} />
      ) : (
        <View style={styles.content}>
          {icon && (
            <FontAwesome
              name={icon}
              size={18}
              color={getTextColor()}
              style={styles.icon}
            />
          )}
          <Text style={[styles.text, { color: getTextColor() }, textStyle]}>
            {title}
          </Text>
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    ...theme.shadows.md,
  },
  outlineBorder: {
    borderWidth: 1.5,
    borderColor: theme.colors.primary,
    elevation: 0,
    shadowOpacity: 0,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    marginRight: 8,
  },
  text: {
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.2,
  },
});
