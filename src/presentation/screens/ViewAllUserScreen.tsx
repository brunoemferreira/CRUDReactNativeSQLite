import React, { useCallback, useMemo, useState } from 'react';
import {
  FlatList,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useUsers } from '../hooks/useUsers';
import { User } from '../../domain/entities/User';
import { theme } from '../theme';

const SCREEN_COLOR = '#7C3AED'; // Violet / Purple (cor do botão de Visualizar Todos)

export const ViewAllUserScreen: React.FC = () => {
  const { users, loading, errorMessage, fetchUsers } = useUsers();
  const [searchQuery, setSearchQuery] = useState('');

  useFocusEffect(
    useCallback(() => {
      fetchUsers();
    }, [fetchUsers])
  );

  const filteredUsers = useMemo(() => {
    if (!searchQuery.trim()) return users;
    const query = searchQuery.toLowerCase().trim();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(query) ||
        user.contact.toLowerCase().includes(query) ||
        user.address.toLowerCase().includes(query) ||
        user.id.toString() === query
    );
  }, [users, searchQuery]);

  const renderUserItem = ({ item }: { item: User }) => {
    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={[styles.avatar, { backgroundColor: SCREEN_COLOR }]}>
            <Text style={styles.avatarText}>
              {item.name ? item.name.charAt(0).toUpperCase() : 'U'}
            </Text>
          </View>
          <View style={styles.headerInfo}>
            <Text style={styles.userName}>{item.name}</Text>
            <View style={[styles.idBadge, { backgroundColor: '#F3E8FF' }]}>
              <Text style={[styles.idBadgeText, { color: '#6D28D9' }]}>
                ID #{item.id}
              </Text>
            </View>
          </View>
        </View>

        <View style={styles.divider} />

        <View style={styles.detailRow}>
          <FontAwesome name="phone" size={14} color={SCREEN_COLOR} style={styles.rowIcon} />
          <Text style={styles.detailText}>{item.contact}</Text>
        </View>

        <View style={styles.detailRow}>
          <FontAwesome
            name="map-marker"
            size={16}
            color="#EF4444"
            style={styles.rowIcon}
          />
          <Text style={styles.detailText}>{item.address}</Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Count Bar */}
        <View style={styles.topBar}>
          <Text style={styles.topBarTitle}>Base de Dados Local</Text>
          <View style={[styles.counterBadge, { backgroundColor: '#F3E8FF' }]}>
            <Text style={[styles.counterText, { color: SCREEN_COLOR }]}>
              {searchQuery.trim()
                ? `${filteredUsers.length} de ${users.length}`
                : `${users.length} ${users.length === 1 ? 'usuário' : 'usuários'}`}
            </Text>
          </View>
        </View>

        {/* Search Bar when users exist */}
        {users.length > 0 && (
          <View style={styles.searchBarWrapper}>
            <View style={styles.searchBar}>
              <FontAwesome name="search" size={15} color={theme.colors.textMuted} style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Filtrar por nome, telefone ou ID..."
                placeholderTextColor={theme.colors.textMuted}
                value={searchQuery}
                onChangeText={setSearchQuery}
                autoCapitalize="none"
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity
                  onPress={() => setSearchQuery('')}
                  hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}>
                  <FontAwesome name="times-circle" size={16} color={theme.colors.textMuted} />
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}

        {loading && users.length === 0 ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color={SCREEN_COLOR} />
            <Text style={styles.loadingText}>Carregando registros...</Text>
          </View>
        ) : errorMessage ? (
          <View style={styles.centerContainer}>
            <FontAwesome name="exclamation-circle" size={48} color={theme.colors.danger} />
            <Text style={styles.errorText}>{errorMessage}</Text>
          </View>
        ) : users.length === 0 ? (
          <View style={styles.centerContainer}>
            <View style={styles.emptyIconCircle}>
              <FontAwesome name="users" size={44} color={theme.colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>Nenhum usuário cadastrado</Text>
            <Text style={styles.emptySubtitle}>
              Os registros salvos no SQLite aparecerão listados aqui.
            </Text>
          </View>
        ) : filteredUsers.length === 0 ? (
          <View style={styles.centerContainer}>
            <View style={styles.emptyIconCircle}>
              <FontAwesome name="search-minus" size={38} color={theme.colors.textMuted} />
            </View>
            <Text style={styles.emptyTitle}>Nenhum registro encontrado</Text>
            <Text style={styles.emptySubtitle}>
              Nenhum usuário corresponde à busca "{searchQuery}".
            </Text>
          </View>
        ) : (
          <FlatList
            contentContainerStyle={styles.listContent}
            data={filteredUsers}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderUserItem}
            refreshing={loading}
            onRefresh={fetchUsers}
            showsVerticalScrollIndicator={false}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    flex: 1,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 14,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  topBarTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  counterBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  counterText: {
    fontSize: 12,
    fontWeight: '700',
  },
  searchBarWrapper: {
    backgroundColor: theme.colors.surface,
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    borderRadius: theme.borderRadius.lg,
    paddingHorizontal: 12,
    height: 42,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: theme.colors.text,
    paddingVertical: 0,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: theme.colors.textSecondary,
  },
  emptyIconCircle: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: theme.colors.text,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 14,
    color: theme.colors.textMuted,
    textAlign: 'center',
    marginTop: 6,
    lineHeight: 20,
  },
  listContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
    paddingBottom: 30,
  },
  card: {
    backgroundColor: theme.colors.surface,
    marginBottom: 14,
    padding: 16,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.md,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  headerInfo: {
    flex: 1,
    marginLeft: 12,
  },
  userName: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
  },
  idBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
    alignSelf: 'flex-start',
    marginTop: 3,
  },
  idBadgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.borderLight,
    marginVertical: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  rowIcon: {
    width: 20,
    textAlign: 'center',
    marginRight: 8,
  },
  detailText: {
    fontSize: 14,
    color: theme.colors.textSecondary,
    flex: 1,
  },
  errorText: {
    color: theme.colors.danger,
    fontSize: 16,
    textAlign: 'center',
    marginTop: 12,
  },
});
