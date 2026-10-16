import React, { useState } from 'react';
import { View, Text, Alert, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesome } from '@expo/vector-icons';
import { MyTextInput } from '../components/MyTextInput';
import { MyButton } from '../components/MyButton';
import { SearchTypeSelector } from '../components/SearchTypeSelector';
import { DeleteScreenNavigationProp } from '../../navigation/types';
import { deleteUserUseCase, getUserByIdUseCase, getUserByNameUseCase } from '../../di/container';
import { theme } from '../theme';

const SCREEN_COLOR = '#EF4444'; // Red / Rose (cor do botão de Excluir)

interface DeleteUserScreenProps {
  navigation: DeleteScreenNavigationProp;
}

export const DeleteUserScreen: React.FC<DeleteUserScreenProps> = ({ navigation }) => {
  const [searchType, setSearchType] = useState<'id' | 'name'>('id');
  const [searchValue, setSearchValue] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteUser = async () => {
    const query = searchValue.trim();
    if (!query) {
      Alert.alert(
        'Atenção',
        searchType === 'id'
          ? 'Por favor entre com um código de usuário válido!'
          : 'Por favor entre com o nome do usuário para excluir!'
      );
      return;
    }

    setIsDeleting(true);
    let targetId: number;
    let targetName = '';

    if (searchType === 'id') {
      const id = parseInt(query, 10);
      if (isNaN(id) || id <= 0) {
        setIsDeleting(false);
        Alert.alert('Atenção', 'O código de usuário deve ser um número válido!');
        return;
      }
      const findResult = await getUserByIdUseCase.execute(id);
      if (!findResult.success) {
        setIsDeleting(false);
        Alert.alert('Aviso', findResult.error);
        return;
      }
      targetId = findResult.data.id;
      targetName = findResult.data.name;
    } else {
      const findResult = await getUserByNameUseCase.execute(query);
      if (!findResult.success) {
        setIsDeleting(false);
        Alert.alert('Aviso', findResult.error);
        return;
      }
      targetId = findResult.data.id;
      targetName = findResult.data.name;
    }

    setIsDeleting(false);

    Alert.alert(
      'Confirmar Exclusão',
      `Deseja realmente excluir o usuário "${targetName}" (ID #${targetId})? Esta ação removerá definitivamente o registro do SQLite.`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir Definitivamente',
          style: 'destructive',
          onPress: async () => {
            setIsDeleting(true);
            const result = await deleteUserUseCase.execute(targetId);
            setIsDeleting(false);

            if (result.success) {
              Alert.alert(
                'Sucesso',
                `Usuário "${targetName}" excluído com sucesso!`,
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
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}>
        
        {/* Warning Banner */}
        <View style={styles.warningCard}>
          <View style={styles.warningIconContainer}>
            <FontAwesome name="exclamation-triangle" size={20} color={SCREEN_COLOR} />
          </View>
          <View style={styles.warningTextContainer}>
            <Text style={styles.warningTitle}>Zona de Perigo</Text>
            <Text style={styles.warningDescription}>
              A exclusão remove permanentemente o usuário da base SQLite. Localize por código ou nome antes de confirmar.
            </Text>
          </View>
        </View>

        {/* Delete Form Card */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <FontAwesome name="trash" size={16} color={SCREEN_COLOR} />
            <Text style={styles.cardHeaderTitle}>Identificação do Usuário</Text>
          </View>

          {/* Selector: Por Código vs Por Nome */}
          <SearchTypeSelector
            searchType={searchType}
            onSelectType={(type) => {
              setSearchType(type);
              setSearchValue('');
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
            title="Excluir Usuário"
            icon="trash"
            variant="danger"
            loading={isDeleting}
            customClick={handleDeleteUser}
            style={styles.deleteButton}
          />
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
  warningCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.dangerLight,
    marginHorizontal: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: '#FECACA',
    marginBottom: theme.spacing.md,
  },
  warningIconContainer: {
    width: 40,
    height: 40,
    borderRadius: theme.borderRadius.full,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  warningTextContainer: {
    flex: 1,
  },
  warningTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: SCREEN_COLOR,
  },
  warningDescription: {
    fontSize: 13,
    color: '#991B1B',
    marginTop: 2,
    lineHeight: 18,
  },
  card: {
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
  deleteButton: {
    marginTop: theme.spacing.lg,
    marginBottom: theme.spacing.xs,
  },
});
