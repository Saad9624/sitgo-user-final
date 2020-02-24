import React from 'react';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Marker from 'react-native-maps';
import { BackHandler  , TouchableOpacity ,StatusBar 
    ,ActivityIndicator, Image , TextInput , ImageBackground  , Platform , NetInfo , Alert} from 'react-native';


import {
  View,
  Text,
  StyleSheet,
  Button,
  LATITUDE,
  LONGITUDE,
  LATITUDE_DELTA,
  LONGITUDE_DELTA,
} from "react-native";

export default class testingformarkers extends React.Component {

    static navigationOptions= {
        header :null
    }

  constructor() {
      super();
      this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
      this.state = {
        region: {
            stoparray:[] , 
          latitude: 0,
          longitude: 0,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
          title : '' ,
          description:''
        },
        markers: [],
        loaded: false  ,
        visible : false ,

      }

    }

    componentWillMount() {
        this.get_all_stop_call()
      BackHandler.addEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButtonClick);
  }
  
  handleBackButtonClick() {
    this.props.navigation.goBack()
    return true;
  } 

  _toggleBottomNavigationView = () => {
     
    this.setState({ visible: !this.state.visible });
  };

//   componentWillMount(){
//       this.getLocationsforHospital()
//   }

  componentDidMount(){
    this.setState({
                  region: {
                    latitude: 0,
                    longitude: 0,
                    latitudeDelta: 0.1,
                    longitudeDelta: 0.1,
                  }
                });
  }

    // componentDidMount() {
    //   NetInfo.getConnectionInfo().then(connectionInfo => {
    //     if(connectionInfo.type  == 'none'){
    //       this.checklogin()
    //     } 
    //     else{
    //       navigator.geolocation.getCurrentPosition(
    //         (position) => {
    //         console.log(position);
    //           this.setState({
    //             region: {
    //               latitude: position.coords.latitude,
    //               longitude: position.coords.longitude,
    //               latitudeDelta: 0.1,
    //               longitudeDelta: 0.1,
    //             }
    //           });
    //         },
    //         (error) => this.setState({ error: error.message }),
    //        { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
    //       );

         
    //     }
        
    //     console.log(
    //       'Initial, type: ' + connectionInfo.type + ', effectiveType: ' + connectionInfo.effectiveType
    //     );
    //   });

    // }

    
    handleMarkerPress(event) {
        //const markerID = event.nativeEvent.id
        console.log("onclick" , event)

        if(event == 'Stop1'){
            this.props.navigation.navigate('list_of_stop_buses' , {
                STOPID : '1' 
            })
        }
        
      }
    

    get_all_stop_call = async ()=> {
        this.setState({
            isLoading:true
          })
    
        try{
          

          let response = await fetch('https://hitsofficialpk.com/sitgo/stops/all?city=Karachi') 

          const completeresponse =  await response.json()
          var markers = [];
          console.log("response " , completeresponse)
          

          const stop = completeresponse.stops
          

          for(var i = 0 ; i< stop.length  ; i++){
            console.log("stops" , stop[i].stopname )
            console.log("stops1" , stop[i].stopid )
            console.log("stops2" , stop[i].latitutte )
            console.log("stops3" , stop[i].longitude )

            var marker = {
                id : stop[i].id , 
                title : stop[i].stopname,
              coordinate: {
                latitude:parseFloat(stop[i].latitutte),
                longitude: parseFloat(stop[i].longitude),
               
              }
            }
            markers.push(marker);
          
        }
        this.setState({
          markers: markers,
          loaded: true,
          isLoading:false
        });

          
        }
        catch(error){

        }

      }

    render() {
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20 , justifyContent:'center'}}>
            <ActivityIndicator  size="large" color="#FF4500"/>
          </View>
        );
      }

    return (
    
      <View style={{flex:1 }}>
        <StatusBar hidden={false} />
                          <StatusBar barStyle={'light-content'} backgroundColor ={'#E14126'} translucent={false} /> 

    
        <View style={styles.container}>
        
           
        <MapView.Animated  
          style={styles.map}
          region={this.state.region}
          provider={PROVIDER_GOOGLE} 
          showsUserLocation={true}
          >

                                      {this.state.markers.map((marker, index) => 
                                              ( <MapView.Marker
                                                onPress={() => this.handleMarkerPress(marker.title)}
                                                key={index} coordinate={marker.coordinate} 
                                                 title = {marker.title} description = {marker.description}
                                              /> ))}


                                              
        </MapView.Animated>
        </View>
        </View>
      );
    }
  }

  


  const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#ecf0f1',
    },
    map: {
      width: "100%",
      height: "100%",
      
    },
    loginScreenButton:{
      alignSelf:'center' , 
      width:'60%' , 
      alignItems:'center',
      justifyContent:'center' ,
    
    marginTop:10,
      paddingTop:10,
      paddingBottom:10,
      backgroundColor:'#FF4500',
      borderRadius:5,
      borderWidth: 1,
      borderColor: '#fff'
    },
    loginText:{
        color:'white',
        textAlign:'center',
        paddingLeft : 10,
        paddingRight : 10
    },
    MainContainer: {
      flex: 1,
      margin: 2,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: Platform.OS === 'ios' ? 20 : 0,
      backgroundColor: '#ffffff',
    },
    bottomNavigationView: {
      backgroundColor: '#fff',
      width: '100%',
      height: 250,
      
    },
  })