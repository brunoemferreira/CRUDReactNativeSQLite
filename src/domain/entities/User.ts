export interface User {
  id: number;
  name: string;
  contact: string;
  address: string;
}

export type CreateUserInput = Omit<User, 'id'>;

export type UpdateUserInput = User;

export type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string };
