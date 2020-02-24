import React, { Component } from 'react';

import { Alert, LayoutAnimation ,Dimensions 
    ,ImageBackground , StyleSheet, View,AsyncStorage, Text, ScrollView, UIManager, TouchableOpacity, Platform, Image,StatusBar , FlatList } from 'react-native';

    
import en from './../../strings/en.json' ;
import ur from './../../strings/ur.json' ;
import si from './../../strings/si.json' ;
import i18n from 'i18n-js';


export default class booking_details extends React.Component{


  static navigationOptions = {
    header : null
  }
  state = {
    fromstop : '',
     tostop : '',
     seats: '',
     time: '',
     paymentMethod: '',
     date: '',
     allseats : '',
     image:'http://www.jennybeaumont.com/wp-content/uploads/2015/03/placeholder.gif' , 
     status:false ,
     lang:'' 
  }

  componentWillMount(){

    this.getLanguage()
    this.setState({
      fromstop : this.props.navigation.state.params.fromstop,
      tostop : this.props.navigation.state.params.tostop,
      seats : this.props.navigation.state.params.seats,
      time : this.props.navigation.state.params.time,
      paymentMethod : this.props.navigation.state.params.paymentMethod,
      date: this.props.navigation.state.params.date,
      allseats : this.props.navigation.state.params.allseats,

      busid : this.props.navigation.state.params.BUSID,
      
    })

     const status1 = this.props.navigation.state.params.STATUS 

    if(status1=='0' || status1 == 0){
      this.setState({
        status: true
      })
    }
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

   }

render(){
  let Image_Http_URL ={ uri: this.state.image};
    return(
        <View style={{flex:1}}>
        
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

         <ImageBackground 
             style={{width:Dimensions.get('window').width  
               , alignSelf:'center' , marginTop:10 , padding:10}}
             source={require('./../../assets/images/whiteback/whiteback.png')}>

                          <Text style={{marginTop:5 , marginLeft:10,textAlign:'left'}}>{i18n.t('your_driver')}</Text>

                          <View style={{flexDirection:'row' , marginTop:10 , marginLeft:10}}>
                              <Image source={require('./../../assets/images/placeholder/placeholder.png')}></Image>
                              <Text style={{marginLeft:10 , marginTop:10 , fontSize:15}}>BUS ID {this.state.busid}</Text>
              {this.state.status && 
              
              <TouchableOpacity onPress={()=> this.props.navigation.navigate('MOVINGBUS' ,{
                TIME: this.state.time , 
                DATE : this.state.date ,
                BUSID: this.state.busid
              })} >
                    <Text style={{color:'blue' , fontWeight:'bold' , marginLeft:40}}>{i18n.t('locate_bus')}</Text>
              </TouchableOpacity>
             }
                          </View>

                    <View >
                                <View style={{flexDirection:'row' , marginLeft:10 , marginTop:10}}>
                                                            <Image 
                                                            style={{marginTop:5
                                                            }}
                                                            source={require('./../../assets/images/reddot/red.png')}></Image>

                                                            <Text style={{marginLeft:10,fontSize:15}}>{i18n.t('from_bus_stop')}</Text>

                                                          <Text style={{marginLeft:10 , right:0 , position:'absolute',fontSize:15 ,marginRight:25}}>{this.state.fromstop}</Text>
                                            </View> 

                                            <View style={{flexDirection:'row' ,  marginLeft:10}}>
                                                        <Image
                                                            style={{marginLeft:2  ,marginTop:5}} 
                                                            source={require('./../../assets/images/greydots/grey.png')}></Image>

                                            </View> 
                                        
                                        

                                            <View style={{flexDirection:'row' , marginLeft:10}}>
                                                            <Image 
                                                        
                                                            source={require('./../../assets/images/reddot/red.png')}></Image>

                                                    <Text style={{marginLeft:10 ,fontSize:15}}>{i18n.t('destination_stop')}</Text>
                                                    <Text style={{marginLeft:10 ,fontSize:15, right:0 , position:'absolute' ,marginRight:25}}>{this.state.tostop}</Text>
                                            </View> 

                                            <View style={{flexDirection:'row' ,marginTop:10}}>
                                            
                                                    <Text style={{marginLeft:30}}>{i18n.t('seats_available')}</Text> 
                                                          <Text style={{marginRight:30, right:0 , position:'absolute'}}>{this.state.seats}</Text>
                                            </View>

                                            <View style={{flexDirection:'row' ,marginTop:10}}>
                                                  
                                                  <Text style={{marginLeft:30}}>{i18n.t('seat_no')}</Text> 
                                                <Text style={{marginRight:30, right:0 , position:'absolute'}}>{this.state.allseats}</Text>
                                           </View>

                                           <View style={{flexDirection:'row' ,marginTop:10}}>
                                                  
                                                  <Text style={{marginLeft:30}}>{i18n.t('time')}</Text> 
                                                          <Text style={{marginRight:30, right:0 , position:'absolute'}}>{this.state.time}</Text>
                                          </View>

                                          <View style={{flexDirection:'row' ,marginTop:10}}>
                                                  
                                                  <Text style={{marginLeft:30}}>{i18n.t('payment')}</Text> 
                                                          <Text style={{marginRight:30, right:0 , position:'absolute'}}>{this.state.paymentMethod}</Text>
                                          </View>

                                          {/* <TouchableOpacity
                       // onPress={() => this.props.navigation.navigate('LOGIN')}
                        style={styles.loginbtn}>
                        <View style={styles.tocenterview}>
                        <Text style={styles.logintext}>Cancel Booking</Text>
                        </View>
                            
                        </TouchableOpacity> */}


                    </View>
                    
                             



             </ImageBackground>
                                                            
                                                    
            </View>
    );
}
}

const styles = StyleSheet.create({

    MainContainer: {
      flex: 1,
      backgroundColor:'#F5F5F5' ,
      alignItems : 'center',
      justifyContent: 'center'
     
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