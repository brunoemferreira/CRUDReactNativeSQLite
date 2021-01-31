import * as SQLite from 'expo-sqlite';

// Conexão com o Banco de Dados do Sqlite 
export const DatabaseConnection = {
  getConnection: () => SQLite.openDatabase("database.db"),
};