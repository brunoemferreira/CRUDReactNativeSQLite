import { SQLiteDatabase } from 'expo-sqlite';
import { IUserRepository } from '../../domain/repositories/IUserRepository';
import { User, CreateUserInput, UpdateUserInput } from '../../domain/entities/User';

interface UserRow {
  user_id: number;
  user_name: string;
  user_contact: string | number;
  user_address: string;
}

export class SQLiteUserRepository implements IUserRepository {
  constructor(private readonly db: SQLiteDatabase) {}

  private mapRowToUser(row: UserRow): User {
    return {
      id: row.user_id,
      name: row.user_name,
      contact: String(row.user_contact),
      address: row.user_address,
    };
  }

  async create(input: CreateUserInput): Promise<number> {
    const result = this.db.runSync(
      'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?, ?, ?)',
      [input.name, input.contact, input.address]
    );
    return result.lastInsertRowId;
  }

  async getAll(): Promise<User[]> {
    const rows = this.db.getAllSync<UserRow>(
      'SELECT user_id, user_name, user_contact, user_address FROM table_user ORDER BY user_id DESC'
    );
    return rows.map((row) => this.mapRowToUser(row));
  }

  async getById(id: number): Promise<User | null> {
    const row = this.db.getFirstSync<UserRow>(
      'SELECT user_id, user_name, user_contact, user_address FROM table_user WHERE user_id = ?',
      [id]
    );
    return row ? this.mapRowToUser(row) : null;
  }

  async getByName(name: string): Promise<User | null> {
    const trimmed = name.trim();
    const row = this.db.getFirstSync<UserRow>(
      'SELECT user_id, user_name, user_contact, user_address FROM table_user WHERE LOWER(user_name) = LOWER(?) OR LOWER(user_name) LIKE LOWER(?) ORDER BY user_id DESC LIMIT 1',
      [trimmed, `%${trimmed}%`]
    );
    return row ? this.mapRowToUser(row) : null;
  }

  async update(input: UpdateUserInput): Promise<boolean> {
    const result = this.db.runSync(
      'UPDATE table_user SET user_name = ?, user_contact = ?, user_address = ? WHERE user_id = ?',
      [input.name, input.contact, input.address, input.id]
    );
    return result.changes > 0;
  }

  async delete(id: number): Promise<boolean> {
    const result = this.db.runSync(
      'DELETE FROM table_user WHERE user_id = ?',
      [id]
    );
    return result.changes > 0;
  }
}
