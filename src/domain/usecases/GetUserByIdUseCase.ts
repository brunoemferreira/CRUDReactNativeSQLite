import { User, Result } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

export class GetUserByIdUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(id: number): Promise<Result<User>> {
    if (!id || isNaN(id) || id <= 0) {
      return { success: false, error: 'Por favor entre com um código de usuário válido!' };
    }

    try {
      const user = await this.userRepository.getById(id);
      if (!user) {
        return { success: false, error: 'Usuário não encontrado!' };
      }
      return { success: true, data: user };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Erro ao buscar usuário.',
      };
    }
  }
}
