import { StyleSheet, Text, View,Image, Dimensions,FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import DetailsHeader from '../components/details/DetailsHeader'
import colors from '../constants/colors'
import { ActivityIndicator } from 'react-native-paper'

import Card from '../components/reusable/Card'


const {width,height} = Dimensions.get('window')
const Details = ({route,navigation}) => {
  const imgurl = 'http://image.tmdb.org/t/p/w500'
  const {data} = route.params;
  const [details,setDetails] = useState([])
  const [loading, setLoading] = useState(true)
const [state, setState] = useState(null)
const [recommendedList, setRecommendedList] = useState([])


useEffect(() => {
  console.log('first_air_date' in data)
   getState()
   if(state === 'movies') {
    console.log('fetching movies details')
    fetchRecommended()
    fetchMovieDetails()
    
   } else if(state ==='series'){
    console.log('fetching series details')
    fetchRecommended()
    fetchSeriesDetails()
   }

  // console.log(data)
   
   //console.log(similarMovies)
},[state])


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

//function for recommended fetching
const fetchRecommended = () => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWE4ZmI0ZmJkYTNmOGJjMGMxZDY0MDc2NGM1NWUxOCIsInN1YiI6IjY0YWFlMmU4ZDFhODkzMDBhZGJmOGVmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kD2k9V25v-NY798zk_nw4ECEclRYTRQaJM13uPbGXPM'
    }
  };
  
  const tv_url = `https://api.themoviedb.org/3/tv/${data.id}/recommendations?language=en-US&page=1`
  const movie_url = `https://api.themoviedb.org/3/movie/${data.id}/recommendations?language=en-US&page=1`
  fetch(state === 'movies' ? movie_url : tv_url, options)
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
                          {state === 'movies' ? data.original_title : data.original_name} - { state === 'movies' ? details.release_date.slice(0,4) : details.first_air_date.slice(0,4)}  
                       </Text>
                       {
                        state === 'movies' ? 
                        <Text style={{color:colors.purple,fontSize: height*0.018}}>Duration - {Math.floor(details.runtime/60)}h {details.runtime % 60}mins</Text>
                        :
                        <Text style={{color:colors.purple,fontSize: height*0.018}}>{details.number_of_seasons} Season / {details.number_of_episodes} Episodes</Text>
                       }
                       <Text style={{color:colors.purple,fontSize: height*0.018}}>Rating - {(details.vote_average).toFixed(1)}</Text>
                       <View style={{flexDirection:'row', gap:10, flexWrap:'wrap', marginTop: 10,}}>

                       {details.genres.map(item => {
                         return (
                          <View style={{width:width*0.2, height:height*0.03,borderWidth:1, borderRadius:5, borderColor:colors.purple}}>
                            <Text style={{color:colors.purple, width:'100%', height:'100%', fontSize:height*0.015, textAlign:'center', textAlignVertical: 'center'}}>{item.name}</Text>
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
                <Text style={{color:colors.purple, fontSize:height*0.019}}>{data.overview || details.overview}</Text>
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
               renderItem={({item}) => {
                return(
                  <Card item={item} uri={imgurl} pressHandler={cardPresshandler}/>
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
      flex:0.6,
      //backgroundColor:'orange',
      width: width-20,
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
      flex: 0.6,
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
      width: '95%',
      alignSelf:'center',
      //flex:0.2,
     // backgroundColor:'white',
      justifyContent:'center',
    
    },

    descView:{
      width:'95%',
      //flex:0.8,
      //backgroundColor:'red',
      alignSelf:'center',
    },
    secondSection:{
     // backgroundColor:'red',
      flex:0.32,
      width: width -20,
      alignSelf:'center',
      
    },
    recommendedtitle:{
         // backgroundColor:'gray',
          flex:0.2,
          justifyContent:'center'
    },
    similarContents:{
      flex:0.8,
     // backgroundColor:'blue'
    }
  


})