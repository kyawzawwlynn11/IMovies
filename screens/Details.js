import { StyleSheet, Text, View,Image, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import DetailsHeader from '../components/details/DetailsHeader'
import colors from '../constants/colors'
import { ActivityIndicator } from 'react-native-paper'

const {width,height} = Dimensions.get('window')
const Details = ({route,navigation}) => {
  const imgurl = 'http://image.tmdb.org/t/p/w500'
  const {data} = route.params;
  const [details,setDetails] = useState([])
  const [loading, setLoading] = useState(true)


useEffect(() => {
   fetchMovieDetails()
},[])

  const fetchMovieDetails = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWE4ZmI0ZmJkYTNmOGJjMGMxZDY0MDc2NGM1NWUxOCIsInN1YiI6IjY0YWFlMmU4ZDFhODkzMDBhZGJmOGVmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kD2k9V25v-NY798zk_nw4ECEclRYTRQaJM13uPbGXPM'
      }
    };
    
    fetch(`https://api.themoviedb.org/3/movie/${data.id}?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        console.log('data fetched')
        setDetails(response)
        setLoading(false)
      })
      .catch(err => console.error(err));
  }


console.log(data.id, data.original_title, data.name, data.id)
  const goBackHandler = () => {
    navigation.goBack()
  }
  return (
     <View style={{flex:1, backgroundColor:colors.primary, justifyContent:'center', alignItems:'center'}}>
        <ActivityIndicator color={colors.purple} />
     </View>
  )
}

export default Details

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.primary
    },
    firstSection:{
      flex:0.5,
      backgroundColor:'orange'
    },
    secondSection:{
      backgroundColor:colors.primary,
      flex:0.42,
      width: width -50,
      alignSelf:'center',
      
    },
    titleView:{
      flex:0.2,
      //backgroundColor:'red'
      justifyContent:'center'
    }
  ,
  statsView:{
    flex:0.2,
    flexDirection:'row',
    gap:20,
    flexWrap:'wrap'
  },
  textView:{
    width:70, 
    height:30, 
    backgroundColor:colors.secondary,
    justifyContent:'center',
    alignItems:'center',
    borderRadius:10,
    borderWidth:1,
    borderColor:colors.purple,
    
  }

})