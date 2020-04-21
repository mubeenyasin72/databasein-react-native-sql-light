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
class updateUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_user_id: '',
      user_name: '',
      user_contact: '',
      user_address: '',
    };
  }
  searchUser = () => {
    const {input_user_id} = this.state;
    console.log(this.state.input_user_id);
    db.transaction((tx) => {
      tx.executeSql(
        'SELECT * FROM table_user where user_id = ?',
        [input_user_id],
        (tx, results) => {
          var len = results.rows.length;
          console.log('len', len);
          if (len > 0) {
            console.log(results.rows.item(0).user_contact);
            this.setState({
              user_name: results.rows.item(0).user_name,
            });
            this.setState({
              user_contact: results.rows.item(0).user_contact,
            });
            this.setState({
              user_address: results.rows.item(0).user_address,
            });
          } else {
            alert('No user found');
            this.setState({
              user_name: '',
              user_contact: '',
              user_address: '',
            });
          }
        },
      );
    });
  };
  updateUser = () => {
    var that = this;
    const {input_user_id} = this.state;
    const {user_name} = this.state;
    const {user_contact} = this.state;
    const {user_address} = this.state;
    if (user_name) {
      if (user_contact) {
        if (user_address) {
          db.transaction((tx) => {
            tx.executeSql(
              'UPDATE table_user set user_name=?, user_contact=? , user_address=? where user_id=?',
              [user_name, user_contact, user_address, input_user_id],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'User updated successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                          that.props.navigation.navigate('HomeScreen'),
                      },
                    ],
                    {cancelable: false},
                  );
                } else {
                  alert('Updation Failed');
                }
              },
            );
          });
        } else {
          alert('Please fill Address');
        }
      } else {
        alert('Please fill Contact Number');
      }
    } else {
      alert('Please fill Name');
    }
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
          Update User
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
            onPress={() => this.searchUser()}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginLeft: 35,
            marginRight: 35,
            marginTop: 150,
          }}>
          <TextInput
            style={{height: 40, borderColor: '#2082e5', borderWidth: 1}}
            placeholder="Enter UserName"
            onChangeText={(user_name) => this.setState({user_name})}
            value={this.state.user_name}
          />
          <TextInput
            style={{
              height: 40,
              borderColor: '#2082e5',
              borderWidth: 1,
              marginTop: 10,
            }}
            placeholder="Enter Contact number"
            value={'' + this.state.user_contact}
            onChangeText={(user_contact) => this.setState({user_contact})}
          />
          <TextInput
            style={{
              height: 40,
              borderColor: '#2082e5',
              borderWidth: 1,
              marginTop: 10,
            }}
            value={this.state.user_address}
            placeholder="Enter Address"
            onChangeText={(user_address) => this.setState({user_address})}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.updateUser()}>
            <Text style={styles.buttonText}>Update </Text>
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
export default updateUser;
