import { Dimensions, Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import colors from '../../constants/colors';
const {width,height} = Dimensions.get('window')

const HomeHeader = ({pressHandler}) => {
  return (
    <View style={styles.container}>
      <View style={styles.leftView}>

      </View>
      <View style={styles.middleView}>
              <Text style={{color:colors.purple, fontSize:height*0.025, fontWeight:'bold'}}>IMovies</Text>
        </View>
        <View style={styles.rightView}>
            <TouchableOpacity onPress={pressHandler} style={{width:width*0.1, height:height*0.05, borderRadius:50, backgroundColor:colors.primary, justifyContent:'center', alignItems:'center', borderWidth:1, borderColor:colors.purple}}>
            <AntDesign name="search1" size={15} color={colors.purple} />
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
        alignItems:'flex-start',
        paddingLeft:width*0.2
    },
    middleView:{
        width: '33%',
        height: '100%',
        justifyContent:'center',
        alignItems:'center'
        
        //backgroundColor:'green'
    }
})