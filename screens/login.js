import React from 'react';
import { View, Text , Image , ImageBackground , StyleSheet ,
TextInput ,
TouchableOpacity,
Dimensions,
StatusBar,
AsyncStorage,PureComponent ,Platform ,
NetInfo ,Alert
} from 'react-native';
import Loading from 'react-native-whc-loading' ;
import baseurl from '../components/baseurl' ;
import i18n from 'i18n-js';
import en from './../strings/en.json' ;
import ur from './../strings/ur.json' ;
import si from './../strings/si.json' ;
import * as Localization from 'expo-localization';

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';


// i18n.fallbacks = true;
// i18n.translations = {
//   en, ur
// };

// const language = AsyncStorage.getItem('LANG')
// console.log("languafe" , language)

// i18n.locale = language;

export default class registration extends React.PureComponent {

    static navigationOptions ={
        header: null
    }

    state={
        number :'' ,
        password: '' ,
        lang:'en' ,
        pushtoken: ''

    }
    // componentWillMount(){
    //     console.log(" mount")
    //     this.getLanguage()
    // }

    // componentDidMount(){
    //     console.log("did mount")
    // }

    componentDidMount(){

        if (Platform.OS === 'android') {
            Notifications.createChannelAndroidAsync('chatmessages', {
              name: 'Chat messages',
              priority: 'high',
              sound: true,
              channelId: 'chatmessages',
            });
          }

          this.registerForPushNotificationsAsync()
          


        console.log("did mount")
        this.getLanguage()
      }
      componentWillMount(){

        
         // this.registerForPushNotificationsAsync()

      }
      
      registerForPushNotificationsAsync = async () => {
        
        const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
        let finalStatus = existingStatus;
    
       
        if (existingStatus !== 'granted') {
       
          const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
          finalStatus = status;
        }
    
       
        if (finalStatus !== 'granted') {
          return;
        }
       
        let token = await Notifications.getExpoPushTokenAsync();
        this.setState({
          pushtoken:token
        })
      
          console.log("token " , token)
          
      }

      checkinternet = () => {
      

        NetInfo.getConnectionInfo().then(connectionInfo => {
          if(connectionInfo.type  == 'none'){
            this.checklogin()
          } 
          else{
                this.check_if_empty()
            }
          

        });
      }


      checklogin = async ()=> {
        Alert.alert(
          'No Internet Connection',
          'Please check your internet connection', 
          [
            { text: 'okay', onPress: () => this.props.navigation.navigate('LOGIN') },

          ],
          { cancelable: false }
        );
       }


     

      // registerForPushNotificationsAsync = async () =>  {
      //   const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      
      //   if (status !== 'granted') {
      //     alert('Notification permissions not granted!');
      //     return;
      //   }
      
       
      //   let token = await Notifications.getExpoPushTokenAsync();
      //   this.setState({
      //     pushtoken:token
      //   })
      
      //     console.log("token " , token)
      // }
      


    handleTextChange = (newText) => this.setState({ number: newText });
    handleTextChange1 = (newText) => this.setState({ password: newText });


    check_if_empty = async () =>{


        this.refs.loading2.show() ;

       // this.LOGIN_SERVICE()

        if(this.state.number != '' && this.state.password != ''){
                 
            this.LOGIN_SERVICE(this.state.number , this.state.password)
        }
        else{
            this.refs.loading2.close() ;
                alert("Fields cannot be empty")
        }
    
    }

      LOGIN_SERVICE = async (num , pass) => {

      //  LOGIN_SERVICE = async () => {
        console.log('num :', num) ;
        console.log('pass :', pass) ;
      
        try{
        
            console.log("try" , "under try")
    
            var details = {
                   
             "phone" : '92' + num  ,
              "password"  : pass   ,
              "language"  : this.state.lang ,
              'token'     : this.state.pushtoken 

            // "phone" : '92' + '3463257698'  ,
            // "password"  : '123'   ,
              
     };
     
     var formBody = [];
     for (var property in details) {
       var encodedKey = encodeURIComponent(property);
       var encodedValue = encodeURIComponent(details[property]);
       formBody.push(encodedKey + "=" + encodedValue);
     }
      formBody = formBody.join("&");
    
    
          fetch(baseurl.uatbaseurl + 'login/user',
          {
           
            method: 'POST',
               headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
            
    
            body: formBody
      
           })
       
       
    
           .then((response) => response.json())
           
                  .then((responseJson) => {
                   
                       console.log('response object: ',responseJson)
                     
    
    
                       if(responseJson.responcecode == '002' ){
                        this.refs.loading2.close() ;
                        this.regcode(responseJson.message , responseJson.userdetails.activationcode)
                      }
                      else if(responseJson.responcecode == '001' ){
                        this.refs.loading2.close() ;
                         AsyncStorage.setItem("UN" ,responseJson.userdetails.name )
                         AsyncStorage.setItem("EMAIL" ,responseJson.userdetails.email )
                         AsyncStorage.setItem("USERID" ,responseJson.userdetails.id )
                         AsyncStorage.setItem('isLoginin' ,"yes" )

                         console.log("isloginchecking" , AsyncStorage.getItem("isLoginin"))

                        this.props.navigation.navigate('MAP' , {
                            USERNAME: responseJson.userdetails.name  ,
                            EMAIL :responseJson.userdetails.email 
                        })
                      }
                      else{
                        this.refs.loading2.close() ;
                        alert(responseJson.message)
                      }
                  })
                  .catch((error) => {
                    this.refs.loading2.close() ;
                  console.error(error);
                  });
    
          
        }
        catch(e){
          this.refs.loading2.close() ;
          this.refs.loading2.close() ;
          console.log("catch" , e)
          
        }
    
    
    
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

    async getLanguage(){
        i18n.fallbacks = true;
        i18n.translations = {
          en, ur , si
        };
        
        const language = await AsyncStorage.getItem('LANG')

        // this.setState({
        //     lang: language
        // })

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
       

        i18n.locale = this.state.lang; 
        console.log("i8ln" , i18n.locale)
        console.log("languafe" , this.state.lang)
        
        this.forceUpdate() 
       }
      
       
    
  render() {
      console.log("render")
    return (
        <View style={styles.parent}>  
        
        <StatusBar backgroundColor="blue" barStyle="light-content" /> 
                    <View style={styles.tocenterview}>
                            <Image 
                               source={require('./../assets/images/logo/logo.png')}></Image>


                            <Text style={styles.hello}>{i18n.t('hello_nice_to_meet_you')}</Text>
                            <Text style={styles.moving}>{i18n.t('keep_moving_with_sitgo')}</Text>

                           


                                                    <View   style={styles.et1}>
                                                            <View style={styles.tocentertext}>
                                                                <Text style={{marginRight:20}} >+92</Text>
                                                                <TextInput
                                                                style={{marginLeft:20}}
                                                                maxLength={11}
                                                                keyboardType='numeric'
                                                                value={this.state.number}
                                                                onChangeText={this.handleTextChange}
                                                                placeholder='300-1234567'>
                                                                    
                                                                </TextInput>
                                                              
                                                            </View>
                                            
                                                    </View>

                                                    <View style={styles.et1}>

                                                            <View style={styles.tocentertext}>
                                                                    <Text style={{color:'transparent'}}>1877</Text>
                                                                    <TextInput
                                                                      style={{marginLeft:20}}
                                                                    value={this.state.password}
                                                                    onChangeText={this.handleTextChange1}
                                                                    secureTextEntry={true}
                                                                    placeholder={i18n.t('password')}>
                                                                        
                                                                    </TextInput>

                                                                  
                                                                </View>
                                                    </View>

                                                    <TouchableOpacity
                                                      style={{marginRight:20 ,marginTop:10,marginLeft:20}}
                                                    onPress={() => this.props.navigation.navigate('VERIFY_NUM')}>
                                                      <Text>Forgot Password?</Text>
                                                    </TouchableOpacity>




                          


                            <TouchableOpacity
                        onPress={() => this.checkinternet()}
                        style={styles.loginbtn}>
                        <View style={styles.tocenterview}>
                        <Text style={styles.logintext}>{i18n.t('login')}</Text>
                        </View>
                            
                        </TouchableOpacity> 

                        <View style={{flexDirection:'row'}}>


                                    <TouchableOpacity  style={{borderBottomColor:'grey' , borderBottomWidth:1,marginRight:10 }}
                                    onPress={()=> this.setenglish()}  >

                                        <Text style={{alignSelf:'center' , fontSize:15,fontWeight:'bold'}}>English</Text>
                                    </TouchableOpacity>

                                        <View style={{width:1,height:20,marginTop:5 , backgroundColor:'black'}}></View>

                                    <TouchableOpacity  style={{borderBottomColor:'grey' , borderBottomWidth:1,marginLeft:10 ,marginRight:10 }}
                                    onPress={()=> this.seturdu()}  >

                                        <Text style={{alignSelf:'center' , fontSize:15,fontWeight:'bold'}}>Urdu</Text>
                                    </TouchableOpacity>

                                    <View style={{width:1,height:20,marginTop:5 , backgroundColor:'black'}}></View>

                                    <TouchableOpacity  style={{borderBottomColor:'grey' , borderBottomWidth:1,marginLeft:10 }}
                                    onPress={()=> this.setsindhi()}  >

                                        <Text style={{alignSelf:'center' , fontSize:15,fontWeight:'bold'}}>Sindhi</Text>
                                    </TouchableOpacity>


                            
                        </View>

                                   <TouchableOpacity  style={{marginTop:10}}
                                    onPress={()=> this.props.navigation.navigate('SIGNUP')}  >

                                        <Text style={{alignSelf:'center' , fontSize:15}}>{i18n.t('don’t_have')}</Text>
                                    </TouchableOpacity>



                        
                    </View>  

                    <Loading ref='loading2'/>
        </View>

        
    );
  }
}

const styles = StyleSheet.create({
    parent :{

        flex:1 ,
        backgroundColor:'#E8ECF5',
        
    } ,
    tocenterview:{
 
        flex: 1,
         alignItems: 'center'
    , justifyContent: 'center'
 } ,
 hello:{

     marginTop:20 ,
     fontSize:15 ,
     color:'black'
 }  ,
 moving:{

     fontSize:25 ,
     color:'black' ,
     fontWeight:'bold' ,
 },
 et1:{

     borderColor:'#d3d3d3' , 
     borderRadius:5,
     backgroundColor:'white' ,
     height:70 ,
     marginTop:20 ,
     borderWidth:1 ,
     width: '90%',
     marginRight:40 ,
     marginLeft:40
 },
 et2:{

    borderColor:'#d3d3d3' , 
    borderRadius:5,
    backgroundColor:'white' ,
    height:70 ,
    marginTop:10 ,
    borderWidth:1 ,
    width: '90%',
    marginRight:40 ,
    marginLeft:40
},
ext:{

    justifyContent:'center' ,
    color:'black' ,
        fontSize:15 , 
       alignItems:'center' , 
        
    
} ,
tocentertext:{
 
    flex:1 ,
    marginRight:20 ,
    marginLeft:20 ,
    flexDirection:'row' ,
     alignItems: 'center',
} ,
loginbtn :{

    marginTop:80,
    marginBottom:20 ,
    height:50 ,
    width:'40%' , 
    marginRight:5 ,
    backgroundColor:'#103056' ,
    borderRadius:4 ,
    alignItems:'center',
    justifyContent:'center' ,
    alignContent:'center' ,
    

} ,
logintext:{

    color:'white' ,
    fontSize:15 , 
 
    alignItems:'center' , 
    
},
  
   
  });