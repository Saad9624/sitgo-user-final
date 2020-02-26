import React from 'react';
import { View, Text , Image , ImageBackground , StyleSheet ,
TextInput ,
TouchableOpacity,
Dimensions,
StatusBar,
Keyboard ,AsyncStorage ,
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
        CardNumber : '' ,
        MobileNumber : '',
        OtpNumber1 :'' ,
        OtpNumber2 :'' ,
        OtpNumber3 :'' ,
        OtpNumber4 :'' ,
        fontLoaded: false,
        code:'' ,
        lang:'' ,
      
    };

    componentWillMount(){
      const otpcode = this.props.navigation.state.params.CODE 
      this.setState({
        code : otpcode
      })
     
      console.log("otpCODE" , otpcode)

      this.getLanguage()
    }


    async componentDidMount() {
      await Font.loadAsync({
        'opreg': require('./../../assets/fonts/opreg.ttf'),
      });
  
      this.setState({ fontLoaded: true });
    }
    onTextChange = text => {
        this.setState({OtpNumber1 : text});
        if(text.length == 1){
          this.input2.focus()
        }
     }
     onTextChange1 = text => {
      this.setState({OtpNumber2 : text});
      if(text.length == 1){
        this.input3.focus()
      }
   }
   onTextChange2 = text => {
    this.setState({OtpNumber3 : text});
    if(text.length == 1){
      this.input4.focus()
    }
  }
  onTextChange3 = text => {
    this.setState({OtpNumber4 : text});
    if(text.length == 1){
      Keyboard.dismiss()
    }
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

  checkifempty =() =>{
    if (this.state.OtpNumber1 != '') {
      if(this.state.OtpNumber2 != ''){
        if(this.state.OtpNumber3 != ''){
          if(this.state.OtpNumber4!= ''){
            this.otpService(this.state.code) 
          }
          else{
            alert('Please Enter Complete OTP');
          }
        }
        else{alert('Please Enter Complete OTP');}
      }
      else{alert('Please Enter Complete OTP');}
      
      } else {
        alert('Please Enter Complete OTP');
      }


};

  otpService = async (code) => {
    this.refs.loading2.show() ;


    console.log('code :', code) ;
   
  
    try{
    
        console.log("otp_try" , "under otp_try")

//         var details = {
               
//          "code" : code
//  };
 
//  var formBody = [];
//  for (var property in details) {
//    var encodedKey = encodeURIComponent(property);
//    var encodedValue = encodeURIComponent(details[property]);
//    formBody.push(encodedKey + "=" + encodedValue);
//  }
//   formBody = formBody.join("&");

  
      fetch(baseurl.uatbaseurl + 'register/activeaccount',
      {
       
        method: 'POST',
           headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
          },
        

        body: `code=${code}`
  
       })
   
   

       .then((response) => response.json())
       
              .then((responseJson) => {
               
                   console.log('response object: ',responseJson)
                 


                   if(responseJson.responcecode == '001' ){
                    this.refs.loading2.close() ;
                    this.props.navigation.navigate('CONFIRM_PASSWORD' ,{
                        UID:  responseJson.userdetails.id
                    })

                                     }
                  else {
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
<Image 
   style={{alignSelf:'center', marginTop:100}}
   source={require('./../../assets/images/logo/logo.png')}></Image>
          
                    <View style={styles.bottmcontainer}> 
                    {this.state.fontLoaded ? (        <Text style={styles.t1}>{i18n.t('phone')}</Text>) : null }
                      {this.state.fontLoaded ? (         <Text style={styles.t2}>{i18n.t('optcode')}</Text>) : null }

                            <View style={styles.v1}>
                            <View style={{alignSelf:'center',flexDirection:'row' ,marginTop:20}}>

                            <TextInput secureTextEntry={true} ref={input1 => this.input1 = input1} onSubmitEditing={() => this.input2.focus()} textAlign={'center'} onChangeText={this.onTextChange} maxLength={1} keyboardType = 'numeric' style={{width: 62.5,borderBottomColor:'#FF4500' , borderBottomWidth : 1 , marginRight:5 }} >{this.state.OtpNumber1}</TextInput>
            <TextInput  secureTextEntry={true} ref={input2 => this.input2 = input2} onSubmitEditing={() => this.input3.focus()} textAlign={'center'}  onChangeText={this.onTextChange1} maxLength={1} keyboardType = 'numeric' style={{width: 62.5 ,borderBottomColor:'#FF4500' , borderBottomWidth : 1  , marginRight:5 , alignSelf:'center'}} >{this.state.OtpNumber2}</TextInput>
            <TextInput secureTextEntry={true}  ref={input3 => this.input3 = input3} onSubmitEditing={() => this.input4.focus()} textAlign={'center'}  onChangeText={this.onTextChange2} maxLength={1} keyboardType = 'numeric' style={{width: 62.5 ,borderBottomColor:'#FF4500' , borderBottomWidth : 1  , marginRight : 5 , alignSelf:'center'}} >{this.state.OtpNumber3}</TextInput>
            <TextInput secureTextEntry={true}  ref={input4 => this.input4 = input4} textAlign={'center'}  onChangeText={this.onTextChange3}maxLength={1} keyboardType = 'numeric' style={{width: 62.5 ,borderBottomColor:'#FF4500' , borderBottomWidth : 1  , alignSelf:'center'}} >{this.state.OtpNumber4}</TextInput>
     
           
                           
                            </View>
                           

                           
                           
                            </View>

                            {this.state.fontLoaded ? (     <Text style={styles.t3}>{i18n.t('resendcode')}</Text>) : null }


                            <TouchableOpacity
                            style={{borderColor:'#103056' , marginLeft:10 , marginTop:100, borderRadius:4 , height:50  , backgroundColor:'#103056'}}
                            onPress={() => this.checkifempty()} >
                  {this.state.fontLoaded ? (             <Text style={{fontFamily:'opreg' ,color:'white' , alignItems:'center' , fontSize:20 , alignSelf:'center' , marginTop:10 , justifyContent:'center'}}>{i18n.t('next')}</Text>) : null }


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
bottmcontainer:{
    marginLeft:20 ,
     marginRight:20 ,
     bottom:0 , 
     position :'absolute' ,
flex:1 ,
marginBottom:100
},
t1:{
    fontSize:15 ,
    fontWeight:'600' ,
    fontFamily:'opreg' 
} ,
t2:{
    fontSize:25 ,
    fontWeight:'800' ,
    fontFamily:'opreg' 
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