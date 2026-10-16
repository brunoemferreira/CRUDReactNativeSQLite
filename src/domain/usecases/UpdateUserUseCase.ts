import { UpdateUserInput, Result } from '../entities/User';
import { IUserRepository } from '../repositories/IUserRepository';

export class UpdateUserUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: UpdateUserInput): Promise<Result<boolean>> {
    if (!input.id || isNaN(input.id) || input.id <= 0) {
      return { success: false, error: 'Por favor informe o Código!' };
    }

    if (!input.name || input.name.trim().length === 0) {
      return { success: false, error: 'Por favor informe o Nome!' };
    }

    if (!input.contact || input.contact.trim().length === 0) {
      return { success: false, error: 'Por favor informe o Telefone!' };
    }

    if (!input.address || input.address.trim().length === 0) {
      return { success: false, error: 'Por favor informe o Endereço!' };
    }

    try {
      const updated = await this.userRepository.update({
        id: input.id,
        name: input.name.trim(),
        contact: input.contact.trim(),
        address: input.address.trim(),
      });

      if (!updated) {
        return { success: false, error: 'Usuário não encontrado para atualização.' };
      }

      return { success: true, data: true };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Erro ao atualizar o usuário.',
      };
    }
  }
}
