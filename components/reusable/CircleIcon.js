import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const CircleIcon = () => {
  return (
    <View style={{width:40, height:40, borderRadius:'100%', backgroundColor:'black', justifyContent:'center', alignItems:'center'}}>
        <AntDesign name="search1" size={20} color="white" />
    </View>
  )
}

export default CircleIcon

const styles = StyleSheet.create({})