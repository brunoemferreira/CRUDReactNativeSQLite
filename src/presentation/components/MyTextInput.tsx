import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  KeyboardTypeOptions,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../theme';

interface MyTextInputProps {
  label?: string;
  icon?: React.ComponentProps<typeof FontAwesome>['name'];
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  keyboardType?: KeyboardTypeOptions;
  maxLength?: number;
  numberOfLines?: number;
  multiline?: boolean;
  editable?: boolean;
  style?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
}

export const MyTextInput: React.FC<MyTextInputProps> = ({
  label,
  icon,
  placeholder,
  value,
  onChangeText,
  keyboardType = 'default',
  maxLength,
  numberOfLines,
  multiline = false,
  editable = true,
  style,
  containerStyle,
}) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={[styles.wrapper, containerStyle]}>
      {label ? <Text style={styles.label}>{label}</Text> : null}
      <View
        style={[
          styles.container,
          multiline && styles.multilineContainer,
          isFocused && styles.containerFocused,
          !editable && styles.containerDisabled,
        ]}>
        {icon && (
          <View style={[styles.iconContainer, multiline && styles.multilineIcon]}>
            <FontAwesome
              name={icon}
              size={18}
              color={isFocused ? theme.colors.primary : theme.colors.textMuted}
            />
          </View>
        )}
        <TextInput
          underlineColorAndroid="transparent"
          placeholder={placeholder}
          placeholderTextColor={theme.colors.textMuted}
          keyboardType={keyboardType}
          onChangeText={onChangeText}
          numberOfLines={numberOfLines}
          multiline={multiline}
          maxLength={maxLength}
          value={value}
          editable={editable}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={[
            styles.input,
            multiline && styles.multilineInput,
            icon ? styles.inputWithIcon : undefined,
            style,
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    marginHorizontal: theme.spacing.lg,
    marginTop: 12,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    marginBottom: 6,
    marginLeft: 2,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surface,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: 12,
    minHeight: 48,
    ...theme.shadows.sm,
  },
  multilineContainer: {
    alignItems: 'flex-start',
    paddingVertical: 10,
    minHeight: 100,
  },
  containerFocused: {
    borderColor: theme.colors.borderFocus,
    backgroundColor: '#FFFFFF',
    ...theme.shadows.md,
  },
  containerDisabled: {
    backgroundColor: theme.colors.borderLight,
    borderColor: theme.colors.border,
  },
  iconContainer: {
    width: 28,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  multilineIcon: {
    marginTop: 4,
  },
  input: {
    flex: 1,
    color: theme.colors.text,
    fontSize: 15,
    paddingVertical: 10,
  },
  inputWithIcon: {
    paddingLeft: 0,
  },
  multilineInput: {
    textAlignVertical: 'top',
    height: 80,
    paddingTop: 0,
  },
});
