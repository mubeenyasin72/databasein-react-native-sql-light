import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
var db = openDatabase({name: 'user_db.db', createFromLocation: 1});
class deleteUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_user_id: '',
    };
  }
  deleteUser = () => {
    var that = this;
    const {input_user_id} = this.state;
    db.transaction((tx) => {
      tx.executeSql(
        'DELETE FROM  table_user where user_id=?',
        [input_user_id],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Success',
              'User deleted successfully',
              [
                {
                  text: 'Ok',
                  onPress: () => that.props.navigation.navigate('MainFile'),
                },
              ],
              {cancelable: false},
            );
          } else {
            alert('Please insert a valid User Id');
          }
        },
      );
    });
  };
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            textAlign: 'center',
            backgroundColor: '#f05555',
            padding: 20,
            fontSize: 20,
            color: 'white',
          }}>
          Delete User
        </Text>
        <View
          style={{
            marginLeft: 35,
            marginRight: 35,
            marginTop: 10,
          }}>
          <TextInput
            style={{
              height: 40,
              borderColor: '#2082e5',
              borderWidth: 1,
              marginTop: 10,
            }}
            placeholder="Enter Id"
            onChangeText={(input_user_id) => this.setState({input_user_id})}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.deleteUser()}>
            <Text style={styles.buttonText}>Delete</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.props.navigation.navigate('MainFile')}>
            <Text style={styles.buttonText}>Back </Text>
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
  },
  buttonText: {
    textAlign: 'center',
    color: '#ffffff',
    marginTop: -10,
    fontSize: 18,
  },
});
export default deleteUser;
