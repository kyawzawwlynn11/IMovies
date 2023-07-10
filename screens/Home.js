import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import HomeHeader from '../components/home/HomeHeader'
import colors from '../constants/colors'
import { Dimensions } from 'react-native'
import { AntDesign } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper'
import Card from '../components/reusable/Card'



const {width, height} = Dimensions.get('window')



const Home = ({navigation}) => {

  const imgurl = 'http://image.tmdb.org/t/p/w300'

  const [movieData, setMovieData] = useState([])
  const [seriesData, setSeriesData] = useState([])
  const [state, setState] = useState('movies')
  const [moviesPage,setMoviePage] = useState(1)
  const [seriesPage, setSeriesPage] = useState(1)


 
  contents = [
    {id: 1, name: 'Trending Movies'},
    {id: 2, name: 'Trending TV shows'},
    {id: 3, name: 'Trending'},
    {id: 4, name: 'Trending'},
  ]
  useEffect(()=> {
    fetchMoviesData()
  },[moviesPage,state])

  useEffect(()=> {
    fetchSeriesData()
  },[seriesPage,state])

  //functions for data fetching
  const fetchMoviesData = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWE4ZmI0ZmJkYTNmOGJjMGMxZDY0MDc2NGM1NWUxOCIsInN1YiI6IjY0YWFlMmU4ZDFhODkzMDBhZGJmOGVmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kD2k9V25v-NY798zk_nw4ECEclRYTRQaJM13uPbGXPM'
      }
    };

    let url = `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${moviesPage}&sort_by=popularity.desc`
    
    
    fetch(url, options)
      .then(response => response.json())
      .then(response => {
     //  console.log(response)
       setMovieData([...movieData, ...response.results])
        
        //console.log(movieData)
      })
      .catch(err => console.error(err));
  }



  const fetchSeriesData = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWE4ZmI0ZmJkYTNmOGJjMGMxZDY0MDc2NGM1NWUxOCIsInN1YiI6IjY0YWFlMmU4ZDFhODkzMDBhZGJmOGVmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kD2k9V25v-NY798zk_nw4ECEclRYTRQaJM13uPbGXPM'
      }
    };

   
    let url = `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${seriesPage}&sort_by=popularity.desc`
    
    fetch(url, options)
      .then(response => response.json())
      .then(response => {
     // console.log(response)
       setSeriesData(prevData => response.results)
        
       // console.log(seriesData)
      })
      .catch(err => console.error(err));
  }


  //pressHandlers

  const searchPressHandler = () => {
    navigation.navigate('Search')
  }

  const cardPresshandler = (data) => {
     navigation.navigate('Details', {data: data})
  }

  //Loader function

  const loader = () => {
    return(
      <View style={styles.loader}>
        <ActivityIndicator size='large' color={colors.purple}/>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <HomeHeader pressHandler={searchPressHandler}/>
      <View style={styles.firstSection}>
      <View style={styles.switchAndTitle}>
        <View style={styles.switch}>
          <TouchableOpacity onPress={()=>setState('movies')} style={[styles.selected,state==='movies' && {backgroundColor:colors.purple}]}>
            <Text style={[{color:colors.purple, width:'100%', textAlign:'center'}, state === 'movies' && {color:colors.secondary}]}>Movies</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>setState('series')} style={[styles.selected,state==='series' && {backgroundColor:colors.purple}]}>
            <Text style={[{color:colors.purple, width:'100%', textAlign:'center'}, state === 'series' && {color:colors.secondary}]}>Series</Text>
          </TouchableOpacity>

        </View>


        <View style={{flex:0.8, justifyContent:'center', width: '90%', alignSelf:'center'}}>
          <Text style={{color:colors.purple, fontSize:20, fontWeight:'bold'}}>Trending { state === 'movies' ? 'Movies' : 'Series'}</Text>
        </View>

      </View>

      <View style={styles.contents}>
           <FlatList 
           data={state==='movies' ? movieData : seriesData}
            ListFooterComponent={loader}
            onEndReachedThreshold={0}
           contentContainerStyle={{
            flexDirection:'row',
            flexWrap:'wrap',
            justifyContent:'space-around'
           }}
           
           onEndReached={() => {
              if(state === 'movies'){
                setMoviePage(prevMoviePage => prevMoviePage+1)
              } else if(state === 'series') {
                setSeriesPage(prevSeriesPage => prevSeriesPage+1)
              }
           }}
           renderItem={({item}) => {
            return (
              <Card item={item} uri={imgurl} state={state} pressHandler={cardPresshandler}/>
             
            )
           }}

           keyExtractor={item => item.id}
           />

           
      </View>
          
         
      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.primary,
    
    
  },
  firstSection:{
    flex: 1,
    padding: 10,
    
 
  },
  switch:{
    //backgroundColor:'red',
    width: 200,
    flex: 0.2,alignSelf:'center',
    flexDirection:'row',
    
    overflow:'hidden',
    borderWidth:1,
    borderColor: colors.purple,
    borderRadius:10
  },
  switchAndTitle:{
      flex:0.2,
    //backgroundColor:'red'  
  },
  contents:{
    flex:0.8,
    //backgroundColor:'red',
    flexWrap:'wrap', 

    
    
  },
  selected:{
    //backgroundColor:'grey',
    width:'50%',
    height:'100%',
    justifyContent:'center',
    alignItems:'center'
  },
  loader:{
    marginVertical:15,
    alignItems:'center'
  }
})