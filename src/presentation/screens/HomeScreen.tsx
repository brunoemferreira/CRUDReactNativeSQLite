import React from 'react';
import { View, StyleSheet, ScrollView, Text, StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { MyImageButton } from '../components/MyImageButton';
import { HomeScreenNavigationProp } from '../../navigation/types';
import { theme } from '../theme';

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={theme.colors.primaryDark} />
      <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
        {/* Header Hero Banner */}
        <View style={styles.heroCard}>
          <View style={styles.heroBadgeRow}>
            <View style={styles.badge}>
              <FontAwesome name="database" size={12} color="#FFFFFF" />
              <Text style={styles.badgeText}>SQLite v15</Text>
            </View>
            <View style={[styles.badge, styles.badgeSecondary]}>
              <FontAwesome name="code" size={12} color="#FFFFFF" />
              <Text style={styles.badgeText}>TypeScript</Text>
            </View>
          </View>

          <Text style={styles.heroTitle}>Painel de Controle</Text>
          <Text style={styles.heroSubtitle}>
            Gerencie registros no banco de dados local com Clean Architecture
          </Text>
        </View>

        {/* Section Title */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Menu Principal</Text>
          <Text style={styles.sectionCount}>6 opções</Text>
        </View>

        {/* Action Cards */}
        <MyImageButton
          title="Registrar Usuário"
          subtitle="Cadastrar novo usuário no banco local"
          btnColor="#4F46E5"
          btnIcon="user-plus"
          customClick={() => navigation.navigate('Register')}
        />

        <MyImageButton
          title="Atualizar Usuário"
          subtitle="Modificar telefone, nome ou endereço"
          btnColor="#0284C7"
          btnIcon="edit"
          customClick={() => navigation.navigate('Update')}
        />

        <MyImageButton
          title="Visualizar Usuário"
          subtitle="Consultar dados por código ou nome"
          btnColor="#D97706"
          btnIcon="search"
          customClick={() => navigation.navigate('View')}
        />

        <MyImageButton
          title="Visualizar Todos"
          subtitle="Listar todos os usuários cadastrados"
          btnColor="#7C3AED"
          btnIcon="users"
          customClick={() => navigation.navigate('ViewAll')}
        />

        <MyImageButton
          title="Excluir Usuário"
          subtitle="Remover registro definitivamente do banco"
          btnColor="#EF4444"
          btnIcon="trash"
          customClick={() => navigation.navigate('Delete')}
        />

        <MyImageButton
          title="Sobre o Aplicativo"
          subtitle="Versão do app, bibliotecas e tecnologias"
          btnColor="#0D9488"
          btnIcon="info-circle"
          customClick={() => navigation.navigate('About')}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    paddingBottom: 30,
  },
  heroCard: {
    backgroundColor: theme.colors.primaryDark,
    marginHorizontal: theme.spacing.lg,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    ...theme.shadows.lg,
  },
  heroBadgeRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
    marginRight: 8,
  },
  badgeSecondary: {
    backgroundColor: 'rgba(14, 165, 233, 0.35)',
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
    marginLeft: 6,
    textTransform: 'uppercase',
  },
  heroTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  heroSubtitle: {
    fontSize: 14,
    color: '#CBD5E1',
    marginTop: 6,
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: theme.spacing.lg,
    marginTop: 10,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  sectionCount: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.primary,
    backgroundColor: theme.colors.primaryLight,
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
  },
});
