import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './Home'
import Details from './Details'

const Stack = createStackNavigator()
const HomeStacks = () => {
  return (
     <Stack.Navigator initialRouteName='Home' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Details" component={Details} />
     </Stack.Navigator>
  )
}

export default HomeStacks

const styles = StyleSheet.create({})