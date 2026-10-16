import { User, CreateUserInput, UpdateUserInput } from '../entities/User';

export interface IUserRepository {
  create(input: CreateUserInput): Promise<number>;
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User | null>;
  getByName(name: string): Promise<User | null>;
  update(input: UpdateUserInput): Promise<boolean>;
  delete(id: number): Promise<boolean>;
}
