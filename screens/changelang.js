import React, { Component } from 'react';

import { Alert, LayoutAnimation ,Dimensions 
    ,ImageBackground , StyleSheet,AsyncStorage, View, Text, ScrollView, UIManager, TouchableOpacity, Platform, Image,StatusBar , FlatList } from 'react-native';


    import en from './../strings/en.json' ;
import ur from './../strings/ur.json' ;
import si from './../strings/si.json' ;
import i18n from 'i18n-js';

import * as moment from 'moment'


export default class changelang extends React.Component {


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
//     var today = new Date();
//     date=today.getDate() + "/"+ parseInt(today.getMonth()+1) +"/"+ today.getFullYear();
//     console.log("date" ,date);
//     console.log("today" ,today);

//     var moment = require('moment');
//     var cos = moment().format('dddd');
// console.log("NewDate" ,cos)
  }

  async getLanguage(){
    i18n.fallbacks = true;
    i18n.translations = {
      en, ur ,si
    };
    
    const language = await AsyncStorage.getItem('LANG')


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
    this.forceUpdate()
   
   }
   seturdu = () => {
    console.log("urdu clicked")
     AsyncStorage.setItem('LANG','ur')
     this.getLanguage() 
}

setenglish = () => {
    console.log("english clicked")
     AsyncStorage.setItem('LANG','en')
     this.getLanguage()
}

setsindhi = () => {
    console.log("sindhi clicked")
     AsyncStorage.setItem('LANG','si')
     this.getLanguage()
     
}

  render() {
    return (
      <View style={styles.MainContainer}>

      
<View style={styles.statusBarBackground}></View>
                <StatusBar hidden={false} />
                        <StatusBar barStyle={'dark-content'} backgroundColor ={'#000000'} translucent={true} /> 
        

                            <View style={{ flexDirection: 'row' , backgroundColor:'#ffffff',height:60 }}>
                                      <TouchableOpacity 
                                        onPress={() => this.props.navigation.navigate('MAP' ,{
                                          lang :this.state.lang
                                        })}
                                        >

                                        <Image style={{marginTop:15 ,  marginLeft:25}} source={require('./../assets/images/backbtn/back.png')}></Image>

                                        </TouchableOpacity>

                                        <View style={{flexDirection:'column' , marginLeft:20}}>
                                           
                                            <Text style={{fontSize:25 , marginTop:10 , fontWeight:'bold'}}>{i18n.t('changelang')}</Text>
                                     
                                     
                                        </View>
                              </View>

                              <View style={{flexDirection:'column' , justifyContent:'space-between' , marginTop:10, marginLeft:25  , marginRight:20}}>


                                            <TouchableOpacity onPress={()=>this.setenglish()} style={{margin:10,flexDirection:'row',alignItems:'center'}}>
                                                <View style={{width:10,height:10 ,borderRadius:10 , backgroundColor:'grey'}}></View>
                                                <Text style={styles.t1}>{i18n.t('english')}</Text>
                                            </TouchableOpacity>
                                            
                                            <TouchableOpacity onPress={()=>this.seturdu()} style={{margin:10,flexDirection:'row',alignItems:'center'}}>
                                                 <View style={{width:10,height:10 ,borderRadius:10 , backgroundColor:'grey'}}></View>
                                                <Text  style={styles.t1}>{i18n.t('urdu')} </Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={()=>this.setsindhi()} style={{margin:10,flexDirection:'row',alignItems:'center'}}>
                                                    <View style={{width:10,height:10 ,borderRadius:10 , backgroundColor:'grey'}}></View>
                                                    <Text  style={styles.t1}>{i18n.t('sindhi')}</Text>
                                            </TouchableOpacity>
                               
                                 </View>

                           

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
t1:{color:'#103056' , fontSize:20, textAlign:'left',marginLeft:20}
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