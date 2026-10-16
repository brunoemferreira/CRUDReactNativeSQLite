import { CreateUserInput, Result } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

export class CreateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: CreateUserInput): Promise<Result<number>> {
    if (!input.name || input.name.trim().length === 0) {
      return { success: false, error: 'Por favor preencha o nome!' };
    }

    if (!input.contact || input.contact.trim().length === 0) {
      return { success: false, error: 'Por favor preencha o contato!' };
    }

    if (!input.address || input.address.trim().length === 0) {
      return { success: false, error: 'Por favor preencha o endereço!' };
    }

    try {
      const createdId = await this.userRepository.create({
        name: input.name.trim(),
        contact: input.contact.trim(),
        address: input.address.trim(),
      });
      return { success: true, data: createdId };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Erro ao registrar o usuário.',
      };
    }
  }
}
