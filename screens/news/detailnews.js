import React from 'react';
import { View, Text , Image , ImageBackground , StyleSheet ,
TouchableOpacity ,StatusBar , Platform ,AsyncStorage
} from 'react-native';
import * as Font from 'expo-font';

import en from './../../strings/en.json' ;
import ur from './../../strings/ur.json' ;
import si from './../../strings/si.json' ;
import i18n from 'i18n-js';


export default class detailnews extends React.Component {

    static navigationOptions ={
        header: null
    }

    state = {
        fontLoaded: false,
        lang:''
      };

      async componentDidMount() {
        await Font.loadAsync({
          'opreg': require('./../../assets/fonts/opreg.ttf'),
        });
    
        this.setState({ fontLoaded: true });
      }

      componentWillMount(){
        this.getLanguage()
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
        <View style={{flex:1}}> 
          <View style={styles.statusBarBackground}></View>
                <StatusBar hidden={false} />
                <StatusBar barStyle={'dark-content'} backgroundColor ={'#FFFFFF'} translucent={true} /> 

                <View style={{ flexDirection: 'row', backgroundColor:'#ffffff' ,height:60 }}>
                                        <TouchableOpacity 
                                                        onPress={() => this.props.navigation.goBack()}
                                                        >

                                                        <Image style={{marginTop:15 ,  marginLeft:25}}
                                                         source={require('./../../assets/images/backbtn/back.png')}></Image>

                                                        </TouchableOpacity>

                                        <View style={{flexDirection:'column' , marginLeft:25}}>
                                        <Text style={{fontSize:25 , marginTop:10 , fontFamily:'opreg'}}>{i18n.t('news')}</Text>
                                     
                                        </View>
                              </View>




                                        <View style={{height:300 , width:'90%' , alignSelf:'center'}}>

  <Image style={{marginTop:15, alignSelf:'center'}} 
     source={require('./../../assets/images/nic/nic.png')}></Image>

<Text style={{alignSelf:'center' , fontSize:17 ,  marginTop:10}}>Lorem ipsum dolor sit amet,consectur adip sicing elit,sed do eiusmod tempor inciddunt ut , labore et dolore magna aliqua.Lorem ipsum dolor sit amet,consectur adip sicing elit,sed do eiusmod tempor inciddunt ut </Text>
        
  </View>


      
            
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
   
  });