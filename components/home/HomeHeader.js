import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';


const HomeHeader = ({pressHandler}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftView}>

      </View>
      <View style={styles.middleView}>
              <Text style={{color:'white'}}>iMovies</Text>
        </View>
        <View style={styles.rightView}>
            <TouchableOpacity onPress={pressHandler} style={{width:30, height:30, borderRadius:50, backgroundColor:'black', justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:'grey'}}>
            <AntDesign name="search1" size={15} color="white" />
            </TouchableOpacity>
        </View>
    </View>
  )
}

export default HomeHeader

const styles = StyleSheet.create({
    container:{
        flex:0.08,
    flexDirection:'row',
     justifyContent:'space-around'
    },
    leftView:{
        width: '33%',
        height: '100%',
        
    },
    rightView:{
        width:'33%' ,
        height: '100%',
        //backgroundColor:'blue',
        justifyContent:'center',
        alignItems:'flex-end'
    },
    middleView:{
        width: '33%',
        height: '100%',
        justifyContent:'center',
        alignItems:'center'
        
        //backgroundColor:'green'
    }
})