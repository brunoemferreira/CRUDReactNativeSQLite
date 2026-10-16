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
import { SearchTypeSelector } from '../components/SearchTypeSelector';
import { KeyboardScrollContainer } from '../components/KeyboardScrollContainer';
import { UpdateScreenNavigationProp } from '../../navigation/types';
import {
  getUserByIdUseCase,
  getUserByNameUseCase,
  updateUserUseCase,
} from '../../di/container';
import { theme } from '../theme';

const SCREEN_COLOR = '#0284C7'; // Sky / Cyan Blue (cor do botão de Atualizar)

interface UpdateUserScreenProps {
  navigation: UpdateScreenNavigationProp;
}

export const UpdateUserScreen: React.FC<UpdateUserScreenProps> = ({ navigation }) => {
  const [searchType, setSearchType] = useState<'id' | 'name'>('id');
  const [searchValue, setSearchValue] = useState('');
  const [targetUserId, setTargetUserId] = useState<number | null>(null);
  const [userName, setUserName] = useState('');
  const [userContact, setUserContact] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [userFound, setUserFound] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const activeFieldRef = useRef<'search' | 'name' | 'contact' | 'address' | null>(null);

  const doScroll = (position: 'search' | 'name' | 'contact' | 'address') => {
    switch (position) {
      case 'search':
        scrollRef.current?.scrollTo({ y: 0, animated: true });
        break;
      case 'name':
        scrollRef.current?.scrollTo({ y: 190, animated: true });
        break;
      case 'contact':
        scrollRef.current?.scrollTo({ y: 280, animated: true });
        break;
      case 'address':
        scrollRef.current?.scrollTo({ y: 400, animated: true });
        break;
    }
  };

  const scrollToInput = (position: 'search' | 'name' | 'contact' | 'address') => {
    activeFieldRef.current = position;
    doScroll(position);
    setTimeout(() => doScroll(position), 150);
    setTimeout(() => doScroll(position), 350);
  };

  const handleSearchUser = async () => {
    const query = searchValue.trim();
    if (!query) {
      Alert.alert(
        'Atenção',
        searchType === 'id'
          ? 'Por favor informe um código de usuário válido!'
          : 'Por favor digite o nome do usuário para pesquisar!'
      );
      return;
    }

    setIsSearching(true);
    let result;

    if (searchType === 'id') {
      const id = parseInt(query, 10);
      if (isNaN(id) || id <= 0) {
        setIsSearching(false);
        Alert.alert('Atenção', 'O código do usuário deve ser um número válido!');
        return;
      }
      result = await getUserByIdUseCase.execute(id);
    } else {
      result = await getUserByNameUseCase.execute(query);
    }

    setIsSearching(false);

    if (result.success) {
      setTargetUserId(result.data.id);
      setUserName(result.data.name);
      setUserContact(result.data.contact);
      setUserAddress(result.data.address);
      setUserFound(true);
    } else {
      Alert.alert('Aviso', result.error);
      setTargetUserId(null);
      setUserName('');
      setUserContact('');
      setUserAddress('');
      setUserFound(false);
    }
  };

  const handleUpdateUser = async () => {
    if (!targetUserId || targetUserId <= 0) {
      Alert.alert('Atenção', 'Localize primeiro o usuário que deseja atualizar!');
      return;
    }

    setIsSubmitting(true);
    const result = await updateUserUseCase.execute({
      id: targetUserId,
      name: userName,
      contact: userContact,
      address: userAddress,
    });
    setIsSubmitting(false);

    if (result.success) {
      Alert.alert(
        'Sucesso',
        'Usuário atualizado com sucesso!',
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
        
        {/* Search Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <FontAwesome name="search" size={16} color={SCREEN_COLOR} />
            <Text style={styles.cardHeaderTitle}>Localizar Registro para Editar</Text>
          </View>

          {/* Selector: Por Código vs Por Nome */}
          <SearchTypeSelector
            searchType={searchType}
            onSelectType={(type) => {
              setSearchType(type);
              setSearchValue('');
              setUserFound(false);
              setTargetUserId(null);
            }}
            activeColor={SCREEN_COLOR}
          />

          <MyTextInput
            label={searchType === 'id' ? 'Código do Usuário (ID) *' : 'Nome do Usuário *'}
            icon={searchType === 'id' ? 'hashtag' : 'user'}
            placeholder={searchType === 'id' ? 'Ex: 1' : 'Ex: Lucas Mendes'}
            keyboardType={searchType === 'id' ? 'numeric' : 'default'}
            value={searchValue}
            onChangeText={(text) => {
              setSearchValue(text);
              if (userFound) setUserFound(false);
            }}
            onFocus={() => scrollToInput('search')}
          />

          <MyButton
            title="Buscar Registro"
            icon="search"
            loading={isSearching}
            customClick={handleSearchUser}
            style={[styles.cardButton, { backgroundColor: SCREEN_COLOR }]}
          />
        </View>

        {/* Edit Form Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <FontAwesome name="edit" size={16} color={SCREEN_COLOR} />
            <Text style={styles.cardHeaderTitle}>Dados para Atualização</Text>
            {userFound && targetUserId && (
              <View style={styles.badgeSuccess}>
                <Text style={styles.badgeSuccessText}>ID #{targetUserId} Carregado</Text>
              </View>
            )}
          </View>

          <MyTextInput
            label="Nome Completo *"
            icon="user"
            placeholder="Nome do Usuário"
            value={userName}
            onChangeText={setUserName}
            onFocus={() => scrollToInput('name')}
          />

          <MyTextInput
            label="Telefone / Contato *"
            icon="phone"
            placeholder="Telefone"
            value={userContact}
            onChangeText={setUserContact}
            maxLength={15}
            keyboardType="phone-pad"
            onFocus={() => scrollToInput('contact')}
          />

          <MyTextInput
            label="Endereço *"
            icon="map-marker"
            placeholder="Endereço completo"
            value={userAddress}
            onChangeText={setUserAddress}
            maxLength={255}
            numberOfLines={4}
            multiline={true}
            onFocus={() => scrollToInput('address')}
          />

          <MyButton
            title="Salvar Alterações"
            icon="save"
            loading={isSubmitting}
            customClick={handleUpdateUser}
            style={[styles.cardButton, { backgroundColor: SCREEN_COLOR }]}
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
  card: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    paddingVertical: theme.spacing.md,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    marginBottom: 6,
  },
  cardHeaderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    marginLeft: 10,
    flex: 1,
  },
  badgeSuccess: {
    backgroundColor: '#E0F2FE',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
  },
  badgeSuccessText: {
    color: SCREEN_COLOR,
    fontSize: 11,
    fontWeight: '700',
  },
  cardButton: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
});
