import React, { useEffect } from 'react';
import { View, SafeAreaView } from 'react-native';
import Mybutton from './components/Mybutton';
import MyImageButton from './components/MyImageButton';
import Mytext from './components/Mytext';
import { DatabaseConnection } from '../database/database-connection';

const db = DatabaseConnection.getConnection();

const HomeScreen = ({ navigation }) => {
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='table_user'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS table_user', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS table_user(user_id INTEGER PRIMARY KEY AUTOINCREMENT, user_name VARCHAR(20), user_contact INT(10), user_address VARCHAR(255))',
              []
            );
          }
        }
      );
    });
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={{ flex: 1, backgroundColor: 'white' }}>
        <View style={{ flex: 1 }}>
          <View style={{ flex: 1 }}>
            <Mytext text="Funcionalidades" />

            <MyImageButton
              title="Registrar Usuário"
              btnIcon="user-plus"
              customClick={() => navigation.navigate('Register')}
            />

            <MyImageButton
              title="Atualizar Usuário"
              btnIcon="user-circle"
              customClick={() => navigation.navigate('Update')}
            />

            <MyImageButton
              title="Visualizar Usuário"
              btnIcon="user"
              customClick={() => navigation.navigate('View')}
            />
            <MyImageButton
              title="Visualizar Todos"
              btnIcon="users"
              customClick={() => navigation.navigate('ViewAll')}
            />
            <MyImageButton
              title="Excluir Usuário"
              btnIcon="user-times"
              customClick={() => navigation.navigate('Delete')}
            />
          </View>
        </View>


      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;