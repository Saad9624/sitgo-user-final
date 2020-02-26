import React from 'react';
import { View, Text , Image , ImageBackground , StyleSheet ,
    TextInput ,
    TouchableOpacity,
    Dimensions,
    StatusBar,
    AsyncStorage,PureComponent ,Platform ,
    NetInfo ,Alert
    } from 'react-native';
import * as Font from 'expo-font';
import Loading from 'react-native-whc-loading' ;
import baseurl from './../../components/baseurl' ;


import i18n from 'i18n-js';
import en from './../../strings/en.json' ;
import ur from './../../strings/ur.json' ;
import si from './../../strings/si.json' ;

export default class otp extends React.Component {

    static navigationOptions ={
        header: null
    }

    state= {
        userid : '',
         password:'' ,
         repass  :'' ,
        fontLoaded: false,
        code:'' ,
        lang:'' ,
      
    };

    componentWillMount(){
        const userid = this.props.navigation.state.params.UID 
        this.setState({
            userid:userid
        })
    

      this.getLanguage()
    }


    async componentDidMount() {
      await Font.loadAsync({
        'opreg': require('./../../assets/fonts/opreg.ttf'),
      });
  
      this.setState({ fontLoaded: true });
    }
    onTextChange = text => {
        this.setState({password : text});
    
     }

     onchangerepass = text => {
        this.setState({repass : text});
    
     }
  
  

  async getLanguage(){
    i18n.fallbacks = true;
    i18n.translations = {
      en, ur ,si
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
    console.log("languafe" , this.state.lang)
    
    i18n.locale = this.state.lang; 

    console.log("i8ln" , i18n.locale)

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





handleTextChange = (newText) => this.setState({ number: newText });



check_if_empty = async () =>{


    



   // this.LOGIN_SERVICE()

    if(this.state.password != '' &&  this.state.repass){

        if(this.state.password == this.state.repass){

            
            this.LOGIN_SERVICE(this.state.password ,this.state.userid)
        }
        else{
            alert('Password Mismatched!')
        }
             
       
    }
    else{
        
            alert("Fields cannot be empty")
    }

}

  LOGIN_SERVICE = async (password , userid) => {
    this.refs.loading2.show() ;
  //  LOGIN_SERVICE = async () => {
    console.log('password :', password) ;
    console.log('userid :', userid) ;
  
    try{
    
        console.log("try" , "under try")

        var details = {
               
          "password"  : this.state.password   ,
          "user_id"  : this.state.userid ,

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


      fetch(baseurl.uatbaseurl + 'user/updatepass',
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
                  else if(responseJson.responcecode == '101' ){
                    this.refs.loading2.close() ;
                    

                    this.props.navigation.navigate('LOGIN')
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

    
  render() {
    return (
        <View style={{flex:1 , backgroundColor:'#E8ECF5'}}>


                                    <View style={{justifyContent:'center' , alignItems:'center' ,flex:1}}>
                                    
                                                                <Image 
                                                                    style={{alignSelf:'center'}}
                                                                    source={require('./../../assets/images/logo/logo.png')}></Image>
                                    
                                            
                                                                    {this.state.fontLoaded ? (        <Text style={styles.t1}>Enter your password</Text>) : null }
                                                                        {this.state.fontLoaded ? (         <Text style={styles.t2}>{i18n.t('optcode')}</Text>) : null }

                                                
                                                    

                                                                    <TextInput 
                                                                    secureTextEntry={true}
                                                                    placeholderTextColor='#FF4500'
                                                                    placeholder={i18n.t('password')}
                                                                    ref={input1 => this.input1 = input1}
                                                                    textAlign={'center'}
                                                                    onChangeText={this.onTextChange} 
                                                                    maxLength={11} keyboardType = 'numeric'
                                                                        style={{width:'80%' ,borderColor:'#FF4500' ,
                                                                             borderWidth : 1 , borderRadius:5,padding:15, marginRight:5 }}>{this.state.password}</TextInput>
                                                    
                                                
                                                                    <TextInput 
                                                                      secureTextEntry={true}
                                                                                        placeholderTextColor='#FF4500'
                                                                                        placeholder={i18n.t('re-enterpassword')}
                                                                                        ref={input1 => this.input1 = input1}
                                                                                        textAlign={'center'}
                                                                                        onChangeText={this.onchangerepass} 
                                                                                        maxLength={11} keyboardType = 'numeric'
                                                                                            style={{width:'80%' ,borderColor:'#FF4500' , marginTop:20 ,
                                                                                                borderWidth : 1 , borderRadius:5,padding:15, marginRight:5 }}>{this.state.repass}</TextInput>
                                                                        
                                                                    
                                                                        

                                    
                                    
                                    </View>
                                       
                           

                                    <TouchableOpacity
                                                    style={{borderColor:'#103056',marginBottom:50 , marginLeft:10 ,width:'80%' ,alignSelf:'center', borderRadius:4 , height:50  , backgroundColor:'#103056'}}
                                                    onPress={() => this.checkinternet()} >
                                                    {this.state.fontLoaded ? (             <Text style={{fontFamily:'opreg' ,color:'white' , alignItems:'center' , fontSize:20 , alignSelf:'center' , marginTop:10 , justifyContent:'center'}}>{i18n.t('next')}</Text>) : null }


                                    </TouchableOpacity>

                  
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
bottmcontainer:{
    marginLeft:20 ,
     marginRight:20 ,
     bottom:0 , 
     position :'absolute' ,
flex:1 ,
marginBottom:100
},
t1:{
    marginTop:50 ,
    fontSize:15 ,
    fontWeight:'600' ,
    fontFamily:'opreg' 
} ,
t2:{
    fontSize:25 ,
    fontWeight:'800' ,
    fontFamily:'opreg' ,
    color:'transparent'
},
v1:{
    marginLeft:10 , 
    marginTop:20 , 
    borderColor:'#d3d3d3' ,
    backgroundColor:'white',
    borderRadius:5 ,
    borderWidth:1 ,
    height:70 ,
    width:'100%',
    alignSelf:'center'
},
t3:{
    marginTop:40 , 
    fontSize:15 ,
    fontWeight:'200' ,
    fontFamily:'opreg' 
} ,
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
    

} ,
   
  });