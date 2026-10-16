import { User, Result } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

export class GetAllUsersUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(): Promise<Result<User[]>> {
    try {
      const users = await this.userRepository.getAll();
      return { success: true, data: users };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Erro ao carregar a lista de usuários.',
      };
    }
  }
}
