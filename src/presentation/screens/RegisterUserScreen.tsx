import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { MyTextInput } from '../components/MyTextInput';
import { MyButton } from '../components/MyButton';
import { KeyboardScrollContainer } from '../components/KeyboardScrollContainer';
import { RegisterScreenNavigationProp } from '../../navigation/types';
import { createUserUseCase } from '../../di/container';
import { theme } from '../theme';

interface RegisterUserScreenProps {
  navigation: RegisterScreenNavigationProp;
}

export const RegisterUserScreen: React.FC<RegisterUserScreenProps> = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const activeFieldRef = useRef<'name' | 'contact' | 'address' | null>(null);

  const doScroll = (field: 'name' | 'contact' | 'address') => {
    let targetY = 0;
    if (field === 'address') {
      targetY = 240;
    } else if (field === 'contact') {
      targetY = 120;
    } else {
      targetY = 0;
    }
    scrollRef.current?.scrollTo({ y: targetY, animated: true });
  };

  const scrollToInput = (field: 'name' | 'contact' | 'address') => {
    activeFieldRef.current = field;
    doScroll(field);
    setTimeout(() => doScroll(field), 150);
    setTimeout(() => doScroll(field), 350);
  };

  const handleRegisterUser = async () => {
    setIsSubmitting(true);
    const result = await createUserUseCase.execute({
      name: userName,
      contact: userContact,
      address: userAddress,
    });
    setIsSubmitting(false);

    if (result.success) {
      Alert.alert(
        'Sucesso',
        'Usuário Registrado com Sucesso!',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('HomeScreen'),
          },
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert('Erro', result.error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardScrollContainer
        ref={scrollRef}
        contentContainerStyle={styles.scrollContent}
        onKeyboardDidShow={() => {
          if (activeFieldRef.current) {
            doScroll(activeFieldRef.current);
          }
        }}
        extraBottomPadding={theme.spacing.xl}>
        
        {/* Information Card */}
        <View style={styles.infoCard}>
          <View style={styles.infoIconContainer}>
            <FontAwesome name="user-plus" size={20} color={theme.colors.primary} />
          </View>
          <View style={styles.infoTextContainer}>
            <Text style={styles.infoTitle}>Novo Usuário</Text>
            <Text style={styles.infoDescription}>
              Preencha os campos abaixo para persistir os dados no banco SQLite local.
            </Text>
          </View>
        </View>

        {/* Form Card */}
        <View style={styles.formCard}>
          <MyTextInput
            label="Nome Completo *"
            icon="user"
            placeholder="Ex: Maria Silva"
            value={userName}
            onChangeText={setUserName}
            onFocus={() => scrollToInput('name')}
          />

          <MyTextInput
            label="Telefone / Contato *"
            icon="phone"
            placeholder="Ex: (11) 98765-4321"
            value={userContact}
            onChangeText={setUserContact}
            maxLength={15}
            keyboardType="phone-pad"
            onFocus={() => scrollToInput('contact')}
          />

          <MyTextInput
            label="Endereço *"
            icon="map-marker"
            placeholder="Ex: Av. Paulista, 1000 - São Paulo, SP"
            value={userAddress}
            onChangeText={setUserAddress}
            maxLength={255}
            numberOfLines={4}
            multiline={true}
            onFocus={() => scrollToInput('address')}
          />

          <MyButton
            title="Salvar Registro"
            icon="check"
            loading={isSubmitting}
            customClick={handleRegisterUser}
            style={styles.submitButton}
          />
        </View>
      </KeyboardScrollContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  scrollContent: {
    paddingVertical: theme.spacing.md,
  },
  infoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.primaryLight,
    marginHorizontal: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    marginBottom: theme.spacing.md,
  },
  infoIconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: theme.colors.primaryDark,
  },
  infoDescription: {
    fontSize: 13,
    color: '#4338CA',
    marginTop: 2,
    lineHeight: 18,
  },
  formCard: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.md,
  },
  submitButton: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
  },
});
