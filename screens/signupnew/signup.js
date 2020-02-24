import React, { Component } from 'react';
import { View, StatusBar, TextInput, Animated  ,Image , StyleSheet ,TouchableOpacity,
  KeyboardAvoidingView ,Alert ,AsyncStorage 
,Text} from 'react-native';
import * as Font from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
import Loading from 'react-native-whc-loading' ;
import baseurl from './../../components/baseurl' ;

import i18n from 'i18n-js';
import en from './../../strings/en.json' ;
import ur from './../../strings/ur.json' ;

import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import { Input } from 'react-native-elements';

export default class signup extends Component {
  
    static navigationOptions ={
        header: null , 
        drawerLockMode : 'locked-closed' ,
        gesturesEnabled : false

    }

    
  state = {
    fname: '',
    lname:'' ,
    email:'' ,
    number:'',
    password:'',
    fontLoaded: false,
  };

  async componentDidMount() {
    await Font.loadAsync({
      'opreg': require('./../../assets/fonts/opreg.ttf'),
    });

    this.setState({ fontLoaded: true });
   // await this.registerForPushNotificationsAsync()
  }

  handleTextChange = (newText) => this.setState({ fname: newText });
  handleTextChange1 = (newText) => this.setState({ lname: newText });
  handleemail = (newText) => this.setState({ email: newText });
  handlnumber = (newText) => this.setState({ number: newText });
  handlepassword = (newText) => this.setState({ password: newText });


  registerbtn = async () => {
    
    this.refs.loading2.show() ;

    var firstname = this.state.fname ;
    var lastname = this.state.lname ;
    var email = this.state.email ;
    var phone = this.state.number ;
    var password = this.state.password ;
    
    if(firstname != '' && lastname != '' && email != '' && phone != '' && password != ''){

      this.registrationService(firstname , lastname , email , phone , password )
    }
    else{
      //this.registrationService()
      this.refs.loading2.close() ;
       alert("Fields cannot be empty")
    }
  }

  regcode = async (description , code) =>{
    Alert.alert(
      description,
      'Enter OTP code: ' + code,
      [
        { text: 'okay', onPress: () => this.props.navigation.navigate('OTP' , {
          CODE : code ,
        })
      
      },
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      //   { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  }

  registrationService = async (firstname , lastname , email , number , password) => {


    console.log('firstname :', firstname) ;
    console.log('lastname :', lastname) ;
    console.log('email:', email) ;
    console.log('number:', number) ;
    console.log('password:', password) ;
    try{
    
        console.log("try" , "under try")

        var details = {
               
         "firstname" : firstname  ,
          "lastname"  : lastname   ,
          "email"     : email   ,
          "code"      : '92'               ,
          "phone"     : number ,
          "password"  : password ,
          "language" :  this.state.lang ,
          "token"    : this.state.pushtoken
 };
 
 var formBody = [];
 for (var property in details) {
   var encodedKey = encodeURIComponent(property);
   var encodedValue = encodeURIComponent(details[property]);
   formBody.push(encodedKey + "=" + encodedValue);
 }
  formBody = formBody.join("&");


      fetch(baseurl.uatbaseurl + 'register/active',
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
                    alert(responseJson.message)
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
      
      <View style={{ flex: 1, padding: 30, backgroundColor: '#f5fcff' }}>
        <ScrollView  
        showsVerticalScrollIndicator={false}
        >
       <KeyboardAvoidingView behavior="position" enabled >
       <StatusBar backgroundColor="blue" barStyle="light-content" /> 
      
       <Image 
    style={styles.logo}
    source={require('./../../assets/images/logo/logo.png')}></Image>

{this.state.fontLoaded ? (      <Text style={styles.hello}>{i18n.t('hello_nice_to_meet_you')}</Text>  ) : null }
           {this.state.fontLoaded ? (                  <Text style={styles.moving}>{i18n.t('keep_moving_with_sitgo')}</Text>   ) : null }

                            <View style={styles.v1}>

                                        <View style={{flexDirection:'column'}}>
                                                    
                                        {this.state.fontLoaded ? (        <Input
                                         placeholder='Firs Name'
                                        style={{fontFamily:'opreg'}}
                                                        label={i18n.t('first_name')}
                                                        value={this.state.fname}
                                                        returnKeyType="next"
                                                        onChangeText={this.handleTextChange}
                                                        ></Input>  ) : null }

                                                {/* <View
                                                style={{
                                                  padding:2 ,
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1,
                                                }}
                                                /> */}


                                        </View>


                                    <View style={{flexDirection:'column'}}>

                                                <Input
                                                label={i18n.t('Last_name')}
                                                value={this.state.lname}
                                                onChangeText={this.handleTextChange1}
                                                />

                                                {/* <View
                                                style={{
                                                  padding:2 ,
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1,
                                                }}
                                                /> */}
                                    </View>

                                   

                            </View>

                            <View style={{marginTop:30}}>

                                     <Input
                                              style={{width:'100%',paddingRight:100}}
                                            label={i18n.t('email')}
                                            value={this.state.email}
                                            onChangeText={this.handleemail}
                                            />

                                              {/* <View
                                                style={{
                                                  padding:2 ,
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1,
                                                }}
                                                /> */}


                            </View>

                            <View style={styles.v2}>

                                              <View style={{flexDirection:'row'}}>
                                                          
                                                          <Text>{i18n.t('mobile_number')}</Text>

                                                          {this.state.fontLoaded ? (    <TextInput style={{fontFamily:'opreg' }}
                                                          editable={false}>+92</TextInput>  ) : null }
                                                    {/* <View
                                                      style={{
                                                        width:100 ,
                                                        padding:2 ,
                                                          borderBottomColor: 'black',
                                                          borderBottomWidth: 1,
                                                      }}
                                                        /> */}

<Input
                                                      maxLength ={11}
                                                      label={i18n.t('mobile_number')}
                                                      keyboardType='numeric'
                                                      value={this.state.number}
                                                      onChangeText={this.handlnumber}
                                                      />

                                              </View>


                                              <View style={{flexDirection:'column' , marginTop:3}}>

                                                     

                                                      {/* <View
                                                      style={{
                                                        padding:2 ,
                                                          borderBottomColor: 'black',
                                                          borderBottomWidth: 1,
                                                      }}
                                                        /> */}
                                              </View>

                                             



                                  </View>

                                  <View style={{marginTop:30}}>

                                          <Input
                                        secureTextEntry={true}
                                                label={i18n.t('password')}
                                                value={this.state.password}
                                                onChangeText={this.handlepassword}
                                                />

                                                  {/* <View
                                                    style={{
                                                      padding:2 ,
                                                        borderBottomColor: 'black',
                                                        borderBottomWidth: 1,
                                                    }}
                                                    /> */}


                                  </View>
                                  </KeyboardAvoidingView>

                                  <View style={{alignItems:'center'}}>
                                    <TouchableOpacity 
                                    // onPress={() => this.props.navigation.navigate('OTP')}
                                    onPress={() => this.registerbtn()}
                                    style={styles.loginbtn}>
                                    <Text style={styles.logintext}>{i18n.t('register_Now')}</Text>
                                    </TouchableOpacity>
                                  </View>


                                  <TouchableOpacity 
                        onPress={()=> this.props.navigation.navigate('LOGIN')}  >

{this.state.fontLoaded ? (   <Text style={{alignSelf:'center' , fontSize:15 ,  marginBottom:40 , fontFamily:'opreg' , marginTop:5}}>{i18n.t('already_have_an_account?_signin')}</Text>) : null }
                        </TouchableOpacity>

                        <TouchableOpacity 
                        onPress={()=> this.sendPushNotificaiton()}  >

{this.state.fontLoaded ? (   <Text style={{alignSelf:'center' , fontSize:15 ,  marginBottom:40 , fontFamily:'opreg' , marginTop:5}}>send notificaiton</Text>) : null }
                        </TouchableOpacity>

                                  
                                  </ScrollView>
                                  <Loading ref='loading2'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   logo:{
     alignSelf:'center' ,
       marginTop:50
   },
   hello:{
       marginTop:10 ,
    fontSize:15 ,
    color:'black',
    fontFamily:'opreg' 
}  ,
moving:{
    fontSize:25 ,
    color:'black' ,
    fontWeight:"400" ,
    fontFamily:'opreg' 
},
v1:{
    marginTop:20 ,
    flexDirection:'row' ,
    justifyContent:'space-between'
} ,
v2:{
  marginTop:30 ,
  flexDirection:'row' ,
},
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
 
  height:50 ,
  width:'50%' , 
  marginRight:5 ,
  backgroundColor:'#C62930' ,
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

tocenterview:{ 
  flex: 1,
   alignItems: 'center'
, justifyContent: 'center'
} ,
   
  });