import React from 'react';
import { View, Text, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { theme } from '../theme';

interface MyTextProps {
  text: string;
  subtitle?: string;
  style?: StyleProp<TextStyle>;
}

export const MyText: React.FC<MyTextProps> = ({ text, subtitle, style }) => {
  return (
    <View style={styles.container}>
      <View style={styles.accentBar} />
      <View style={styles.textContainer}>
        <Text style={[styles.title, style]}>{text}</Text>
        {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginHorizontal: theme.spacing.lg,
    marginTop: 18,
    marginBottom: 6,
  },
  accentBar: {
    width: 4,
    height: 22,
    backgroundColor: theme.colors.primary,
    borderRadius: 2,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: theme.colors.text,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.1,
  },
  subtitle: {
    color: theme.colors.textSecondary,
    fontSize: 13,
    marginTop: 2,
  },
});
