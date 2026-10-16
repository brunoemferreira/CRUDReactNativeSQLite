import * as SQLite from 'expo-sqlite';

export class DatabaseManager {
  private static instance: SQLite.SQLiteDatabase | null = null;

  static getInstance(): SQLite.SQLiteDatabase {
    if (!this.instance) {
      this.instance = SQLite.openDatabaseSync('database.db');
      this.initSchema(this.instance);
    }
    return this.instance;
  }

  private static initSchema(db: SQLite.SQLiteDatabase): void {
    db.execSync(`
      CREATE TABLE IF NOT EXISTS table_user (
        user_id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name VARCHAR(20),
        user_contact VARCHAR(20),
        user_address VARCHAR(255)
      );
    `);
  }
}
