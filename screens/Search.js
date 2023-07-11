import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import colors from '../constants/colors'
import SearchHeader from '../components/search/SearchHeader'
import Button from '../components/reusable/Button'
import { Dimensions } from 'react-native'
const {width, height} = Dimensions.get('window')
import { AntDesign } from '@expo/vector-icons';
import { FlatList } from 'react-native-gesture-handler'
import Card from '../components/reusable/Card'
import { ActivityIndicator } from 'react-native-paper'

const Search = ({navigation}) => {

  const [text,setText] = useState(null)
  const [searchData, setSearchData] = useState([])
  const [loading, setLoading] = useState(true)

  const goBackHandler = () => {
    navigation.goBack()
    console.log('GoBack')
    }

    const fetchData = () => {
      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYWE4ZmI0ZmJkYTNmOGJjMGMxZDY0MDc2NGM1NWUxOCIsInN1YiI6IjY0YWFlMmU4ZDFhODkzMDBhZGJmOGVmNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kD2k9V25v-NY798zk_nw4ECEclRYTRQaJM13uPbGXPM'
        }
      };
      
      fetch(`https://api.themoviedb.org/3/search/multi?query=breaking%20bad&include_adult=false&language=en-US&page=1`, options)
        .then(response => response.json())
        .then(response => {
          
          setSearchData(response.results)
          console.log(searchData)
          setLoading(false)
        })
        .catch(err => console.error(err));
    }

    const cardPresshandler = (data) => {
      navigation.navigate('Details', {data: data})
   }
  return (
    <View style={styles.container}>
     <SearchHeader pressHandler={goBackHandler}/>
     <View style={styles.firstSection}>
      <View style={styles.searchBarView}>

       <TextInput onChangeText={(e) => setText(e)} placeholder='Search' style={styles.Searchbar} />
      <Button pressHandler={fetchData} width={'15%'} height={'70%'} backgroundColor={colors.secondary} borderRadius={10}  icon={<AntDesign name="search1" size={25} color="white" />}/>
      </View>
     </View>

     <View style={styles.secondSection}>
        <View style={styles.labelView}>
          <Text style={{color:'white', fontSize: 18, fontWeight:'bold'}}>Results</Text>
        </View>

        <View style={styles.resultsView}>
          {
            loading ? 
            <View style={{flex:1, backgroundColor:colors.primary}}>
               <ActivityIndicator />
            </View>
            : 
            <FlatList 
            data={searchData}
            renderItem={({item}) => {
              return <Card  item ={item} uri={ 'http://image.tmdb.org/t/p/w300'} pressHandler={cardPresshandler}/>
            }}
            />
          }
        </View>
     </View>
    </View>
  )
}

export default Search

const styles = StyleSheet.create({
  container: {
    flex:1,
    backgroundColor: colors.primary
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
    flexDirection:'row',
    justifyContent:'space-between'

  },
  Searchbar:{
    backgroundColor:'white',
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