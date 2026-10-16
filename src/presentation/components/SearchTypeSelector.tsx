import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { theme } from '../theme';

interface SearchTypeSelectorProps {
  searchType: 'id' | 'name';
  onSelectType: (type: 'id' | 'name') => void;
  activeColor?: string;
}

export const SearchTypeSelector: React.FC<SearchTypeSelectorProps> = ({
  searchType,
  onSelectType,
  activeColor = theme.colors.primary,
}) => {
  const isId = searchType === 'id';
  const isName = searchType === 'name';

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.tab,
          isId && [styles.activeTab, { backgroundColor: activeColor }],
        ]}
        onPress={() => onSelectType('id')}
        activeOpacity={0.8}>
        <FontAwesome
          name="hashtag"
          size={14}
          color={isId ? '#FFFFFF' : theme.colors.textSecondary}
          style={styles.icon}
        />
        <Text style={[styles.tabText, isId && styles.activeTabText]}>
          Por Código
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[
          styles.tab,
          isName && [styles.activeTab, { backgroundColor: activeColor }],
        ]}
        onPress={() => onSelectType('name')}
        activeOpacity={0.8}>
        <FontAwesome
          name="user"
          size={14}
          color={isName ? '#FFFFFF' : theme.colors.textSecondary}
          style={styles.icon}
        />
        <Text style={[styles.tabText, isName && styles.activeTabText]}>
          Por Nome
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: theme.borderRadius.md,
    padding: 4,
    marginHorizontal: theme.spacing.lg,
    marginTop: 8,
    marginBottom: 4,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    borderRadius: theme.borderRadius.sm,
  },
  activeTab: {
    ...theme.shadows.sm,
  },
  icon: {
    marginRight: 6,
  },
  tabText: {
    fontSize: 13,
    fontWeight: '600',
    color: theme.colors.textSecondary,
  },
  activeTabText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
});
