import React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View , Text, Button , NetInfo, Image ,
  Alert ,  TouchableOpacity,ImageBackground , StyleSheet , Share ,StatusBar ,
  Dimensions  ,
   ActivityIndicator , Platform, AsyncStorage} from 'react-native';
import { BackHandler } from 'react-native';
import * as Font from 'expo-font';
import baseurl from './../components/baseurl';




export default class currentloc extends React.Component {

    static navigationOptions = {
        header:  null
    }
   
    constructor(props){
        super(props);
         this.state= {
          markers: [],
           uname:'' ,
          fontLoaded: false,
            latitude : 0 , 
            longitude : 0, 
            
            visible : false ,
        
        
        };
      }



      componentWillMount(){
        this.get_all_stop_call()

        this._getStorageValue()
        
        
      }

      async _getStorageValue(){
        var USERNAME = await AsyncStorage.getItem('UN')
        console.log("username" , USERNAME)
        this.setState({
          uname : USERNAME
        })
       
      }
     
       async componentDidMount() {
     
        await Font.loadAsync({
          'opreg': require('./../assets/fonts/opreg.ttf'),
        });
    
        this.setState({ fontLoaded: true });

        NetInfo.getConnectionInfo().then(connectionInfo => {
          if(connectionInfo.type  == 'none'){
            this.checklogin()
          } 
          else{
            navigator.geolocation.getCurrentPosition(
              ({coords:
                {latitude , longitude}}) =>this.setState({latitude , longitude}))
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
          
          console.log("Stops length" , stop.length)

          for(var i = 0 ; i< stop.length  ; i++){

            // console.log("stops" , stop[i].stopname )
            // console.log("stops1" , stop[i].stopid )
            // console.log("stops2" , stop[i].latitutte )
            // console.log("stops3" , stop[i].longitude )

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

  

        const {latitude , longitude} = this.state
  
  
        if(latitude){
          return ( 
              
            <View style={styles.parent}>  
              <View style={{flex:1}}>
                                <View style={{flexDirection:'row' , marginTop:30}}>
                                        <TouchableOpacity
                                                onPress={() => this.props.navigation.openDrawer()}>
                                                                            <Image source={require('./../assets/images/burger/burger.png')}
                                                                                    style={styles.burger}>
                    
                                                                            </Image>
                                                                        </TouchableOpacity>

                   {this.state.fontLoaded ? (           <Text style={styles.h1}>Good Morning  {this.state.uname},</Text>) : null }

                            
                                   </View>

                        
               
                                                        <MapView 
                                                         zoomEnabled={true}
                                                         
                                                         showsUserLocation={true}
                                                         showsCompass={true}
                                                         
                                                         style={{flex:1}}
                                                         initialRegion={{
                                                           latitude ,
                                                           longitude ,
                                                           latitudeDelta: 0.09,
                                                           longitudeDelta: 0.09,
                                                         }}
                                                       >
                                        
                                    
                                        {this.state.markers.map((marker, index) => 
                                              ( <MapView.Marker
                                                // onPress={() => this.handleMarkerPress(marker.title)}
                                                key={index} coordinate={marker.coordinate} 
                                                 title = {marker.title} description = {marker.description}
                                              /> ))}

                                        </MapView>

              </View>
              </View>
             
          );
        }
        else{
return(
  <View style={{justifyContent:'center', alignItems: 'center', flex: 1}}>
    <Text>Loading...</Text>
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
  fontFamily:'opreg'
} ,
h2:{
fontWeight:"700" , 
  fontSize:20 ,
  marginLeft:60 , 
  marginTop:5 ,
  fontFamily:'opreg'
},
title:{marginLeft:15 ,fontWeight:'100' , fontSize:10 ,fontFamily:'opreg'},

stopname:{marginLeft:25 , fontSize:15 ,fontFamily:'opreg'} ,

seats:{marginTop:10 , marginLeft:25 , fontSize:10 ,fontFamily:'opreg'} ,

viewstyle:{
  marginLeft:25 ,
  marginRight:25 ,
padding:2 ,
  borderBottomColor: 'black',
  borderBottomWidth: 1,
}
 
});

  
  