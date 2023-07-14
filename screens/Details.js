import { StyleSheet, Text, View,Image, Dimensions,FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import DetailsHeader from '../components/details/DetailsHeader'
import colors from '../constants/colors'
import { ActivityIndicator } from 'react-native-paper'
import { AntDesign } from '@expo/vector-icons';

import Card from '../components/reusable/Card'


const {width,height} = Dimensions.get('window')
const Details = ({route,navigation}) => {
  const imgurl = 'http://image.tmdb.org/t/p/w200'
  const {data} = route.params;
  const [details,setDetails] = useState([])
  const [loading, setLoading] = useState(true)
const [state, setState] = useState(null)
const [recommendedList, setRecommendedList] = useState([])


useEffect(() => {
 // console.log('first_air_date' in data)
  console.log(data.id)
   getState()
  // console.log(state)
   console.log(recommendedList)
   if(state === 'movies') {
    console.log('fetching movies details')
    
    fetchMovieDetails()
    fetchRecommendedMovies()
        
   } else if(state ==='series'){
    console.log('fetching series details')
   
    fetchSeriesDetails()
    fetchRecommendedSeries()
   }

  // console.log(data)
   
   //console.log(similarMovies)
},[state,data])


//function for fetching details
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

  const fetchSeriesDetails = () => {
    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWE4ZmI0ZmJkYTNmOGJjMGMxZDY0MDc2NGM1NWUxOCIsInN1YiI6IjY0YWFlMmU4ZDFhODkzMDBhZGJmOGVmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kD2k9V25v-NY798zk_nw4ECEclRYTRQaJM13uPbGXPM'
      }
    };
    
    fetch(`https://api.themoviedb.org/3/tv/${data.id}?language=en-US`, options)
      .then(response => response.json())
      .then(response => {
        setDetails(response)
        setLoading(false)    
        //console.log(details)
      })
      .catch(err => console.error(err));
  }

  //function for state
const getState = () => {
  if('first_air_date' in data){
    setState('series')
    console.log(state)
  }else{
    setState('movies')
  }
}

//functions for recommended fetching
const fetchRecommendedMovies = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWE4ZmI0ZmJkYTNmOGJjMGMxZDY0MDc2NGM1NWUxOCIsInN1YiI6IjY0YWFlMmU4ZDFhODkzMDBhZGJmOGVmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kD2k9V25v-NY798zk_nw4ECEclRYTRQaJM13uPbGXPM'
    }
  };
  
  const tv_url = `https://api.themoviedb.org/3/tv/${data.id}/recommendations?language=en-US&page=1`
  const movie_url = `https://api.themoviedb.org/3/movie/${data.id}/recommendations?language=en-US&page=1`
  fetch( movie_url, options)
    .then(response => response.json())
    .then(response => setRecommendedList(response.results))
    .catch(err => console.error(err));
}

const fetchRecommendedSeries = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWE4ZmI0ZmJkYTNmOGJjMGMxZDY0MDc2NGM1NWUxOCIsInN1YiI6IjY0YWFlMmU4ZDFhODkzMDBhZGJmOGVmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kD2k9V25v-NY798zk_nw4ECEclRYTRQaJM13uPbGXPM'
    }
  };
  
  const tv_url = `https://api.themoviedb.org/3/tv/${data.id}/recommendations?language=en-US&page=1`

  fetch(tv_url, options)
    .then(response => response.json())
    .then(response => setRecommendedList(response.results))
    .catch(err => console.error(err));
}

console.log(data.id, data.original_title, data.name, data.id)
  const goBackHandler = () => {
    navigation.goBack()
    
  }
  const cardPresshandler = (data) => {
    navigation.navigate('Details', {data: data})
 }

  if(!loading) {
    return(
      <View style={styles.container}>
         <DetailsHeader pressHandler={goBackHandler}/>
         <View style={styles.firstSection}>
             <View style={styles.details}>
                  <View style={styles.imageView}>
                     <Image 
                       source={{uri: imgurl + data.backdrop_path}}
                       style={{
                        width:'100%',
                        height:'80%',
                        borderRadius: 10,
                       }}
                     />
                  </View>
                  <View style={styles.detailsView}>
                       <Text style={{color:colors.purple, fontSize: height*0.025}}>
                          {state === 'movies' ? data.original_title || details.original_title : data.original_name || details.original_name} - { state === 'movies' ? data.release_date.slice(0,4)|| details.release_date.slice(0,4) : data.first_air_date.slice(0,4) ||details.first_air_date.slice(0,4)}  
                       </Text>
                       {
                        state === 'movies' ? 
                        <Text style={{color:colors.purple,fontSize: height*0.018}}>Duration - {Math.floor(details.runtime/60)}h {details.runtime % 60}mins</Text>
                        :
                        <Text style={{color:colors.purple,fontSize: height*0.018}}>{data.number_of_seasons || details.number_of_seasons} Season / {data.number_of_episodes || details.number_of_episodes} Episodes</Text>
                       }
                       <Text style={{color:colors.purple,fontSize: height*0.018}}>Rating - {(data.vote_average).toFixed(1) || (details.vote_average).toFixed(1)}</Text>
                       <View style={{flexDirection:'row', gap:10, flexWrap:'wrap', marginTop: 10,}}>

                       {details.genres.map(item => {
                         return (
                          <View key={item.id} style={{width:width*0.2, height:height*0.03,borderWidth:1, borderRadius:5, borderColor:colors.purple}}>
                            <Text style={{color:colors.purple, width:'100%', height:'100%', fontSize:item.name.length > 5 ? height*0.011:height*0.015, textAlign:'center', textAlignVertical: 'center'}}>{item.name}</Text>
                          </View>
                         )
                       })}

                       </View>
                  </View>
             </View>

             <View style={styles.overview}>
               <View style={styles.titleView}>
                   <Text style={{color: colors.purple, fontWeight: 'bold', fontSize:15, fontSize:height*0.022}}>Overview</Text>
               </View>
               <View style={styles.descView}>
                <Text style={{color:colors.purple, fontSize: data.overview.length > 420 || (details.overview.length > 420) ?height*0.015 : height*0.019 }}>{data.overview || details.overview || 'No overview available'}</Text>
               </View>
             </View>
         </View>
         <View style={styles.secondSection}>
             <View style={styles.recommendedtitle}>
                <Text style={{color: colors.purple, fontWeight: 'bold', fontSize:15}}>
                  Recommended for you
                </Text>
             </View>
           <View style={styles.similarContents}>
                 
               <FlatList 
               data={recommendedList}
               showsVerticalScrollIndicator={false}
               showsHorizontalScrollIndicator={false}
               
               onEndReachedThreshold={5}
              
               renderItem={({item}) => {
                return (
                  <TouchableOpacity style={[{width: width*0.35,backgroundColor:colors.secondary, height: height*0.2, marginHorizontal: width*0.01}]} onPress={()=> cardPresshandler(item)}>
                
                  <Image 
                  source={{uri: imgurl + item.poster_path}}
                  style={{
                    width:'90%',
                    height:'100%',
                    resizeMode:'cover',
                    alignSelf:'center'
                  }}
                  />
          
                  <View style={{width:'100%', height:'20%', justifyContent:'space-evenly', backgroundColor:colors.secondary,paddingLeft: 10}}>
                    
                      
                    <View style={{flexDirection:'row', gap: 5}}>
                    <AntDesign name="staro" size={14} color={colors.purple} />
                    <Text style={{color: colors.purple,fontSize:height*0.019}} >{item.vote_average.toFixed(1)}</Text>
                    </View>
              </View>
             
             
            </TouchableOpacity>
                )
               
              }}
              horizontal
               />
                  
                  
             </View>
             
             
         </View>
       
         
      </View>
    )
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
        backgroundColor:colors.primary,
    },
    firstSection:{
      flex:0.56,
      //backgroundColor:'orange',
      width: width-30,
      alignSelf:'center'
    },
    details:{
        flex:0.5,
        //backgroundColor:'green',
        flexDirection:'row',
    },

    imageView:{
       flex:0.4,
       //backgroundColor:'violet',
       justifyContent:'center',
    },

    detailsView: {
      flex: 0.65,
      //backgroundColor:'gray',
      height:'90%',
      alignSelf:'center',
      padding:10,
      gap:height*0.015
    },
    overview:{
        flex:0.5,
         //backgroundColor:'orange',
         gap:height*0.01
    },
   
    titleView:{
      // width: '100%',
     // alignSelf:'center',
      //flex:0.2,
     // backgroundColor:'white',
      justifyContent:'center',
    
    },

    descView:{
      width:'100%',
      //flex:0.8,
      //backgroundColor:'red',
      alignSelf:'center',
    },
    secondSection:{
     // backgroundColor:'red',
      flex:0.36,
      width: width -40,
      alignSelf:'center',
      
    },
    recommendedtitle:{
         // backgroundColor:'gray',
          flex:0.2,
          justifyContent:'center',
          //width:'95%'
    },
    similarContents:{
      flex:0.8,
    // backgroundColor:'blue',
    }
  


})