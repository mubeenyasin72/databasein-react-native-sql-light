import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import MainFile from '../Components/mainFile';
import ViewAll from '../Components/viewAllUser';
import DeleteUser from '../Components/deleteUser';
import UpdateUser from '../Components/updateUser';
import SearchUser from '../Components/searchUser';
import Register from '../Components/register';
const RootStack = createSwitchNavigator(
  {
    MainFile: {screen: MainFile},
    ViewAll: {screen: ViewAll},
    DeleteUser: {screen: DeleteUser},
    UpdateUser: {screen: UpdateUser},
    SearchUser: {screen: SearchUser},
    Register:{screen:Register}
  },
  {
    initialRouteName: 'MainFile',
  },
);
const AppContainer = createAppContainer(RootStack);

export default AppContainer;
