import React, { Component } from 'react';

import { Alert, LayoutAnimation ,Dimensions 
    ,ImageBackground , StyleSheet,AsyncStorage, View, Text, ScrollView, UIManager, TouchableOpacity, Platform, Image,StatusBar , FlatList } from 'react-native';


    import en from './../../strings/en.json' ;
import ur from './../../strings/ur.json' ;
import si from './../../strings/si.json' ;
import i18n from 'i18n-js';
import baseurl from '../../components/baseurl.js';

export default class newbooking extends React.Component {


    static navigationOptions ={
        header: null
    }
  constructor() {
    super();

    this.state = {
        previos_booking_arr:[]  ,
        showitem : false,
        lang:''
     }
  }

  componentWillMount(){
   
    this.getLanguage()
  
  }

  async _getStorageValue(){
    var userid = await AsyncStorage.getItem('USERID')
    console.log("userid_on_active_bookings_screen" , userid)
   

   this.get_active_bookings(userid)
   
  }

  async getLanguage(){
    i18n.fallbacks = true;
    i18n.translations = {
      en, ur ,si
    };
    
    const language = await AsyncStorage.getItem('LANG')

    this.setState({
        lang: language
    })

    if(language == null){
        this.setState({
            lang : 'en'
        })
    }
    else{
        this.setState({
            lang : language
        })
    }
    console.log("languafe" , this.state.lang)
    
    i18n.locale = this.state.lang; 

    console.log("i8ln" , i18n.locale)
    this._getStorageValue()
   }



  previous_booking_call(sid){
    const baseUrl = baseurl.uatbaseurl + "booking/newbookings?";
   const param = `userid=${sid}&language=${this.state.lang}`;
   return `${baseUrl}${param}`;

 }

 get_active_bookings = async (s_id) => {

    try{

       const url = this.previous_booking_call(s_id)
       console.log(url)

       let response = await fetch(url)
      // let response = await fetch(`https://hitsofficialpk.com/sitgo/stops/bus?stopid=${this.state.stopid}`)

       const completeresponse =  await response.json()
       console.log("response " , completeresponse)

       if(completeresponse.success == true){
           console.log("underif_previos_boooking")
           const st_array = completeresponse.bookings 

           this.setState({
            previos_booking_arr:st_array ,
            showitem:false
           })
       }
       else if(completeresponse.message == 'No bookings Found'){
         this.setState({
           showitem:true
         })
         console.log("under no bus found")
        
     }
      

    }
    catch(e){
        console.log(e)
    }
 }

 onPress = async (item)=>{

 //console.log(item)
   this.props.navigation.navigate('CARD_DETAILS', 
   {
     fromstop : item.fromstop,
     tostop : item.tostop,
     seats: item.seats,
     time: item.time,
     paymentMethod: item.paymentmethod,
     date: item.date,
     allseats: item.allseats,
     BUSID: item.bus_id ,
     STATUS: item.status ,
 
   })
 
  }


  render() {
    return (
      <View style={styles.MainContainer}>

      
<View style={styles.statusBarBackground}></View>
                <StatusBar hidden={false} />
                        <StatusBar barStyle={'dark-content'} backgroundColor ={'#000000'} translucent={true} /> 
        

                            <View style={{ flexDirection: 'row' , backgroundColor:'#ffffff',height:60 }}>
                                      <TouchableOpacity 
                                        onPress={() => this.props.navigation.goBack()}
                                        >

                                        <Image style={{marginTop:15 ,  marginLeft:25}} source={require('./../../assets/images/backbtn/back.png')}></Image>

                                        </TouchableOpacity>

                                        <View style={{flexDirection:'column' , marginLeft:20}}>
                                           
                                            <Text style={{fontSize:25 , marginTop:10 , fontWeight:'bold'}}>{i18n.t('active_booking')}</Text>
                                     
                                     
                                        </View>
                              </View>

                              <View style={{flexDirection:'row' , justifyContent:'space-between' , marginTop:10, marginLeft:25  , marginRight:20}}>

                                <Text style={styles.t1}>{i18n.t('from')}</Text>
                                <Text  style={styles.t1}>{i18n.t('to')} </Text>
                                <Text  style={styles.t1}>{i18n.t('date')}</Text>
                                <Text ></Text>
                              
                              </View>

                              {this.state.showitem && <Text style={{alignSelf:'center' , fontSize:20,marginTop:40}}>{i18n.t('no_bookings_found')}</Text>}

                              <FlatList
                            data={ this.state.previos_booking_arr }
                            keyExtractor={(item,index)=>index}
                            renderItem={({item}) =>
                              ( 
                                  
                                  <TouchableOpacity style={{marginTop: 10}}
                                  onPress={() => this.onPress(item)}
                                  >
                                  
                                  
                     
                                
                                                          <View style={{ marginTop:5,marginBottom: 5, flexDirection:'row' , justifyContent:'space-between' , marginLeft:10 , marginRight:10}}>
                                                                      <Text style={{fontSize:12}}>{item.fromstop}</Text>
                                                                      <Text style={{fontSize:12}}>{item.tostop}</Text>
                                                                      <Text style={{fontSize:12}}>{item.date}</Text>
                                                                      <Image style={{width: 20, height: 20,transform: [{ rotate: '180deg' }]}} source={require('./../../assets/images/backbtn/back.png')}></Image>

                                                            </View>
                            
                                                   


                                                            
                                                             <View opacity={0.3}  style={{  marginTop:5 , borderBottomColor: 'grey',  borderBottomWidth: 1,  }}></View>
                                 
                          </TouchableOpacity> 
                          )}
                            keyExtractor={(item, index) => index.toString()}
                          />

      </View>
    );
  }
}

const styles = StyleSheet.create({

  MainContainer: {
    flex: 1,
    backgroundColor:'#F5F5F5' ,
   
    //paddingTop: (Platform.OS === 'ios') ? 20 : 0,
   
  },

  iconStyle: {

    width: 30,
    height: 30,
    justifyContent: 'flex-end',
    alignItems: 'center',
    tintColor: '#fff'

  },
  statusBarBackground: {
    height: (Platform.OS === 'ios') ? 18 : Expo.Constants.statusBarHeight, 
          backgroundColor: "#FFFFFF",
  },


  sub_Category_Text: {
    fontSize: 18,
    color: '#000',
    padding: 10
  },

  category_Text: {
    fontSize: 15,
    padding: 10,
   
  },

  category_View: {
    marginVertical: 5,
    marginTop:20 , 
    
  },
  parent :{
    flex:1 ,
    backgroundColor:'#F5F5F5'
} ,
t1:{color:'#103056' , fontSize:20}
,
tocentertext:{ 
  flex:1 ,
  marginRight:20 ,
  marginLeft:20 ,
  flexDirection:'row' ,
   alignItems: 'center'
, justifyContent: 'space-between'
} ,
loginbtn :{
  marginTop:80,
  marginBottom:40 ,
  height:50 ,
  width:'40%' , 
  marginRight:5 ,
  backgroundColor:'#103056' ,
  borderRadius:4 ,
  alignItems:'center',
  justifyContent:'center' ,
  alignContent:'center' ,
  alignSelf:'center'
  

} ,
logintext:{
  color:'white' ,
  fontSize:15 , 

  alignItems:'center' , 
  
},
});