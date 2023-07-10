import { StatusBar } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-vector-icons/Ionicons';

import { FontAwesome } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';

import Home from './screens/Home';
import Search from './screens/Search';
import colors from './constants/colors';
import HomeStacks from './screens/HomeStacks';
import SearchStacks from './screens/SearchStacks';
const Tab = createBottomTabNavigator()


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator screenOptions={({route}) => ({
        tabBarActiveTintColor:colors.purple,
        tabBarActiveBackgroundColor: colors.primary,
        tabBarStyle:{
          borderTopWidth:0
        },
       
        tabBarShowLabel: false,
        tabBarInactiveBackgroundColor: colors.secondary,
        headerShown: false,
        tabBarIcon: ({color, size, focused}) => {
          if(route.name === 'HomeStacks'){
            return <Entypo name="home" size={24} color={color} />
          } else if(route.name ==='SearchStacks'){
            return <FontAwesome name="search" size={24} color={color} />
          }
        },
      })}>
        <Tab.Screen name="HomeStacks" component={HomeStacks} />
        <Tab.Screen name="SearchStacks" component={SearchStacks} />
     
      </Tab.Navigator>

      <StatusBar />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
