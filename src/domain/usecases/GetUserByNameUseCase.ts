import { User, Result } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

export class GetUserByNameUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(name: string): Promise<Result<User>> {
    const trimmed = name?.trim();
    if (!trimmed) {
      return { success: false, error: 'Por favor entre com o nome do usuário para pesquisar!' };
    }

    try {
      const user = await this.userRepository.getByName(trimmed);
      if (!user) {
        return { success: false, error: `Nenhum usuário encontrado com o nome "${trimmed}"!` };
      }
      return { success: true, data: user };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Erro ao buscar usuário por nome.',
      };
    }
  }
}
