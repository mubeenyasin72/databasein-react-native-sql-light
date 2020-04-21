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
class register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user_name: '',
      user_contact: '',
      user_address: '',
    };
  }
  register_user = () => {
    var that = this;
    const {user_name} = this.state;
    const {user_contact} = this.state;
    const {user_address} = this.state;
    //alert(user_name, user_contact, user_address);
    if (user_name) {
      if (user_contact) {
        if (user_address) {
          db.transaction(function (tx) {
            tx.executeSql(
              'INSERT INTO table_user (user_name, user_contact, user_address) VALUES (?,?,?)',
              [user_name, user_contact, user_address],
              (tx, results) => {
                console.log('Results', results.rowsAffected);
                if (results.rowsAffected > 0) {
                  Alert.alert(
                    'Success',
                    'You are Registered Successfully',
                    [
                      {
                        text: 'Ok',
                        onPress: () =>
                          that.props.navigation.navigate('MainFile'),
                      },
                    ],
                    {cancelable: false},
                  );
                } else {
                  alert('Registration Failed');
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
          Register Your Self
        </Text>
        <View
          style={{
            marginLeft: 35,
            marginRight: 35,
            marginTop: 10,
          }}>
          <TextInput
            style={{height: 40, borderColor: 'blue', borderWidth: 1}}
            placeholder="Enter UserName"
            onChangeText={(user_name) => this.setState({user_name})}
          />
          <TextInput
            style={{
              height: 40,
              borderColor: 'blue',
              borderWidth: 1,
              marginTop: 10,
            }}
            placeholder="Enter Contact number"
            onChangeText={(user_contact) => this.setState({user_contact})}
            maxLength={11}
            keyboardType="numeric"
          />
          <TextInput
            style={{
              height: 40,
              borderColor: 'blue',
              borderWidth: 1,
              marginTop: 10,
            }}
            placeholder="Enter Address"
            onChangeText={(user_address) => this.setState({user_address})}
          />
          <TouchableOpacity
            style={styles.button}
            // customClick={this.register_user.bind(this)}
            onPress={() => this.register_user()}>
            <Text style={styles.buttonText}>Submit </Text>
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
export default register;
