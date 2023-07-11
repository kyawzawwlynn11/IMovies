import { StyleSheet, Text, TouchableOpacity, View , Image} from 'react-native'
import React from 'react'
import { Dimensions } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
import colors from '../../constants/colors'
import { ActivityIndicator } from 'react-native-paper'


const {width, height} = Dimensions.get('window')

const SearchResults = ({data,pressHandler}) => {
  console.log(data)
  const imgurl = 'http://image.tmdb.org/t/p/w300'
  return (
    <View style={{backgroundColor:colors.secondary, width:'75%', height:height*0.5}}>
      {
        data === undefined || data.length === 0 
        ?
        <ActivityIndicator />
        :
        <FlatList 
        data={data}
        renderItem={({item}) => {
         return (
           <TouchableOpacity onPress={() => pressHandler(item)} style={{width:'90%', height:100, backgroundColor: colors.secondary, flexDirection:'row', alignItems:'center', gap: 10, alignSelf:'center'}}>
             <Image 
               style={{
                 width:50,
                 height:50
               }}
               source={{uri: imgurl + item.backdrop_path || imgurl + item.poster_path}}
             />
             <Text style={{color:colors.purple}}>{item.name || item.title || item.original_title}</Text>
           </TouchableOpacity>
         )
        }}
        />
      }
    </View>
  )
}

export default SearchResults

const styles = StyleSheet.create({})