import React from 'react';
import MapView from 'react-native-maps';
import { View , Text, Button , NetInfo, Image ,
    Alert ,  TouchableOpacity,ImageBackground , StyleSheet , Share ,StatusBar ,
    Dimensions  ,
     ActivityIndicator , Platform,AppState, AsyncStorage,BackHandler} from 'react-native';

     import Modal from 'react-native-modal';

import baseurl from './../components/baseurl' ;



export default class movingbus extends React.Component {

  intervalID = 0;

    static navigationOptions = {
        header:  null
    }

    state = {
      latitude : 0 , 
      longitude : 0 , 
     visibleModal: null,
     today_date:0 ,
     appState: AppState.currentState,
     BUSID:'' ,
     time:'' ,
     DATE:'' ,
     mylat : 0 ,
     mylong:0 ,
     USERID:''
    }

    constructor(props){
      super(props);
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
     
    }

    // componentDidMount() {
    //   AppState.addEventListener('change', this._handleAppStateChange);
    // }


     async componentWillMount(){
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  
      //AppState.removeEventListener('change', this._handleAppStateChange);
      var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year

      var todaydate = year +"-"+month + "-" + date ;

      this.setState({
        today_date: todaydate
      })


      console.log("current date" , todaydate  )

      this.start_ride()

   
    
    
         const  busid = this.props.navigation.state.params.BUSID
         const  time = this.props.navigation.state.params.TIME
         const  date1 = this.props.navigation.state.params.DATE
         const userid = await AsyncStorage.getItem('USERID')
        console.log("busid" ,  busid)
        console.log("time" ,  time)
        console.log("date" ,  date1)
        console.log("userid" ,  userid)
    
        this.setState({
          time:time ,
          BUSID:busid  , 
          DATE: date1 ,
          USERID:userid
        })
    
      
    }

    componentWillUnmount() {
      BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
    }
    
    handleBackButtonClick() {
      this.stop_updating()
      return true;
    } 
    

  
      async componentDidMount(){

      this.getstoredata()
      
    }


    getstoredata= async () => {
      const busid = await AsyncStorage.getItem('BUSID')
      console.log("busid on track bus" , busid)
      this.setState({
        BUSID:busid

      })
    }

    checkinternet=() => {
        NetInfo.getConnectionInfo().then(connectionInfo => {
            if(connectionInfo.type  == 'none'){
              this.checklogin()
            } 
            else{
              
                this.get_updated_data()
            }
        
          });
    }

   start_ride = () => {
    this.intervalID = setInterval(()=> this.checkinternet(), 10000)
   }

   stop_updating = () => {
     console.log("ride stopped")
    
    
      if(this.intervalID != undefined) { 
        clearInterval(this.intervalID);
        this.intervalID = undefined;
      }
      this.props.navigation.navigate('MAP')

      
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

    
    get_updated_data = async () => {
     
      try{
      
          console.log("get_updated_data" , "under get_updated_data")
  
          var details = {
        
            
            "bus_id" : this.state.BUSID ,
            "date"  : this.state.DATE   ,  
            'time' : this.state.time       ,
            'user_id' :this.state.USERID ,
            
   };
   
   var formBody = [];
   for (var property in details) {
     var encodedKey = encodeURIComponent(property);
     var encodedValue = encodeURIComponent(details[property]);
     formBody.push(encodedKey + "=" + encodedValue);
   }
    formBody = formBody.join("&");
  
  
        fetch(baseurl.uatbaseurl + 'booking/track',
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

                        const result = responseJson.result 
                        this.setState({
                                longitude : parseFloat(result.lang) ,
                                latitude : parseFloat(result.lat)
                        })
                      console.log("lang" , result.lang)
                      console.log("lat" , result.lat)
                     
                    }
                    else if(responseJson.responcecode == '101' ){
                      
                      console.log("101" , responseJson.message)

                    
                    }
                    else{
                    
                     // alert(responseJson.message)
                    }
                })
                .catch((error) => {
                console.error(error);
                });
  
        
      }
      catch(e){     
        console.log("catch" , e)
        
      }
  
  
  
  } 

  
getlocation=()=> {
    NetInfo.getConnectionInfo().then(connectionInfo => {
      if(connectionInfo.type  == 'none'){
        this.checklogin()
      } 
      else{
        navigator.geolocation.getCurrentPosition(
          ({
            coords:
            {
              latitude , longitude}}) =>this.setState({latitude , longitude}))
  
              if(this.state.latitude){
                //this.SEND_DATA()
                console.log("location"  ,  this.state.latitude , this.state.latitude)
              }
              else{
                console.log("Error fetching current location")
              }
          
          
      }
  
    });
  }
    
  render() {
    const {latitude , longitude} = this.state


    if(latitude){
      return(
      

          <View style={{flex:1}}>
                                     <View style={{flexDirection:'row' , marginTop:30}}>
                                          <TouchableOpacity
                                                  onPress={() => this.stop_updating()}>
                                                                              <Image source={require('./../assets/images/backbtn/back.png')}
                                                                                      style={styles.burger}>
                      
                                                                              </Image>
                                                                          </TouchableOpacity>
  
                                                                          {/* <Text style={styles.h1}>50 min left</Text> */}
  
                              
                                     </View>
  
                                     
                             
         
                                      <MapView
                                      // zoomEnabled={true}
                                                           
                                      // showsUserLocation={true}
                                      // showsCompass={true}
  
                                          style={{ flex: 1 }}
                                          // initialRegion={{
                                          //  latitudeDelta: 0.001,
                                          //   longitudeDelta: 0.001,
                                          // }}
                                          initialRegion={{
                                          latitude:24.8607 ,
                                          longitude:67.0011,
                                          latitudeDelta: 0.001,
                                          longitudeDelta: 0.001,
                                          }}
                                      >
                                      <MapView.Marker
                                      image={require('./../assets/images/bus/bus.png')}
                                      coordinate={{latitude: this.state.latitude,
                                          longitude: this.state.longitude,}}
                                      title={"driver"}
                                      
                                      />
                                      </MapView>
  
  
        </View>
      
      )
    }
    else{
      return(
                <View>
                                          <View style={{flexDirection:'row' , marginTop:30}}>
                                                  <TouchableOpacity
                                                          onPress={() => this.stop_updating()}>
                                                                                      <Image source={require('./../assets/images/backbtn/back.png')}
                                                                                              style={styles.burger}>
                              
                                                                                      </Image>
                                                                                  </TouchableOpacity>

                                                                                  {/* <Text style={styles.h1}>50 min left</Text> */}

                                      
                                            </View>
                                              <View style={{justifyContent:'center' , alignItems:'center'}}>
                                                    <Text style={{fontSize:20,marginTop:50}}>Trip Completed</Text>
                                              </View> 
                </View>
      )
    }
     
  }
}

const styles = StyleSheet.create({
    parent :{
        flex:1 ,
        backgroundColor:'#F5F5F5'
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
alignItems:'center' , 

},
    statusBarBackground: {
        height: (Platform.OS === 'ios') ? 18 : 0,
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
  ho:{
    fontSize:13 ,
    marginTop:5 ,
    marginLeft:70
  } ,
  h2:{
    fontWeight:'bold',
    fontSize:20 ,
    marginLeft:60 , 
    marginTop:5 ,
  },
  title:{marginLeft:15 ,fontWeight:'100' , fontSize:10},

  stopname:{marginLeft:25 , fontSize:15} ,
  
  seats:{marginTop:10 , marginLeft:25 , fontSize:10} ,
  
  viewstyle:{
    marginLeft:25 ,
    marginRight:25 ,
  padding:2 ,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
  },
  MainContainer:
    {
      paddingTop: (Platform.OS === 'ios') ? 20 : 0,
      flex: 1,
      padding: 20,
      marginTop:40 
      
    },

 
    selectedItemsButton:
    {
      
      alignSelf:'center' , 
    
      padding: 10,
      marginTop:10 , 
      borderRadius: 5 ,
      borderWidth:2 , 
      backgroundColor: '#FFFFFF',
      borderColor:'#103056'
     
    },
 
    selectedItemsButton_Text:
    {
      color: '#103056',
      textAlign: 'center',
      alignSelf: 'stretch',
      fontSize: 18
    },
 
    checkedView:
    {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center'
    },
 
    checkBoxImage:
    {
      height: '80%',
      width: '80%',
      tintColor: 'white',
      resizeMode: 'contain'
    },
 
    uncheckedView:
    {
      flex: 1,
      backgroundColor: 'white'
    },
 
    checkBoxLabelText:
    {
      fontSize: 16,
      paddingLeft: 10
    },

    statusBarBackground: {
      height: (Platform.OS === 'ios') ? 18 :Expo.Constants.statusBarHeight, 
       backgroundColor: "#FFFFFF",
    },
    payview1:{width:'100%' , bottom:0 , position:'absolute' ,height:50 , backgroundColor:'#103056'} ,

    payment:{color:'white' , marginLeft:20 , marginTop:15 , fontSize:15} ,
    modalContent: {
        backgroundColor: 'white',
        
        
        borderRadius: 4,
        borderColor: 'rgba(0, 0, 0, 0.1)',
      },
      
      bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
      },

      payment:{color:'white' , marginLeft:20 , marginTop:15 , fontSize:15}
,
payview:{width:'100%'  ,height:50 , backgroundColor:'#103056'},
tocentertext:{ 
  flex:1 ,
  marginRight:20 ,
  marginLeft:20 ,
  flexDirection:'row' ,
   alignItems: 'center'
, justifyContent: 'space-between'
} ,
loginbtn :{
  marginTop:20,
  marginBottom:10 ,
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
  
    
    