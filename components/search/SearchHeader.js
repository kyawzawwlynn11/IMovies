import { StyleSheet, Text, View,Pressable, TouchableOpacity } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons';
import colors from '../../constants/colors';

const SearchHeader = ({pressHandler}) => {
  return (
 <View style={styles.container}>
    <View style={styles.leftSection}>
       <TouchableOpacity onPress={pressHandler} style={styles.iconView}>
       <AntDesign name="leftcircleo" size={25} color={colors.purple}/>
       </TouchableOpacity>
    </View>
    <View style={styles.middleSection}>
     <Text style={{color: colors.purple, fontSize: 18, fontWeight: 'bold',fontFamily:'Ledger'}}>Search</Text>
   </View>
   <View style={styles.rightSection}>
      
   </View>
</View>
  )
}

export default SearchHeader

const styles = StyleSheet.create({
    container:{
        width: '100%',
        flex:0.08,
        justifyContent: 'center',
        alignItems: 'center',
       // backgroundColor: '#393e46',
        flexDirection: 'row'
    },
    leftSection:{
        height: '100%',
        width: '30%',
       // backgroundColor:'blue'

        
    },
    iconView:{
      height: '100%',
      width: '50%',
      //backgroundColor: 'red',
      justifyContent: 'center',
      alignItems:'center',
      //marginLeft: 10,

    },
   
    middleSection:{
        height: '100%',
        width: '40%',
        //backgroundColor:'violet',
        alignItems: 'center',
        justifyContent: 'center'
    },
    rightSection:{
        height: '100%',
        width: '30%',
        //backgroundColor:'white'
    },
    firstView:{
      width: '80%',
      height: '40%',
      borderBottomWidth: 5,
      borderBottomColor: 'white'
    },
    secondView:{
      width: '40%',
      height: '40%',
      borderTopWidth: 5,
      borderTopColor: 'white'
    
    },
})