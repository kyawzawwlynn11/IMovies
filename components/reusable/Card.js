import { StyleSheet, Text, View,Image, TouchableOpacity } from 'react-native'
import React from 'react'
import colors from '../../constants/colors'
import { AntDesign } from '@expo/vector-icons';

export default function Card({item,uri,state, pressHandler}) {
  return (
    <TouchableOpacity style={{width: 150, height: 250, backgroundColor:'green', marginVertical:35}} onPress={()=> pressHandler(item)}>
                
        <Image 
        source={{uri: uri + item.poster_path}}
        style={{
          width:'100%',
          height:'100%'
        }}
        />

        <View style={{width:'100%', height:'20%', justifyContent:'space-evenly', backgroundColor:colors.secondary,paddingLeft: 10}}>
          <Text style={{color:colors.purple, fontSize:14,}}>{state === 'movies' ? item.original_title.length >= 15 ? item.original_title.slice(0,10)+'...': item.original_title  : item.name.length >= 20? item.name.slice(0,10)+'...' : item.name} ({ state === 'movies' ? item.release_date.slice(0,4) : item.first_air_date.slice(0,4)})</Text>
            
          <View style={{flexDirection:'row', gap: 5}}>
          <AntDesign name="staro" size={14} color={colors.purple} />
          <Text style={{color: colors.purple,fontSize:11}} >{item.vote_average}</Text>
          </View>
    </View>
   
   
  </TouchableOpacity>
  )
}

const styles = StyleSheet.create({})