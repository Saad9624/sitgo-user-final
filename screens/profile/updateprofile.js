import React, { Component } from 'react';
import { View, StatusBar, TextInput, Animated  ,Image , StyleSheet ,TouchableOpacity,
  KeyboardAvoidingView ,Platform , AsyncStorage
,Text} from 'react-native';
import * as Font from 'expo-font';
import { ScrollView } from 'react-native-gesture-handler';
import * as Permissions from 'expo-permissions';
import Loading from 'react-native-whc-loading' ;
import en from './../../strings/en.json' ;
import ur from './../../strings/ur.json' ;
import i18n from 'i18n-js';
import si from './../../strings/si.json' ;
import baseurl from '../../components/baseurl.js';

class FloatingLabelInput extends Component {
  state = {
    isFocused: false,
    fontLoaded: false,
    lang:'' ,
    userid:''
  };

  componentWillMount() {
    this._animatedIsFocused = new Animated.Value(this.props.value === '' ? 0 : 1);

    this.getLanguage()
  }

   async componentDidMount() {
        await Font.loadAsync({
          'opreg': require('./../../assets/fonts/opreg.ttf'),
        });
    
        this.setState({ fontLoaded: true });
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

  handleFocus = () => this.setState({ isFocused: true });
  handleBlur = () => this.setState({ isFocused: false });

  componentDidUpdate() {
    Animated.timing(this._animatedIsFocused, {
      toValue: (this.state.isFocused || this.props.value !== '') ? 1 : 0,
      duration: 200,
    }).start();
  }

  render() {
    const { label, ...props } = this.props;
    const labelStyle = {
      position: 'absolute',
      left: 0,
      top: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
      }),
      fontSize: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: [20, 14],
      }),
      color: this._animatedIsFocused.interpolate({
        inputRange: [0, 1],
        outputRange: ['#808080', '#000'],
      }),
    };
    return (
      <View style={{ paddingTop: 18 }}>
        <Animated.Text style={labelStyle}>
          {label}
        </Animated.Text>


    {this.state.fontLoaded ? (     <TextInput
          {...props}
          style={{ width:'100%' ,  height: 26, fontSize: 20, color: '#000',fontFamily:'opreg' }}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          blurOnSubmit
        /> ) : null }
      </View>
    );
  }
}

export default class updateprofile extends Component {

  async componentWillMount(){
    var user_id = await AsyncStorage.getItem('USERID')
    this.setState({
        userid : user_id
    })
  //  this.acheckMultiPermissions()

  }

  acheckMultiPermissions = async() => {
    console.log("permisiioons")
    // const { status, expires, permissions } = await Permissions.getAsync(
    //   Permissions.CAMERA,
    //   Permissions.CAMERA_ROLL
    // );

    const {status} = await Permissions.askAsync([
      Permissions.CAMERA,
      Permissions.CAMERA_ROLL
  ]);

    if (status !== 'granted') {
      alert('Hey! You heve not enabled selected permissions');
    }
    else{
        alert("yes")  
    }
  }
  
    static navigationOptions ={
        header: null
    }

    
  state = {
    licenseno: '',
    validvehiceltype:'' ,
    issueddate:'' ,
    expirydate:'',

    fontLoaded: false,
    imagepath : '' ,
    image:'http://www.jennybeaumont.com/wp-content/uploads/2015/03/placeholder.gif' , 
  };

  async componentDidMount() {
    await Font.loadAsync({
      'opreg': require('./../../assets/fonts/opreg.ttf'),
    });

    this.setState({ fontLoaded: true });
  }

  _pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      base64 : true ,
  
      allowsEditing: true,
      aspect: [4, 3],
    });

    //console.log("imagepath" , result.base64);
    console.log("imagepath" , result.uri);

   //this.signupcallwihtimage( result.base64)

    this.setState({
        imagepath: result.base64
    })

    if (!result.cancelled) {
        this.setState({ image: result.uri});
       alert("image selected")
      }

      else{
          alert("No image selected")
      }

    };

  handlelicensenum = (newText) => this.setState({ licenseno: newText });
  handle_vehicletype = (newText) => this.setState({ validvehiceltype: newText });
 
 


  updatebtn = async () => {
    
    this.refs.loading2.show() ;

    var licenseno = this.state.licenseno ;
    var validvehiceltype = this.state.validvehiceltype ;

    
    
    if(licenseno != '' && validvehiceltype != ''){

   
    this.updateprofile_Service(licenseno , validvehiceltype)
    }
    else{
      //this.registrationService()
      this.refs.loading2.close() ;
       alert("Fields cannot be empty")
    }
  }

  updateprofile_Service = async (licenseno , validvehiceltype) => {


    console.log('licenseno :', licenseno) ;
    console.log('validvehiceltype :', validvehiceltype) ;
 
    
    try{
    
        console.log("try" , "under try")

        var details = {
               
         "user_id" : this.state.userid  ,
          "name"  : licenseno   ,
          "email"     : validvehiceltype   ,
          "image"      :   ''             ,
          
         
 };
 
 var formBody = [];
 for (var property in details) {
   var encodedKey = encodeURIComponent(property);
   var encodedValue = encodeURIComponent(details[property]);
   formBody.push(encodedKey + "=" + encodedValue);
 }
  formBody = formBody.join("&");


      fetch(baseurl.uatbaseurl + 'user/update',
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
                    AsyncStorage.setItem("UN" ,responseJson.userdetails.name )
                    AsyncStorage.setItem("EMAIL" ,responseJson.userdetails.email )
                   this.props.navigation.navigate('MAP')
                   // this.regcode(responseJson.message , responseJson.userdetails.activationcode)
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

    let image  ={ uri: this.state.image};
    return (
      
      <View style={{ flex: 1}}>
      <View style={styles.statusBarBackground}></View>
                <StatusBar hidden={false} />
                        <StatusBar barStyle={'dark-content'} backgroundColor ={'#FFFFFF'} translucent={true} /> 

                        <View style={{ flexDirection: 'row', backgroundColor:'#ffffff' ,height:60 }}>
                                        <TouchableOpacity 
                                                        onPress={() => this.props.navigation.goBack()}
                                                        >

                                                        <Image style={{marginTop:15 ,  marginLeft:25}} source={require('./../../assets/images/backbtn/back.png')}></Image>

                                                        </TouchableOpacity>

                                                            <View style={{flexDirection:'column' , marginLeft:25}}>
                                                            {this.state.fontLoaded ? (  <Text style={{fontSize:25 , marginTop:10 , fontFamily:'opreg'}}>Update profile</Text>) : null }
                                                        
                                                            </View>
                              </View>

          
        <ScrollView style={{marginLeft:20, marginRight:20 ,  backgroundColor: '#f5fcff' }}>
                   <KeyboardAvoidingView behavior="position" enabled >
      
                            
                            

                                    {/* <Image 
                                    style={{alignSelf:'center'}}
                                    source={require('./../../assets/images/nic/nic.png')}></Image> */}


{image &&
              <Image 
              // source={image} 
              source = {{ uri: this.state.image }}
                  
                   style={{alignSelf:'center'}} />}

                                  
                                                                   


                                <View style={{marginTop:30}}>

                                        <FloatingLabelInput
                                            label={"Enter name"}
                                            value={this.state.licenseno}
                                            onChangeText={this.handlelicensenum}
                                            />

                                                <View
                                                style={{
                                                    padding:2 ,
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1,
                                                }}
                                                />


                                        </View>

                            <View style={{marginTop:30}}>

                                     <FloatingLabelInput
                                            label={"Enter Email"}
                                            value={this.state.validvehiceltype}
                                            onChangeText={this.handle_vehicletype}
                                            />

                                              <View
                                                style={{
                                                  padding:2 ,
                                                    borderBottomColor: 'black',
                                                    borderBottomWidth: 1,
                                                }}
                                                />


                            </View>

                           


                                  
                                  </KeyboardAvoidingView>

                                  <View style={{alignItems:'center'}}>
                                    <TouchableOpacity 
                                     onPress={() => this.updatebtn()}
                                    style={styles.loginbtn}>
                                    <Text style={styles.logintext}>{i18n.t('update')}</Text>
                                    </TouchableOpacity>
                                  </View>

                                  
                                  </ScrollView>
                                  <Loading ref='loading2'/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
   logo:{
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
    fontWeight:'bold' ,
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
  justifyContent:'space-between'
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
  marginTop:50,
  marginBottom:40 ,
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
statusBarBackground: {
    height: (Platform.OS === 'ios') ? 18 : Expo.Constants.statusBarHeight, 
          backgroundColor: "#FFFFFF",
  },
   
  });