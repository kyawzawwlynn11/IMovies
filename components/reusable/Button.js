import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';

const Button = ({navigation,width,title,backgroundColor, color, borderRadius, onPress,value,goBackHandler,height, borderWidth, borderColor,icon}) => {
  return (
  <TouchableOpacity  style={[styles.container, {width:width,backgroundColor:backgroundColor,borderRadius:borderRadius,height:height, borderWidth: borderWidth, borderColor: borderColor}]}>
    {icon}
  </TouchableOpacity>
  )
}

export default Button

const styles = StyleSheet.create({
  container:{
    justifyContent:'center',
    alignItems:'center'
  }
})