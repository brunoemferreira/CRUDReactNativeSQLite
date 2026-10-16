import { DatabaseManager } from '../data/database/DatabaseManager';
import { SQLiteUserRepository } from '../data/repositories/SQLiteUserRepository';
import { CreateUserUseCase } from '../domain/usecases/CreateUserUseCase';
import { GetAllUsersUseCase } from '../domain/usecases/GetAllUsersUseCase';
import { GetUserByIdUseCase } from '../domain/usecases/GetUserByIdUseCase';
import { UpdateUserUseCase } from '../domain/usecases/UpdateUserUseCase';
import { DeleteUserUseCase } from '../domain/usecases/DeleteUserUseCase';
import { GetUserByNameUseCase } from '../domain/usecases/GetUserByNameUseCase';

// Inicializa a conexão SQLite e injeta no repositório
const db = DatabaseManager.getInstance();
const userRepository = new SQLiteUserRepository(db);

// Instâncias prontas dos Casos de Uso
export const createUserUseCase = new CreateUserUseCase(userRepository);
export const getAllUsersUseCase = new GetAllUsersUseCase(userRepository);
export const getUserByIdUseCase = new GetUserByIdUseCase(userRepository);
export const getUserByNameUseCase = new GetUserByNameUseCase(userRepository);
export const updateUserUseCase = new UpdateUserUseCase(userRepository);
export const deleteUserUseCase = new DeleteUserUseCase(userRepository);
