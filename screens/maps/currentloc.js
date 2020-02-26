import React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View , Text, Button , NetInfo, Image ,
  Alert ,  TouchableOpacity,ImageBackground , StyleSheet , Share ,StatusBar ,
  Dimensions  ,
   ActivityIndicator , Platform, AsyncStorage} from 'react-native';
import { BackHandler } from 'react-native';
import * as Font from 'expo-font';
import baseurl from '../../components/baseurl';

import en from './../../strings/en.json' ;
import ur from './../../strings/ur.json' ;
import si from './../../strings/si.json' ;
import i18n from 'i18n-js';
import Loading from 'react-native-whc-loading' ;


export default class currentloc extends React.Component {

    static navigationOptions = {
        header:  null ,
        gesturesEnabled: false,
    }
   
    constructor(props){
        super(props);
         this.state= {
          markers: [],
           uname:'' ,
          fontLoaded: false,
            latitude : 0 , 
            longitude : 0, 
            lang:'' ,
            visible : false ,
            destination:'' ,
            fetching:true  ,
            touch : true
 
        
        
        };
      }



      componentWillMount(){
        // const lang = this.props.navigation.state.params.lang 
        // if(lang == null || lang == ''){
        //   console.log("not found" , "not found")
        // }
        // else{
        //   console.log("langparam" , lang)
        // }
        this.checkinternet()
       // this.get_all_stop_call()

        this._getStorageValue()
        
        this.getLanguage()
      }


      getcurrentLocation = (latitude,longitude) => {

        fetch('https://maps.googleapis.com/maps/api/geocode/json?address=' + latitude + ',' + longitude + '&key=AIzaSyB-xXKsLmwxC6-pPESRf3hZXzFrD2wHIzk')
        .then((response) => response.json())
        .then((responseJson) => {

          console.log('ADDRESS GEOCODE is BACK!! => ' , responseJson);

           if(responseJson.results[0].address_components[3]){
            console.log('ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson.results[0]));
            if(responseJson.results[0].address_components){

              const location2 = responseJson.results[0].address_components[3].long_name ;

              

              if(location2.includes("Karachi") || location2 == 'Karachi City' || location2 == 'Karachi' ){
                console.log("iunder karacahi if ")
                this.get_all_stop_call('Karachi')
              }

              else if(location2.includes("Hyderabad") || location2 == 'Hyderabad City' || location2 == 'Hyderabad'){
                console.log("iunder Hyderabad if ")
                this.get_all_stop_call('Hyderabad')
              }
              else{
                console.log("iunder karacahi else ")
                this.get_all_stop_call('Karachi')
              }

              this.setState({
                destination:location2
              })

              console.log('location2' , location2)
     }
           }
           

           


           else {

              this.setState({
                fetching:false
              })
              alert("Unable to fetch your location. Please try again after some time!")
              this.props.navigation.navigate('LOGIN')
              
           }

            // const location1 = responseJson.results[0].address_components[4] ;
            // console.log('location1' , location1)
           

            // const location = responseJson.results[0].address_componenets[0].long_name ;
            // console.log('location' , location)
            
})
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
        console.log("username on home" , USERNAME)
        this.setState({
          uname : USERNAME
        })
       
      }
     
       async componentDidMount() {
        console.ignoredYellowBox
        await Font.loadAsync({
          'opreg': require('./../../assets/fonts/opreg.ttf'),
        });
    
        this.setState({ fontLoaded: true });

        console.log("did mount latitud" , this.state.latitude )  

        if(this.state.latitude){
          this.timeoutHandle = setTimeout(()=>{
            console.log("after 5 seconds")
            this.getcurrentLocation(this.state.latitude, this.state.longitude)
       }, 5000);
        }
        else{
          this.timeoutHandle = setTimeout(()=>{
            console.log("after 5 seconds emoty llocation")
            this.getcurrentLocation(24.8607, 67.0011)
       }, 5000);
        }
      
      
      }
      componentWillUnmount(){
        clearTimeout(this.timeoutHandle); 
   }

      checkinternet = () => {
      

        NetInfo.getConnectionInfo().then(connectionInfo => {
          if(connectionInfo.type  == 'none'){
            this.checklogin()
          } 
          else{
            navigator.geolocation.getCurrentPosition(
              ({coords:
                {
                  latitude , longitude}}) =>
                  this.setState({latitude , longitude}))
                
          }
          
        });

        if(this.state.latitude && this.state.longitude){
          console.log("found")
        }
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

      

       handleMarkerPress(event) {
        //const markerID = event.nativeEvent.id
        console.log("onclick" , event)

        this.props.navigation.navigate('ALL_STOPS_LIST')
       
        
      }
    

    get_all_stop_call = async (destination)=> {
        this.setState({
            isLoading:true
          })
    
        try{
          

          let response = await fetch( baseurl.uatbaseurl +`stops/all?city=${destination}&language=${this.state.lang}`) 

          const completeresponse =  await response.json()
          var markers = [];
          console.log("response " , completeresponse)


          if(completeresponse.message == 'No Stop Found'){
            this.setState({
              fetching:false
            })

            alert("No Stop found")
          }
          else{
                        const stop = completeresponse.stops
                      
                        console.log("Stops length" , stop.length)
              
                        for(var i = 0 ; i< stop.length  ; i++){
                            var marker = {
                              id : stop[i].id , 
                              title : stop[i].stopname,
                                  coordinate:
                                   {
                                      latitude:parseFloat(stop[i].latitutte),
                                      longitude: parseFloat(stop[i].longitude),
                                       }
                          }
                          markers.push(marker);
                        
                      }
                      this.setState({
                        markers: markers,
                        loaded: true,
                        isLoading:false ,
                        fetching:false
                      });
          }
        }
        catch(error){
            this.setState({
         
          isLoading:false
        });
        }

      }

      khitohyd = () => {
        this.props.navigation.navigate('ALL_STOPS_LIST')
        console.log("khi to hyd")
      }

      hydtokarachi= () => {
        this.props.navigation.navigate('HYD_TO_KHI_STOPS')
        
        console.log("hyd to khi")
      }
    render() {

  

        const {latitude , longitude,fetching} = this.state
  
  
        if(!fetching){
          // AsyncStorage.setItem('latitude' , latitude)
          // AsyncStorage.setItem('longitude' , longitude)

         // console.log("latitudeassssssd" , latitude)
          // this.getcurrentLocation(latitude , longitude)
          return ( 
              
            <View style={styles.parent}>  
                   <View style={{ height: (Platform.OS === 'ios') ? 0 : 0, backgroundColor: "#ffffff"}}></View>
                    <StatusBar hidden={false} />
                    <StatusBar barStyle={'dark-content'} backgroundColor ={'#FFFFFF'} translucent={true} /> 
              <View style={{flex:1}}>
                                <View style={{flexDirection:'row' , marginTop:20 , height:60}}>
                                        <TouchableOpacity
                                       
                                                onPress={() => this.props.navigation.openDrawer()}>
                                                                            <Image source={require('./../../assets/images/burger/burger.png')}
                                                                                    style={styles.burger}>
                    
                                                                            </Image>
                                                                        </TouchableOpacity>

                   {this.state.fontLoaded ? (           <Text style={styles.h1}>{i18n.t('hello')}  {this.state.uname}</Text>) : null }

                            
                                   </View>

                                   {/* {this.state.fontLoaded ? (  <Text style={styles.h2}>Where are you going?</Text>) : null } */}
                            {/* <ImageBackground 
             style={{width:Dimensions.get('window').width / 100 * 80 
               , alignSelf:'center' , marginTop:10 , padding:10}}
             source={require('./../../assets/images/whiteback/whiteback.png')}>


                                 <View style={{flexDirection:'row'}}>
                                        <Image 
                                        style={{marginTop:5
                                        }}
                                        source={require('./../../assets/images/reddot/red.png')}></Image>

{this.state.fontLoaded ? (                  <Text style={styles.title}>From Bus Stop</Text>) : null }
                                </View>  

                                <View style={{flexDirection:'row'}}>
                                       <Image
                                          style={{marginLeft:2  ,marginTop:5}} 
                                        source={require('./../../assets/images/greydots/grey.png')}></Image>

{this.state.fontLoaded ? (                        <Text style={styles.stopname}>Johar Chorangi</Text> ) : null }

                                </View> 
                              
                               

                                <View style={{flexDirection:'row' ,marginTop:5}}>
                                        <Image 
                                     
                                        source={require('./../../assets/images/reddot/red.png')}></Image>

{this.state.fontLoaded ? (                    <Text style={styles.title}>Destination Bus Stop</Text>) : null }
                                </View>
                                  
                                {this.state.fontLoaded ? (           <Text style={styles.stopname}>I.I Chundrigar Road</Text> ) : null }



                                  {this.state.fontLoaded ? (           <Text style={styles.seats}>Number of Seats Available</Text>) : null }
                                    {this.state.fontLoaded ? (          <Text style={{marginLeft:25,padding:5}}>2</Text>) : null }
                                <View  style={styles.viewstyle}  />


                                {this.state.fontLoaded ? (            <Text style={styles.seats}>Booking Date</Text>) : null }
                                  {this.state.fontLoaded ? (          <Text style={{marginLeft:25,padding:5}}>09-12-2019</Text>) : null }
                                <View  style={styles.viewstyle}  />

                                {this.state.fontLoaded ? (          <Text style={styles.seats}>Time slot</Text>) : null }
                                  {this.state.fontLoaded ? (         <Text style={{marginLeft:25,padding:5}}>1:00 PM</Text>) : null }
                                <View  style={styles.viewstyle}  />




             </ImageBackground>
              */}

            
               
                                                        <MapView 
                                                         zoomEnabled={true}
                                                         
                                                         showsUserLocation={true}
                                                         showsCompass={true}
                                                         
                                                         style={{flex:1}}
                                                         initialRegion={{
                                                           latitude ,
                                                           longitude ,
                                                           latitudeDelta: 0.098,
                                                           longitudeDelta: 0.098,
                                                         }}
                                                       >
                                        
                                    
                                        {this.state.markers.map((marker, index) => 
                                              ( <MapView.Marker
                                                // onPress={() => this.handleMarkerPress(marker.title)}
                                                key={index} coordinate={marker.coordinate} 
                                                 title = {marker.title} description = {marker.description}
                                              /> ))}

                                        </MapView>

                                        <View style={{ marginBottom:120 ,justifyContent:'center'  }}>

                                                             {this.state.fontLoaded ? (    <Text style={{alignSelf:'center' , fontSize:25 , fontFamily:'opreg' , marginBottom:30 , marginTop:10}}>{i18n.t('where_to')}</Text>) : null }
                                                      
                                                                  <View style={{flexDirection:'row' }}>

                                                                            <TouchableOpacity
                                                                           
                                                                            onPress={() => this.khitohyd()}
                                                                            style={{backgroundColor:'white' ,padding:10,left:0 , position:'absolute' , marginLeft:20 , flexDirection:'column' , justifyContent:'space-between' , borderColor:'#C62930' , borderWidth:1 , borderRadius:5}}>
                                                                                  {this.state.fontLoaded ? (    <Text style={{alignSelf:'center' , fontSize:15 , fontFamily:'opreg'}}>{i18n.t('karachi')}</Text>) : null }
                                                                                  {this.state.fontLoaded ? (    <Text style={{alignSelf:'center' , fontSize:15 , fontFamily:'opreg'}}>{i18n.t('say')}</Text>) : null }
                                                                                  {this.state.fontLoaded ? (    <Text style={{alignSelf:'center' , fontSize:15 , fontFamily:'opreg'}}>{i18n.t('hyd')}</Text>) : null }
                                                                              

                                                                            </TouchableOpacity>

                                                                              <TouchableOpacity
                                                                               
                                                                              onPress={() => this.hydtokarachi()}
                                                                              style={{backgroundColor:'white' ,padding:10,right:0 , position:'absolute' , marginRight:20 , flexDirection:'column' , justifyContent:'space-between' , borderColor:'#103056' , borderWidth:1 , borderRadius:5}}>

                                                                                
                                                                                  {this.state.fontLoaded ? (    <Text style={{alignSelf:'center' , fontSize:15 , fontFamily:'opreg'}}>{i18n.t('hyd')}</Text>) : null }
                                                                                    {this.state.fontLoaded ? (    <Text style={{alignSelf:'center' , fontSize:15 , fontFamily:'opreg'}}>{i18n.t('say')}</Text>) : null }
                                                                                    {this.state.fontLoaded ? (    <Text style={{alignSelf:'center' , fontSize:15 , fontFamily:'opreg'}}>{i18n.t('karachi')}</Text>) : null }
                                                                                  
                                                                                
                                                                              </TouchableOpacity>
                                                                    

                                                                  </View>
                                        </View>
                                     
                                            
                                      
              </View>
              <Loading ref='loading2'/>
              </View>
             
          );
        }
        else{
return(
  <View style={{flex: 1}}>
                    <View style={{ height: (Platform.OS === 'ios') ? 0 : 0, backgroundColor: "#ffffff"}}></View>
                    <StatusBar hidden={false} />
                    <StatusBar barStyle={'dark-content'} backgroundColor ={'#FFFFFF'} translucent={true} /> 

                                    <View style={{flexDirection:'row' , marginTop:20 , height:60}}>
                                                                      <TouchableOpacity
                                                                      //onPress={() => this.props.navigation.openDrawer()}  
                                                                      >
                                                                            <Image source={require('./../../assets/images/burger/burger.png')}
                                                                                    style={styles.burger}>
                    
                                                                            </Image>
                                                                        </TouchableOpacity>

                                                                         {this.state.fontLoaded ? (           <Text style={styles.h1}>{i18n.t('hello')}  {this.state.uname}</Text>) : null }

                            
                                   </View>

                    <View style={{alignItems:'center' , alignContent:'center' , justifyContent:'center',flex:1}}>

                              <Text style={{alignSelf:'center', marginTop:30 ,fontSize:20,color:'red'}}>Finding Bus stops...</Text>
                              <ActivityIndicator size="large" color="red" style={{marginTop:20}} />
                    </View>
                  
                             <View style={{ marginBottom:120 ,justifyContent:'center'  }}>

                                                  {this.state.fontLoaded ? (    <Text style={{alignSelf:'center' , fontSize:25 , fontFamily:'opreg' , marginBottom:30 , marginTop:10}}>{i18n.t('where_to')}</Text>) : null }

                                                  <View style={{flexDirection:'row' }}>

                                                            <TouchableOpacity
                                                           // onPress={() => this.khitohyd()}
                                                            style={{backgroundColor:'white' ,padding:10,left:0 , position:'absolute' , marginLeft:20 , flexDirection:'column' , justifyContent:'space-between' , borderColor:'#C62930' , borderWidth:1 , borderRadius:5}}>
                                                                  {this.state.fontLoaded ? (    <Text style={{alignSelf:'center' , fontSize:15 , fontFamily:'opreg'}}>{i18n.t('karachi')}</Text>) : null }
                                                                  {this.state.fontLoaded ? (    <Text style={{alignSelf:'center' , fontSize:15 , fontFamily:'opreg'}}>{i18n.t('say')}</Text>) : null }
                                                                  {this.state.fontLoaded ? (    <Text style={{alignSelf:'center' , fontSize:15 , fontFamily:'opreg'}}>{i18n.t('hyd')}</Text>) : null }
                                                              

                                                            </TouchableOpacity>

                                                              <TouchableOpacity
                                                             // onPress={() => this.hydtokarachi()}
                                                              style={{backgroundColor:'white' ,padding:10,right:0 , position:'absolute' , marginRight:20 , flexDirection:'column' , justifyContent:'space-between' , borderColor:'#103056' , borderWidth:1 , borderRadius:5}}>

                                                                
                                                                  {this.state.fontLoaded ? (    <Text style={{alignSelf:'center' , fontSize:15 , fontFamily:'opreg'}}>{i18n.t('hyd')}</Text>) : null }
                                                                    {this.state.fontLoaded ? (    <Text style={{alignSelf:'center' , fontSize:15 , fontFamily:'opreg'}}>{i18n.t('say')}</Text>) : null }
                                                                    {this.state.fontLoaded ? (    <Text style={{alignSelf:'center' , fontSize:15 , fontFamily:'opreg'}}>{i18n.t('karachi')}</Text>) : null }
                                                                  
                                                                
                                                              </TouchableOpacity>
                                                    

                                                  </View>
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

  
  