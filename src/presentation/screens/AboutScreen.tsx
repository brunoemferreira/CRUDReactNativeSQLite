import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../theme';

const SCREEN_COLOR = '#0D9488'; // Teal

interface TechItemProps {
  name: string;
  version: string;
  description: string;
  icon: keyof typeof FontAwesome.glyphMap;
}

const TechItem: React.FC<TechItemProps> = ({ name, version, description, icon }) => (
  <View style={styles.techItem}>
    <View style={styles.techIconContainer}>
      <FontAwesome name={icon} size={16} color={SCREEN_COLOR} />
    </View>
    <View style={styles.techDetails}>
      <View style={styles.techHeader}>
        <Text style={styles.techName}>{name}</Text>
        <View style={styles.versionBadge}>
          <Text style={styles.versionText}>{version}</Text>
        </View>
      </View>
      <Text style={styles.techDescription}>{description}</Text>
    </View>
  </View>
);

export const AboutScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}>
        
        {/* App Hero Card */}
        <View style={styles.heroCard}>
          <View style={styles.iconCircle}>
            <FontAwesome name="database" size={32} color="#FFFFFF" />
          </View>
          <Text style={styles.appName}>Controle de Usuários</Text>
          <Text style={styles.appSubtitle}>CRUD React Native com SQLite & Clean Arch</Text>
          <View style={styles.heroBadgeRow}>
            <View style={styles.heroBadge}>
              <Text style={styles.heroBadgeText}>Versão 1.0.0</Text>
            </View>
            <View style={[styles.heroBadge, styles.heroBadgeAccent]}>
              <Text style={styles.heroBadgeText}>Expo SDK 57</Text>
            </View>
          </View>
        </View>

        {/* Informações Gerais */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <FontAwesome name="info-circle" size={16} color={SCREEN_COLOR} />
            <Text style={styles.sectionTitle}>Sobre o Aplicativo</Text>
          </View>

          <Text style={styles.paragraph}>
            Aplicação mobile profissional desenvolvida como referência educacional de Clean Architecture, Clean Code e tipagem estrita com TypeScript, utilizando persistência local no SQLite.
          </Text>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Desenvolvedor</Text>
            <Text style={styles.infoValue}>Bruno Eduardo Ferreira</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Licença</Text>
            <Text style={styles.infoValue}>MIT (Código Aberto)</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Repositório</Text>
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('https://github.com/brunoemferreira/CRUDReactNativeSQLite')
              }>
              <Text style={[styles.infoValue, styles.linkText]}>
                brunoemferreira/CRUDReactNativeSQLite
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Bibliotecas e Tecnologias */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <FontAwesome name="cubes" size={16} color={SCREEN_COLOR} />
            <Text style={styles.sectionTitle}>Bibliotecas & Tecnologias</Text>
          </View>

          <TechItem
            name="React Native"
            version="0.86.3"
            description="Framework nativo de alta performance com a New Architecture ativa."
            icon="mobile"
          />

          <TechItem
            name="Expo SDK"
            version="57.0.30"
            description="Ambiente moderno para desenvolvimento e execução de módulos nativos."
            icon="rocket"
          />

          <TechItem
            name="expo-sqlite"
            version="v15 (~57.0.4)"
            description="Engine SQLite nativo de alta velocidade com API síncrona via JSI."
            icon="database"
          />

          <TechItem
            name="React Navigation"
            version="v7.1.1"
            description="Roteamento seguro com transições nativas e Stack Navigator tipado."
            icon="compass"
          />

          <TechItem
            name="TypeScript"
            version="6.0.3"
            description="Checagem estrita sem 'any' implícito, prevenção de bugs em compilação."
            icon="code"
          />

          <TechItem
            name="React"
            version="19.2.3"
            description="Biblioteca core para interfaces declarativas e hooks de ciclo de vida."
            icon="gear"
          />

          <TechItem
            name="Gesture Handler & Screens"
            version="~2.32 / ~4.26"
            description="Otimizações e aceleração de renderização de telas e gestos nativos."
            icon="hand-pointer-o"
          />

          <TechItem
            name="@expo/vector-icons"
            version="^15.0.2"
            description="Conjunto icônico completo e consistente integrado diretamente ao build."
            icon="star"
          />
        </View>

        {/* Pilares Arquiteturais */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <FontAwesome name="shield" size={16} color={SCREEN_COLOR} />
            <Text style={styles.sectionTitle}>Pilares da Arquitetura</Text>
          </View>

          <View style={styles.pillarItem}>
            <Text style={styles.pillarTitle}>1. Regras Puras (Domain)</Text>
            <Text style={styles.pillarDesc}>
              TypeScript puro sem dependências de bibliotecas de UI ou banco.
            </Text>
          </View>

          <View style={styles.pillarItem}>
            <Text style={styles.pillarTitle}>2. Persistência Isolada (Data)</Text>
            <Text style={styles.pillarDesc}>
              Acesso ao SQLite desacoplado por contratos e repositórios tipados.
            </Text>
          </View>

          <View style={styles.pillarItem}>
            <Text style={styles.pillarTitle}>3. Result Pattern</Text>
            <Text style={styles.pillarDesc}>
              Tratamento previsível e tipado de sucesso e erro sem exceções não tratadas.
            </Text>
          </View>
        </View>
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
    paddingVertical: theme.spacing.md,
    paddingBottom: 40,
  },
  heroCard: {
    backgroundColor: '#0F172A',
    marginHorizontal: theme.spacing.lg,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.xl,
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    ...theme.shadows.lg,
  },
  iconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: SCREEN_COLOR,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
    ...theme.shadows.md,
  },
  appName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    letterSpacing: 0.3,
  },
  appSubtitle: {
    fontSize: 13,
    color: '#94A3B8',
    marginTop: 4,
    textAlign: 'center',
  },
  heroBadgeRow: {
    flexDirection: 'row',
    marginTop: 14,
    gap: 8,
  },
  heroBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.full,
  },
  heroBadgeAccent: {
    backgroundColor: 'rgba(13, 148, 136, 0.4)',
  },
  heroBadgeText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  sectionCard: {
    backgroundColor: theme.colors.surface,
    marginHorizontal: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
    ...theme.shadows.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: theme.colors.text,
    marginLeft: 10,
  },
  paragraph: {
    fontSize: 14,
    lineHeight: 22,
    color: theme.colors.textSecondary,
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.borderLight,
    marginVertical: 14,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoLabel: {
    fontSize: 13,
    color: theme.colors.textSecondary,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.text,
  },
  linkText: {
    color: SCREEN_COLOR,
    textDecorationLine: 'underline',
  },
  techItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 14,
  },
  techIconContainer: {
    width: 32,
    height: 32,
    borderRadius: theme.borderRadius.sm,
    backgroundColor: '#CCFBF1',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  techDetails: {
    flex: 1,
  },
  techHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  techName: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.text,
  },
  versionBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: theme.borderRadius.full,
  },
  versionText: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textSecondary,
  },
  techDescription: {
    fontSize: 12,
    color: theme.colors.textMuted,
    marginTop: 2,
    lineHeight: 17,
  },
  pillarItem: {
    marginBottom: 10,
  },
  pillarTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: theme.colors.text,
  },
  pillarDesc: {
    fontSize: 12,
    color: theme.colors.textSecondary,
    marginTop: 2,
    lineHeight: 17,
  },
});
