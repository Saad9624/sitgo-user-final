import React from 'react';
import { View, Text , Image , ImageBackground , StyleSheet ,
TouchableOpacity ,StatusBar , Platform ,Dimensions ,AsyncStorage
} from 'react-native';
import * as Font from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
import i18n from 'i18n-js';
import en from './../strings/en.json' ;
import ur from './../strings/ur.json' ;

export default class sidedrawer extends React.Component {

    static navigationOptions ={
        header: null
    }

    state = {
      isFocused: false,
      fontLoaded: false,
      lang:'',
      username :''
    };

    async componentDidMount() {
      await Font.loadAsync({
        'opreg': require('./../assets/fonts/opreg.ttf'),
      });
  
      this.setState({ fontLoaded: true });
    }

   async componentWillMount(){

      const name = await AsyncStorage.getItem('UN')
      this.setState({
        username:name
      })
      this.getLanguage()
    }

    async getLanguage(){
      i18n.fallbacks = true;
      i18n.translations = {
        en, ur
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

    async _logout(){

    await AsyncStorage.removeItem('USERID')
    await AsyncStorage.removeItem('BUSID')
    await AsyncStorage.removeItem('STOPID')  
    await AsyncStorage.removeItem('isLoginin')
    await AsyncStorage.removeItem("UN"  )
    await AsyncStorage.removeItem("EMAIL" )
    await AsyncStorage.removeItem("FSN")
    await AsyncStorage.removeItem("FSI")
    await AsyncStorage.removeItem("TSN")
    await AsyncStorage.removeItem("TSI")
    await AsyncStorage.removeItem("LANG")
   

    this.props.navigation.navigate('LOGIN')
    }


    changelang=() => {
      this.props.navigation.closeDrawer()
      
    }

    
  render() {
    return (
        <View style={styles.parent}>  


            <ImageBackground
                    style={{width:'100%' , height:200,justifyContent:'center' , alignSelf:'center'}}
                    source={require('./../assets/images/header/header.png')}>
                    
                    <Image 
                    style={{ marginTop:50 , marginLeft:20}}
                    source={require('./../assets/images/placeholder/placeholder.png')}>
                    </Image>

                    {/* {this.state.fontLoaded ? (      <Text style={{fontFamily:'opreg' ,color:'white' , marginLeft:20 , marginTop:10, fontSize:20}}>{this.state.username}</Text>) : null }
               */}
              <TouchableOpacity onPress={() => this.props.navigation.navigate('MYPROFILE')}>
                    {this.state.fontLoaded ? (       <Text style={{fontFamily:'opreg' ,color:'black' , marginLeft:20 , marginTop:5, fontSize:15,textAlign:'left'}}>{i18n.t('edit_profile')}</Text>) : null }
             
              </TouchableOpacity>
                 
            </ImageBackground>

                            <TouchableOpacity
                             onPress={() => this.props.navigation.navigate('ALL_STOPS_LIST')}
                                style={styles.loginbtn}>
                                <View style={styles.tocenterview}>
                                {this.state.fontLoaded ? (     <Text style={styles.logintext}>{i18n.t('book_your_ride')}</Text>) : null }
                                </View>
                                    
                                </TouchableOpacity> 

<ScrollView>

                                <TouchableOpacity
                             onPress={() => this.props.navigation.navigate('NEW_BOOKING')}>
                                <View style={{flexDirection:'row' , padding:10}}>
                                        <Image style={{marginTop:3}} source={require('./../assets/images/activebooking/ab.png')}></Image>
                                        {this.state.fontLoaded ? (             <Text style={styles.side1}>{i18n.t('active_booking')}</Text>) : null }
                                </View>
                                </TouchableOpacity> 
                                
                                <TouchableOpacity
                             onPress={() => this.props.navigation.navigate('PREVIOUS_BOOKING')}>
                                <View style={{flexDirection:'row' , marginTop:10 , padding:10}}>
                                          <Image style={{marginTop:3}} source={require('./../assets/images/bookinghistory/bh.png')}></Image>
                                          {this.state.fontLoaded ? (              <Text  style={styles.side1}>{i18n.t('booking_history')}</Text>) : null }
                                </View>
                                </TouchableOpacity> 



                                <TouchableOpacity
                             onPress={() => this.props.navigation.navigate('CHANGELANG')}>
                                <View style={{flexDirection:'row' , marginTop:10 , padding:10}}>
                                          <Image style={{marginTop:3}} source={require('./../assets/images/bookinghistory/bh.png')}></Image>
                                          {this.state.fontLoaded ? (              <Text  style={styles.side1}>{i18n.t('changelang')}</Text>) : null }
                                </View>
                                </TouchableOpacity> 
                               
                                {/* <TouchableOpacity
                             onPress={() => this.props.navigation.navigate('MOVINGBUS')}>
                                        <View style={{flexDirection:'row' , marginTop:10 , padding:10}}>
                                            <Image style={{marginTop:3}} source={require('./../assets/images/payment/payment.png')}></Image>
                                            {this.state.fontLoaded ? (                 <Text  style={styles.side1}>MOVINGBUS</Text> ) : null }

                                    </View>
                               </TouchableOpacity>  */}

                               {/* <TouchableOpacity
                             onPress={() => this.props.navigation.navigate('ROUTES')}>
                                        <View style={{flexDirection:'row' , marginTop:10 , padding:10}}>
                                            <Image style={{marginTop:3}} source={require('./../assets/images/payment/payment.png')}></Image>
                                            {this.state.fontLoaded ? (                 <Text  style={styles.side1}>Locate Bus</Text> ) : null }

                                    </View>
                               </TouchableOpacity>  */}


                                 {/* <TouchableOpacity> 
                               <View style={{flexDirection:'row' , marginTop:10 , padding:10}}>
                                         <Image style={{marginTop:3}} source={require('./../assets/images/notification/noti.png')}></Image>
                                         {this.state.fontLoaded ? (              <Text  style={styles.side1}>Notifications</Text>) : null }
                               </View>
                               </TouchableOpacity>  */}

                               <TouchableOpacity
                             onPress={() => this.props.navigation.navigate('BUS_ROUTE')}>
                                <View style={{flexDirection:'row' , marginTop:10 , padding:10}}>
                                        <Image style={{marginTop:3}} source={require('./../assets/images/activebooking/ab.png')}></Image>
                                        {this.state.fontLoaded ? (             <Text style={styles.side1}>{i18n.t('checkroute')}</Text>) : null }
                                </View>
                                </TouchableOpacity> 


                               <TouchableOpacity onPress={() => this.props.navigation.navigate('WALLET')}>
                               <View style={{flexDirection:'row' , marginTop:10 , padding:10}}>
                                         <Image style={{marginTop:3}} source={require('./../assets/images/notification/noti.png')}></Image>
                                         {this.state.fontLoaded ? (              <Text  style={styles.side1}>{i18n.t('wallet')}</Text>) : null }
                               </View>
                               </TouchableOpacity> 

                          
 
                               </ScrollView>  
                               {/* <TouchableOpacity style={{bottom:0 , position:'absolute' , width:'100%' , marginBottom:10}}
                             onPress={() => this._logout()}>
                                <View >
                                            <View  style={styles.viewstyle}  />

                                            <View style={{flexDirection:'row' , marginTop:5 , padding:10, marginBottom:10}}>
                                                      <Image style={{marginTop:3}} source={require('./../assets/images/signout/signout.png')}></Image>
                                                      {this.state.fontLoaded ? (                               <Text  style={styles.side1}>Sign out</Text>) : null }

                                            </View>
                                         
                                </View>
                                </TouchableOpacity> */}

                                <TouchableOpacity  onPress={() => this._logout()}>
                                <View  style={styles.viewstyle}  />
                               <View style={{flexDirection:'row' , marginTop:10 , padding:10}}>
                                         <Image style={{marginTop:3}} source={require('./../assets/images/signout/signout.png')}></Image>
                                         {this.state.fontLoaded ? (              <Text  style={styles.side1}>{i18n.t('sign_out')}</Text>) : null }
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
    statusBarBackground: {
        height: (Platform.OS === 'ios') ? 18 : 0, //this is just to test if the platform is iOS to give it a height of 18, else, no height (Android apps have their own status bar)
        backgroundColor: "#FF4500",
      },
   burger:{ 
    marginTop:20 ,
    marginLeft:20 ,
    width : 20 , 
    height : 20 ,  } ,
h1:{
    fontSize:20 ,
    marginTop:17 ,
    marginLeft:20 ,
} ,
h2:{
    fontWeight:'bold',
    fontSize:25 ,
    marginLeft:50 , 
    marginTop:5 ,
},
title:{marginLeft:15 ,fontWeight:'100' , fontSize:10},

stopname:{marginLeft:25 , fontSize:15} ,

seats:{marginLeft:25 , fontSize:10} ,

viewstyle:{
    alignSelf:'center' , 
    marginLeft:25 ,
    marginRight:25 ,
  padding:2 ,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
},
tocenterview:{ 
    flex: 1,
     alignItems: 'center'
, justifyContent: 'center'
} ,
loginbtn :{
    marginTop:10,
    height:50 ,
    width:'80%' , 
    marginRight:5 ,
    backgroundColor:'#C62930' ,
    borderRadius:4 ,
    alignSelf:'center' ,
    marginBottom:10
    
    

} ,
logintext:{
    color:'white' ,
    fontSize:15 , 
    fontFamily:'opreg' ,

    alignItems:'center' , 
    
},
side1:{
  marginTop:3 ,
    marginLeft:15 , 
    fontSize:15 , 
    fontFamily:'opreg' 

},
viewstyle:{
    width:'100%'
   ,opacity:0.2 , 
  padding:2 ,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
}
   
  });