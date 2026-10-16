import React, { forwardRef, useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  Keyboard,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
  EmitterSubscription,
} from 'react-native';

export interface KeyboardScrollContainerProps extends ScrollViewProps {
  children: React.ReactNode;
  extraBottomPadding?: number;
  style?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
  keyboardVerticalOffset?: number;
  onKeyboardDidShow?: (keyboardHeight: number) => void;
}

export const KeyboardScrollContainer = forwardRef<ScrollView, KeyboardScrollContainerProps>(
  (
    {
      children,
      extraBottomPadding = 40,
      style,
      contentContainerStyle,
      keyboardVerticalOffset = Platform.OS === 'ios' ? 64 : 0,
      keyboardShouldPersistTaps = 'handled',
      keyboardDismissMode = 'on-drag',
      showsVerticalScrollIndicator = false,
      onKeyboardDidShow,
      ...restProps
    },
    ref
  ) => {
    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);
    const [keyboardHeight, setKeyboardHeight] = useState(0);

    useEffect(() => {
      const showEvent = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow';
      const hideEvent = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide';

      const showSub: EmitterSubscription = Keyboard.addListener(showEvent, (e) => {
        setIsKeyboardVisible(true);
        const height = e?.endCoordinates?.height || 300;
        setKeyboardHeight(height);
        onKeyboardDidShow?.(height);
      });

      const hideSub: EmitterSubscription = Keyboard.addListener(hideEvent, () => {
        setIsKeyboardVisible(false);
        setKeyboardHeight(0);
      });

      return () => {
        showSub.remove();
        hideSub.remove();
      };
    }, [onKeyboardDidShow]);

    // Folga generosa e dinâmica: garante que mesmo em dispositivos Android em Expo Go
    // o ScrollView possua altura de rolagem extra suficiente para que o campo ativo
    // (inclusive Endereço e botões na base) suba completamente para cima do teclado
    const dynamicBottomPadding = isKeyboardVisible
      ? Math.max(keyboardHeight + 80, Platform.OS === 'android' ? 360 : keyboardHeight + 60)
      : extraBottomPadding;

    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={keyboardVerticalOffset}
        style={[styles.keyboardView, style]}>
        <ScrollView
          ref={ref}
          keyboardShouldPersistTaps={keyboardShouldPersistTaps}
          keyboardDismissMode={keyboardDismissMode}
          showsVerticalScrollIndicator={showsVerticalScrollIndicator}
          contentContainerStyle={[
            styles.scrollContent,
            contentContainerStyle,
            { paddingBottom: dynamicBottomPadding },
          ]}
          {...restProps}>
          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
);

KeyboardScrollContainer.displayName = 'KeyboardScrollContainer';

const styles = StyleSheet.create({
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
