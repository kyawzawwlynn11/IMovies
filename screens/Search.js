import { StyleSheet, Text, TextInput, View, TouchableOpacity,Image, KeyboardAvoidingView, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import colors from '../constants/colors'
import SearchHeader from '../components/search/SearchHeader'
import Button from '../components/reusable/Button'
import { Dimensions } from 'react-native'

import { AntDesign } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler'
import Card from '../components/reusable/Card'
import { ActivityIndicator } from 'react-native-paper'
import SearchResults from '../components/search/SearchResults'


const {width, height} = Dimensions.get('window')

const Search = ({navigation}) => {

  const [text,setText] = useState(null)
  const [searchData, setSearchData] = useState([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [callApi, setCallApi] = useState(0)
  const [focus, setFocus] = useState(false)

 const imgurl = 'http://image.tmdb.org/t/p/w300'
  const goBackHandler = () => {
    navigation.goBack()
    console.log('GoBack')
    }

    const temp= (
      <View style={styles.secondSection}>
      <View style={styles.labelView}>
        <Text style={{color:colors.purple, fontSize: 18, fontWeight:'bold'}}>Search Results</Text>
      </View>

      <View style={styles.resultsView}>
          {
            searchData !== undefined || searchData.length !== 0  
            ?
             
          <FlatList 
          data={searchData}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          ListFooterComponent={loader}
          onEndReachedThreshold={0}
          contentContainerStyle={{
          flexDirection:'row',
          flexWrap:'wrap',
          justifyContent:'space-around'
          }}

          onEndReached={() => {
            setPage(prevPage => prevPage+1)
          }}
          renderItem={({item}) => {
          return (
            <TouchableOpacity style={[{width: width*0.4,backgroundColor:colors.secondary, height: height*0.3,  marginBottom: height*0.1}]} onPress={()=> cardPresshandler(item)}>
            
                     <Image 
                        source={{uri: imgurl + item.poster_path}}
                        style={{
                          width:'100%',
                          height:'100%',
                          resizeMode:'cover'
                        }}
                      />

              <View style={{width:'100%', height:'20%', justifyContent:'space-evenly', backgroundColor:colors.secondary,paddingLeft: 10,}}>
                <Text style={{color:colors.purple, fontSize:14,}}>{item.title || item.name}</Text>
                  
                <View style={{flexDirection:'row', gap: 5}}>
                <AntDesign name="staro" size={14} color={colors.purple} />
                <Text style={{color: colors.purple,fontSize:height*0.019}} >{item.vote_average.toFixed(1)}</Text>
                </View>
              </View>


          </TouchableOpacity>
            
          )
          }}
            
            keyExtractor={item => item.id}
            />
                 :
                 null
          }
         
         
          

          
          
      </View>
   </View>
    )

  
   
    const fetchData = (formattedString) => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWE4ZmI0ZmJkYTNmOGJjMGMxZDY0MDc2NGM1NWUxOCIsInN1YiI6IjY0YWFlMmU4ZDFhODkzMDBhZGJmOGVmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kD2k9V25v-NY798zk_nw4ECEclRYTRQaJM13uPbGXPM'
        }
      };
      
      fetch(`https://api.themoviedb.org/3/search/multi?query=${formattedString}&include_adult=false&language=en-US&page=${page}`, options)
        .then(response => response.json())
        .then(response => {
          
          setSearchData(response.results)
          //console.log(searchData)
          setLoading(false)
        })
        .catch(err => console.error(err));
    }

    const cardPresshandler = (data) => {
      setFocus(false)
      navigation.navigate('Details', {data: data})
   }

   const searchButtonHandler = () => {
      setFocus(false)
   }

   const loader = () => {
    return(
      <View style={styles.loader}>
        <ActivityIndicator size='large' color={colors.purple}/>
      </View>
    )
  }
  return (
    <View style={styles.container}>
     <SearchHeader pressHandler={goBackHandler}/>
     <View style={styles.firstSection}>
      <View style={styles.searchBarView}>
      <View style={{flexDirection:'row', width:'100%', height:'100%', justifyContent:'space-between', alignItems:'flex-end', }}>
       <TextInput  onFocus={() => setFocus(true)} onChangeText={(e) => fetchData(e.replace(/ /g,"%20"))} placeholder='Search' style={[styles.Searchbar, focus && {borderRadius:0}]} />
      <Button pressHandler={() => searchButtonHandler()} width={'15%'} height={'70%'} backgroundColor={colors.secondary} borderRadius={10}  icon={<AntDesign name="search1" size={25} color={colors.purple} />}/>
      </View>
      {focus && <SearchResults data={searchData} pressHandler={cardPresshandler}/> }
        

      </View>
      
     </View>

     {!focus && temp}

     
    

    
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.primary,
    minHeight: Math.round(height)
  },
  firstSection:{
    flex:0.1,
    //backgroundColor:'orange',
    width: width-30,
    alignSelf:'center',
    marginVertical:10
  },
  searchBarView:{
    flex:1,
    //backgroundColor:'green',
    
    justifyContent:'space-between'

  },
  Searchbar:{
   
    backgroundColor:'#faf9f6',
    borderRadius:10,
    width:'75%',
    height:'70%',
    padding:10,
  },
  secondSection:{
    flex:0.8,
   // backgroundColor:'red'
  },
  labelView:{
    flex: 0.1,
    //backgroundColor:'green',
    width: width-30,
    alignSelf:'center',
    justifyContent:'center',
  },
  resultsView:{
    flex:0.9,
    width: width-20,
    // backgroundColor:'orange',
     alignSelf:'center',
     
  }
})