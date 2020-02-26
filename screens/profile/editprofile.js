import React from 'react';
import { View, Text , Image , ImageBackground , StyleSheet ,
TouchableOpacity ,StatusBar , Platform , AsyncStorage
} from 'react-native';
import * as Font from 'expo-font';
import { Card ,Rating} from 'react-native-elements';
import baseurl from '../../components/baseurl';

import en from './../../strings/en.json' ;
import ur from './../../strings/ur.json' ;
import i18n from 'i18n-js';
import si from './../../strings/si.json' ;


export default class myprofile extends React.Component {

    static navigationOptions ={
        header: null
    }

    state = {
        fontLoaded: false,
        drivername:'' ,
        joiningdate:'1 jan 2020' ,
        trip:0 ,
        image:'http://www.jennybeaumont.com/wp-content/uploads/2015/03/placeholder.gif' , 
        review:0 ,
        lang:'' ,
        username :''


      };

      async componentDidMount() {
        await Font.loadAsync({
          'opreg': require('./../../assets/fonts/opreg.ttf'),
        });
    
        this.setState({ fontLoaded: true });

       // this.get_profile()
      }

      componentWillMount(){
        this.getLanguage()
        this._getStorageValue()
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
       async _getStorageValue(){
              var USERNAME = await AsyncStorage.getItem('UN')
              console.log("username" , USERNAME)
              this.setState({
                  username : USERNAME
              })
       
      }

    
    
  render() {
    let Image_Http_URL ={ uri: this.state.image};
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
                                                                {this.state.fontLoaded ? (  <Text style={{fontSize:25 , marginTop:10 , fontFamily:'opreg'}}>{i18n.t('my_profile')}</Text>) : null }
                                                            
                                                                </View>
                                                </View> 


                                                  
                                                    <View>
                                                                                                                    
                                                                                                                    <Image source={Image_Http_URL} 
                                                                                                                        
                                                                                                                        style={styles.image} />
                                                                      </View>

                                                                    {this.state.fontLoaded ? (  <Text style={styles.welcome}>{this.state.username}</Text>  ) : null }
                                                        
                                                                    <View style={{flexDirection:'row' , alignSelf:'center' , marginTop:20}}>
                                                                                {this.state.fontLoaded ? (<Text style={styles.dummy}>{i18n.t('joining_date')}</Text>  ) : null }            
                                                                                {this.state.fontLoaded ? (<Text style={styles.dummy}>{this.state.joiningdate}</Text>  ) : null }            

                                                                    </View>


                                                                    <View style={{flexDirection:'row' , alignSelf:'center'}}>
                                                                                {this.state.fontLoaded ? (<Text style={styles.dummy}>{i18n.t('total_trips')}</Text>  ) : null }            
                                                                                {this.state.fontLoaded ? (<Text style={styles.dummy}>{this.state.trip}</Text>  ) : null }            

                                                                    </View>

                                                                  
                                                
                                            
                                              

                                              
                                                                <TouchableOpacity onPress={() => this.props.navigation.navigate('UPDATEPROFIL')}
                                                                 style={{bottom:0 ,position:'absolute' ,marginBottom:50 ,
                                                                 alignSelf:'center',justifyContent:'center' , alignItems:'center',height:50 ,backgroundColor:'#C62930' , borderWidth:1 , width:200 , borderRadius:5} }>

                                                                  <Text style={{color:'white'}}>Update profile</Text>
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
        alignSelf:'center' , 
        color:'orange',
        fontSize:25 , 
        marginTop:10 ,
        fontFamily:'opreg' 
    },
    statusBarBackground: {
        height: (Platform.OS === 'ios') ? 18 : Expo.Constants.statusBarHeight, 
              backgroundColor: "#FFFFFF",
      },
    dummy:{
        alignSelf:'center' ,
        marginTop:10  ,
        marginRight:20 , 
        marginLeft:20 ,
        color:'#A0A0A0' ,
        fontSize:15 ,
        fontFamily:'opreg' 
    } ,
    dummy1:{
        alignSelf:'center' ,
        marginTop:10  ,
        marginRight:20 , 
        marginLeft:20 ,
        color:'#103056' ,
        fontSize:20 ,
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
image: {
  alignSelf:'center' , 
  height: 100,
  width: 100,
  borderRadius: 50,
},
container: {
  flex: 1,
},
   
  });