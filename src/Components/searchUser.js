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
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
//Connction to access the pre-populated user_db.db
var db = openDatabase({name: 'user_db.db', createFromLocation: 1});
class searchUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      input_user_id: '',
      userData: '',
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
            this.setState({
              userData: results.rows.item(0),
            });
          } else {
            alert('No user found');
            this.setState({
              userData: '',
            });
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
          Search User
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
        </View>
        <View style={{marginLeft: 35, marginRight: 35, marginTop: 60}}>
          <Text>User Id: {this.state.userData.user_id}</Text>
          <Text>User Name: {this.state.userData.user_name}</Text>
          <Text>User Contact: {this.state.userData.user_contact}</Text>
          <Text>User Address: {this.state.userData.user_address}</Text>
        </View>
        <View
          style={{
            marginLeft: 35,
            marginRight: 35,
            marginTop: 70,
          }}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.searchUser()}>
            <Text style={styles.buttonText}>Search</Text>
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
  container: {flex: 1, flexDirection: 'column'},
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
export default searchUser;
