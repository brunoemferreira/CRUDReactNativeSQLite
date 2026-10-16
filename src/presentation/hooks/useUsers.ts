import { useState, useCallback } from 'react';
import { User } from '../../domain/entities/User';
import { getAllUsersUseCase } from '../../di/container';

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
    try {
      const result = await getAllUsersUseCase.execute();
      if (result.success) {
        setUsers(result.data);
      } else {
        setErrorMessage(result.error);
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'Erro inesperado ao listar usuários.');
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    users,
    loading,
    errorMessage,
    fetchUsers,
  };
};
