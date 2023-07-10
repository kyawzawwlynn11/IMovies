import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import colors from '../constants/colors'
import SearchHeader from '../components/search/SearchHeader'
import Button from '../components/reusable/Button'
import { Dimensions } from 'react-native'
const {width, height} = Dimensions.get('window')
import { AntDesign } from '@expo/vector-icons';

const Search = ({navigation}) => {

  const goBackHandler = () => {
    navigation.goBack()
    console.log('GoBack')
    }
  return (
    <View style={styles.container}>
     <SearchHeader pressHandler={goBackHandler}/>
     <View style={styles.firstSection}>
      <View style={styles.searchBarView}>

       <TextInput placeholder='Search' style={styles.Searchbar} />
      <Button width={'15%'} height={'70%'} backgroundColor={colors.secondary} borderRadius={10}  icon={<AntDesign name="search1" size={25} color="white" />}/>
      </View>
     </View>

     <View style={styles.secondSection}>
        <View style={styles.labelView}>
          <Text style={{color:'white', fontSize: 18, fontWeight:'bold'}}>Results</Text>
        </View>

        <View style={styles.resultsView}>

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