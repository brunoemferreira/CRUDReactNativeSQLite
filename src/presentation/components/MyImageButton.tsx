import React from 'react';
import { TouchableOpacity, Text, StyleSheet, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../theme';

interface MyImageButtonProps {
  title: string;
  subtitle?: string;
  btnColor: string;
  btnIcon: React.ComponentProps<typeof FontAwesome>['name'];
  customClick: () => void;
}

export const MyImageButton: React.FC<MyImageButtonProps> = ({
  title,
  subtitle,
  btnColor,
  btnIcon,
  customClick,
}) => {
  return (
    <TouchableOpacity
      style={styles.card}
      onPress={customClick}
      activeOpacity={0.7}>
      <View style={[styles.iconContainer, { backgroundColor: btnColor }]}>
        <FontAwesome name={btnIcon} size={22} color="#FFFFFF" />
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>

      <View style={styles.chevronContainer}>
        <FontAwesome name="chevron-right" size={14} color={theme.colors.textMuted} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginHorizontal: theme.spacing.lg,
    marginBottom: 12,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.sm,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.sm,
  },
  textContainer: {
    flex: 1,
    marginLeft: 14,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    letterSpacing: 0.1,
  },
  subtitle: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    marginTop: 2,
  },
  chevronContainer: {
    paddingLeft: 8,
  },
});
