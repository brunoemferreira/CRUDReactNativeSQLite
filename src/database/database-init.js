import { DatabaseConnection } from './database-connection';

function DatabaseInit() {
  // Instancio a Conexão com o Banco de Dados para trabalhar com ela 
  db = DatabaseConnection.getConnection();
  db.exec([{ sql: 'PRAGMA foreign_keys = ON', args: [] }], false, () =>
    console.log('Foreign Keys turned on')
  );

  // Executa a inicialização do Banco de Dados
  let sql = [
    `DROP TABLE IF EXISTS tbl_user;`,

    `create table if not exists tbl_user (
      user_id integer primary key autoincrement,
      user_name text,
      user_contact text,
      user_address text,
    );`,

    `INSERT INTO tbl_user (user_id, user_name, user_contact, user_address) VALUES ('1', 'User1', '1111111111', 'Address_1');`,
    `INSERT INTO tbl_user (user_id, user_name, user_contact, user_address) VALUES ('2', 'User2', '2222222222', 'Address_2');`
  ];

  db.transaction(
    tx => {
      for (var i = 0; i < sql.length; i++) {
        console.log("execute sql : " + sql[i]);
        tx.executeSql(sql[i]);
      }
    }, (error) => {
      console.log("error call back : " + JSON.stringify(error));
      console.log(error);
    }, () => {
      console.log("transaction complete call back ");
    }
  );
};

export { DatabaseInit };

