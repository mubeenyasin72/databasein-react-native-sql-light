import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import {openDatabase} from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
var db = openDatabase({name: 'user_db.db', createFromLocation: 1});
class mainFile extends Component {
  constructor(props) {
    super(props);
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
              [],
            );
          }
        },
      );
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{marginTop: 0}}>
          <Text
            style={{
              textAlign: 'center',
              backgroundColor: '#f05555',
              padding: 20,
              fontSize: 20,
              color: 'white',
            }}>
            SQL Light Example
          </Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('Register')}>
            <Text style={styles.buttonText}>Register </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('UpdateUser')}>
            <Text style={styles.buttonText}>Update </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('ViewAll')}>
            <Text style={styles.buttonText}>View All </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('DeleteUser')}>
            <Text style={styles.buttonText}>Delete </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('SearchUser')}>
            <Text style={styles.buttonText}>View </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  button: {
    flex: 1,
    backgroundColor: '#f05555',
    padding: 20,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    marginTop: -10,
    fontSize: 18,
  },
});
export default mainFile;
