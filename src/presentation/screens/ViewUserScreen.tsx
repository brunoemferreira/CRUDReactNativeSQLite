import React, { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { MyTextInput } from '../components/MyTextInput';
import { MyButton } from '../components/MyButton';
import { SearchTypeSelector } from '../components/SearchTypeSelector';
import { KeyboardScrollContainer } from '../components/KeyboardScrollContainer';
import { User } from '../../domain/entities/User';
import { getUserByIdUseCase, getUserByNameUseCase } from '../../di/container';
import { theme } from '../theme';

const SCREEN_COLOR = '#D97706'; // Amber / Orange (cor do botão de Consulta)

export const ViewUserScreen: React.FC = () => {
  const [searchType, setSearchType] = useState<'id' | 'name'>('id');
  const [searchValue, setSearchValue] = useState('');
  const [userData, setUserData] = useState<User | null>(null);
  const [isSearching, setIsSearching] = useState(false);

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
      setUserData(result.data);
    } else {
      setUserData(null);
      Alert.alert('Aviso', result.error);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardScrollContainer
        contentContainerStyle={styles.container}
        extraBottomPadding={theme.spacing.xl}>
        
        {/* Search Card */}
        <View style={styles.searchCard}>
          <View style={styles.cardHeader}>
            <FontAwesome name="search" size={16} color={SCREEN_COLOR} />
            <Text style={styles.cardHeaderTitle}>Localizar Registro</Text>
          </View>

          {/* Selector: Por Código vs Por Nome */}
          <SearchTypeSelector
            searchType={searchType}
            onSelectType={(type) => {
              setSearchType(type);
              setSearchValue('');
              setUserData(null);
            }}
            activeColor={SCREEN_COLOR}
          />

          <MyTextInput
            label={searchType === 'id' ? 'Código do Usuário (ID) *' : 'Nome do Usuário *'}
            icon={searchType === 'id' ? 'hashtag' : 'user'}
            placeholder={searchType === 'id' ? 'Ex: 1' : 'Ex: Lucas Mendes'}
            keyboardType={searchType === 'id' ? 'numeric' : 'default'}
            value={searchValue}
            onChangeText={setSearchValue}
          />

          <MyButton
            title="Consultar Registro"
            icon="search"
            loading={isSearching}
            customClick={handleSearchUser}
            style={[styles.searchButton, { backgroundColor: SCREEN_COLOR }]}
          />
        </View>

        {/* User Details Card */}
        {userData ? (
          <View style={styles.profileCard}>
            <View style={styles.profileHeader}>
              <View style={[styles.avatar, { backgroundColor: SCREEN_COLOR }]}>
                <Text style={styles.avatarText}>
                  {userData.name ? userData.name.charAt(0).toUpperCase() : 'U'}
                </Text>
              </View>
              <View style={styles.profileHeaderText}>
                <Text style={styles.profileName}>{userData.name}</Text>
                <View style={[styles.idBadge, { backgroundColor: '#FEF3C7' }]}>
                  <Text style={[styles.idBadgeText, { color: '#92400E' }]}>
                    ID #{userData.id}
                  </Text>
                </View>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <FontAwesome name="phone" size={16} color={SCREEN_COLOR} />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Telefone / Contato</Text>
                <Text style={styles.infoValue}>{userData.contact}</Text>
              </View>
            </View>

            <View style={styles.infoRow}>
              <View style={styles.infoIcon}>
                <FontAwesome name="map-marker" size={18} color="#EF4444" />
              </View>
              <View style={styles.infoContent}>
                <Text style={styles.infoLabel}>Endereço</Text>
                <Text style={styles.infoValue}>{userData.address}</Text>
              </View>
            </View>
          </View>
        ) : (
          <View style={styles.emptyStateContainer}>
            <View style={styles.emptyStateIcon}>
              <FontAwesome name="id-card-o" size={40} color={theme.colors.textMuted} />
            </View>
            <Text style={styles.emptyStateTitle}>Nenhum usuário selecionado</Text>
            <Text style={styles.emptyStateSubtitle}>
              Escolha pesquisar por código ou nome, digite os dados e clique em Consultar.
            </Text>
          </View>
        )}
      </KeyboardScrollContainer>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    paddingVertical: theme.spacing.md,
    paddingBottom: 40,
  },
  searchCard: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
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
  },
  searchButton: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xs,
  },
  profileCard: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.lg,
  },
  profileHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
    ...theme.shadows.md,
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: '700',
  },
  profileHeaderText: {
    flex: 1,
    marginLeft: 16,
  },
  profileName: {
    fontSize: 20,
    fontWeight: '700',
    color: theme.colors.text,
  },
  idBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  idBadgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: 18,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  infoIcon: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: theme.colors.borderLight,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '500',
    color: theme.colors.text,
    marginTop: 3,
    lineHeight: 22,
  },
  emptyStateContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    paddingHorizontal: 30,
  },
  emptyStateIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyStateTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    textAlign: 'center',
  },
  emptyStateSubtitle: {
    fontSize: 14,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
});
