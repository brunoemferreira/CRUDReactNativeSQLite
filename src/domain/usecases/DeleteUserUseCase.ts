import { Result } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

export class DeleteUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number): Promise<Result<boolean>> {
    if (!id || isNaN(id) || id <= 0) {
      return { success: false, error: 'Por favor entre com um código de usuário válido!' };
    }

    try {
      const deleted = await this.userRepository.delete(id);
      if (!deleted) {
        return { success: false, error: 'Usuário não encontrado ou já excluído.' };
      }
      return { success: true, data: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Erro ao excluir o usuário.',
      };
    }
  }
}
