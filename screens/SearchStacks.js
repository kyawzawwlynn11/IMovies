import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Search from './Search'
import Details from './Details'

const Stack =  createStackNavigator()
const SearchStacks = () => {
  return (
    <Stack.Navigator initialRouteName='Search' screenOptions={{headerShown:false}}>
        <Stack.Screen name="Search" component={Search} />
        <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  )
}

export default SearchStacks

const styles = StyleSheet.create({})