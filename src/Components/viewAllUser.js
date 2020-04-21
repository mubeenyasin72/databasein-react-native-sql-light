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
  FlatList,
} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
var db = openDatabase({name: 'user_db.db', createFromLocation: 1});
class viewAllUser extends Component {
  constructor(props) {
    super(props);
    this.state = {
      FlatListItems: [],
    };
    db.transaction((tx) => {
      tx.executeSql('SELECT * FROM table_user', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        this.setState({
          FlatListItems: temp,
        });
      });
    });
  }
  ListViewItemSeparator = () => {
    return (
      <View style={{height: 0.2, width: '100%', backgroundColor: '#808080'}} />
    );
  };
  render() {
    console.log(this.state.FlatListItems, 'This is The State Data');
    return (
      <View>
        <Text
          style={{
            textAlign: 'center',
            backgroundColor: '#f05555',
            padding: 20,
            fontSize: 20,
            color: 'white',
          }}>
          View All User
        </Text>
        <View>
          <FlatList
            data={this.state.FlatListItems}
            ItemSeparatorComponent={this.ListViewItemSeparator}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <View
                key={item.user_id}
                style={{backgroundColor: 'white', padding: 20}}>
                <Text>Id: {item.user_id}</Text>
                <Text>Name: {item.user_name}</Text>
                <Text>Contact: {item.user_contact}</Text>
                <Text>Address: {item.user_address}</Text>
              </View>
            )}
          />
        </View>
        <View
          style={{
            marginLeft: 35,
            marginRight: 35,
            marginTop: 10,
          }}>
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
export default viewAllUser;
