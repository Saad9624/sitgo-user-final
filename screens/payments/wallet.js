import React from 'react';
import { View, Text , Image , ImageBackground , StyleSheet , Platform , FlatList ,
TouchableOpacity ,StatusBar ,AsyncStorage
} from 'react-native';
import * as Font from 'expo-font';
import { Card} from 'react-native-elements' ;

import en from './../../strings/en.json' ;
import ur from './../../strings/ur.json' ;
import si from './../../strings/si.json' ;
import i18n from 'i18n-js';

export default class wallet extends React.Component {

    static navigationOptions ={
        header: null
    }

    state = {
        fontLoaded: false,
        lang:''
      };

      componentWillMount(){
        this.getLanguage()
      }

      async componentDidMount() {
        await Font.loadAsync({
          'opreg': require('./../../assets/fonts/opreg.ttf'),
        });
    
        this.setState({ fontLoaded: true });
      }

      openmodal = () =>{
        this.setState({
          visibleModal : 5
        })
      }

      closemodal = () =>{
        this.setState({
          visibleModal: null
        })
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
    

    
  render() {
    return (
        <View style={{flex:1 }}> 
         <View style={styles.statusBarBackground}></View>
                <StatusBar hidden={false} />  
        
        
        
                                <View style={{ flexDirection: 'row', backgroundColor:'#ffffff' ,height:60 }}>
                                        <TouchableOpacity 
                                        onPress={() => this.props.navigation.goBack()}
                                        >

                                        <Image style={{marginTop:15 ,  marginLeft:25}} source={require('./../../assets/images/backbtn/back.png')}></Image>

                                        </TouchableOpacity>
                                       

                                        <View style={{flexDirection:'column' , marginLeft:25}}>
                                            <Text style={{fontSize:25 , marginTop:10 , fontWeight:'bold'}}>{i18n.t('wallet')}</Text>
                                     
                                        </View>
                              </View>


                <View style={{flexDirection:'row' , alignSelf:'center'}}>

                                <Text style={{alignSelf:'center',marginRight:10}}>PKR</Text>

                                <Text style={{fontSize:80 , fontWeight:'bold' , alignSelf:'center'}}>20</Text>
                </View>
                             

               <Text style={{fontSize:30 , color:'grey' , alignSelf:'center'}}>{i18n.t('available_blnc')}</Text>
                              

            <View style={{flexDirection:'row', justifyContent:'center' , marginTop:20}}>

                    <Card  >

                    <Image style={{marginTop:15 ,  marginLeft:25}} source={require('./../../assets/images/bookinghistory/bh.png')}></Image>


                        <Text style={{marginTop:40}}>{i18n.t('add_amount')}</Text>


                        
                        

                    </Card>


                    <Card  >

                    <Image style={{marginTop:15 ,  marginLeft:25}} source={require('./../../assets/images/activebooking/ab.png')}></Image>


                        <Text style={{marginTop:40}}>{i18n.t('send_amount')}</Text>


                        
                        

                    </Card>

            </View>

            <View style={{flexDirection:'row', justifyContent:'center' , marginTop:20}}>

                        <Card  >

                        <Image style={{marginTop:15 ,  marginLeft:25}} source={require('./../../assets/images/backbtn/back.png')}></Image>


                            <Text style={{marginTop:40}}>{i18n.t('add_amount')}</Text>


                            
                            

                        </Card>


                        <Card  >

                        <Image style={{marginTop:15 ,  marginLeft:25}} source={require('./../../assets/images/signout/signout.png')}></Image>


                            <Text style={{marginTop:40}}>{i18n.t('send_amount')}</Text>


                            
                            

                        </Card>

                        </View>

            <TouchableOpacity
           onPress = {() => this.openmodal()}
            style={styles.payview1} >
                        <View style={{flexDirection:'row' , flex:1}} >

                                <Text style={styles.payment}>{i18n.t('transaction_history_option')}</Text>
                            
                            <Image
                            style={{marginTop:15 , right:0 , position:'absolute' , marginRight:15}}
                            source={require('./../../assets/images/duwhite/duwhite.png')}></Image>

                  </View>
            </TouchableOpacity>
        
         
    
      
            
        </View>

      
    );
  }
}

const styles = StyleSheet.create({
    parent :{
        flex:1 ,
        backgroundColor:'#F5F5F5'
    } ,
    welcome:{
        color:'orange',
        fontSize:25 , 
        marginTop:10 ,
        fontFamily:'opreg' 
    },
    statusBarBackground: {
        height: (Platform.OS === 'ios') ? 18 : Expo.Constants.statusBarHeight, 
              backgroundColor: "#FFFFFF",
      }
    ,
    dummy:{
        marginTop:10  ,
        marginRight:20 , 
        marginLeft:20 ,
        color:'#A0A0A0' ,
        fontSize:15 ,
        fontFamily:'opreg' 
    } ,
    buttonview:{
        marginRight:20 ,
        marginLeft:20 ,
       marginBottom:30 , 
       flexDirection:"row" ,
       justifyContent:'space-evenly' 
    },
    loginbtn :{
        height:50 ,
        flex:1 , 
        marginRight:5 ,
        backgroundColor:'#103056' ,
        borderRadius:5
    } ,

    signupbtn :{
        height:50 ,
        flex:1 , 
        marginLeft:5 , 
         backgroundColor:'#C62930' ,
        borderRadius:5
    },
    logintext:{
        color:'white' ,
        fontSize:15 , 
        fontFamily:'opreg' ,
        alignItems:'center' , 
        
    },
    tocenterview:{ 
        flex: 1,
         alignItems: 'center'
    , justifyContent: 'center'
 } ,
 signuptext:{
    color:'white' ,
    fontSize:15 , 
    fontFamily:'opreg' ,
    alignItems:'center' , 
    
},

modalContent: {
    backgroundColor: 'white',
    
    
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  payview1:{width:'100%' , bottom:0 , position:'absolute' ,height:50 , backgroundColor:'#103056'} ,

  payment:{color:'white' , marginLeft:20 , marginTop:15 , fontSize:15} ,

   
  });