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
import duwhite from '../../assets/images/duwhite/duwhite.png' ;
import dropdown from '../../assets/images/dropdown/drop.png'
import TimePicker from 'react-native-simple-time-picker';
import DatePicker from 'react-native-datepicker'
import Loading from 'react-native-whc-loading' 
 
import moment from 'moment';


export default class afterbookingdetails extends React.Component {

    static navigationOptions = {
        header:  null
    }
   
    constructor(props){
        super(props);
         this.state= {
          markers: [],
           uname:'' ,
          fontLoaded: false,
            latitude : 24.8607 , 
            longitude : 67.0011 , 
            visible : false ,
            seldate: false ,
            defaultimage : dropdown ,
            defaultimage1 : dropdown ,
            selectedHours: 0,
            selectedMinutes: 0,
            selecteddate: 0,
            date:"1-01-2020" ,
            todayss: 0 ,
            seltime: false ,
            seatname:[]  ,
            seatcount: 0 ,
            seatprice:'' ,
            userid:'',
            busid:'' ,
            fromstopid:'' ,
        
        
        };
      }

      
     
      

      componentWillMount(){
        const seats_name = this.props.navigation.state.params.SEATS_NAME 
        const price = this.props.navigation.state.params.PRICE 
        var seat_count = seats_name.length  
        console.log("seat_count" ,seat_count)
        console.log("Seats_name" , seats_name)
        console.log("Seats_price" , price *4)
        this.setState({
          seatname : seats_name ,
          seatcount : seat_count ,
          seatprice : price * seat_count
    
        })


        this.get_all_stop_call()

        this._getStorageValue()


        const today = moment().format("DD-MM-YYYY");
        this.setState({
         todayss : today ,
     
          })
    console.log("today" , today)
        
      }
      async _getStorageValue(){
        var USERNAME = await AsyncStorage.getItem('UN')
        var USERID = await AsyncStorage.getItem('USERID')
        var BUSID = await AsyncStorage.getItem('BUSID')
        var STOPID = await AsyncStorage.getItem('STOPID')
        
        console.log("userid" , USERID)
        console.log("stop id " , STOPID)
        console.log("bus id " , BUSID)
        this.setState({
          userid : USERID ,
          busid : BUSID ,
          fromstopid  :STOPID ,
          uname : USERNAME
    
        })
       
      }

     
       async componentDidMount() {
     
        await Font.loadAsync({
          'opreg': require('./../../assets/fonts/opreg.ttf'),
        });
    
        this.setState({ fontLoaded: true });

        NetInfo.getConnectionInfo().then(connectionInfo => {
          if(connectionInfo.type  == 'none'){
            this.checklogin()
          } 
          else{
            navigator.geolocation.getCurrentPosition(
              ({coords:{latitude , longitude}}) =>this.setState({latitude , longitude}))
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


       checkif_selected= async () =>{
        this.refs.loading2.show() ;
    
        if(this.state.selectedHours == 0 && this.state.selectedMinutes == 0){
          this.refs.loading2.close() ;
          alert("Select time of your booking")
        }
        else{
          this.refs.loading2.close() ;
          if(this.state.date == "1-01-2020"){
            alert("Select date of your booking")
          }
          else{
            this.CONFIRM_BOOKING()
          }
        }
        
      }

      CONFIRM_BOOKING = async () => {

        try{
        
            console.log("try" , "under try in add booking ")
    
            var details = {
              'userid'     : this.state.userid ,
              'fromstopid' : this.state.fromstopid ,
              'tostopid'   : '2' ,
              'busid'      : this.state.busid ,
              'time'       : this.state.selectedHours + ':' + this.state.selectedMinutes ,
              'date'       : this.state.date ,
              'seats'      : this.state.seatcount,
              'amount'     : this.state.seatprice  ,
              'paymentmethod' : 'pay on arrival'
                 
     };
    
     console.log('userid'     , this.state.userid ,)
     console.log('fromstopid' , this.state.fromstopid)
     console.log('userid'     , this.state.userid ,)
     console.log('busid'      , this.state.busid)
     console.log( 'time'      , this.state.selectedHours + ':' + this.state.selectedMinutes)
     console.log(  'date'     , this.state.date)
     console.log('seats'      , this.state.seatcount)
     console.log( 'amount'    , this.state.seatprice  ,)
     
     var formBody = [];
     for (var property in details) {
       var encodedKey = encodeURIComponent(property);
       var encodedValue = encodeURIComponent(details[property]);
       formBody.push(encodedKey + "=" + encodedValue);
     }
      formBody = formBody.join("&");
    
    
          fetch(baseurl.uatbaseurl + 'booking/addbooking',
          {
           
            method: 'POST',
               headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
            
    
            body: formBody
      
           })
       
       
    
           .then((response) => response.json())
           
                  .then((responseJson) => {
                    this.refs.loading2.close() ;
                    
                       console.log('response object: ',responseJson)
                     
    
    
                       if(responseJson.success == true  || responseJson.success == 'true' ){
                        this.refs.loading2.close() ;
                        alert(responseJson.message)

                      }
                     
                      else{
                        this.refs.loading2.close() ;
                        alert(responseJson.errors)
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
          this.refs.loading2.close() ;
          console.log("catch" , e)
          
        }
    }  
      

       handleMarkerPress(event) {
        //const markerID = event.nativeEvent.id
        console.log("onclick" , event)

        if(event == 'Stop1'){
          AsyncStorage.setItem("STOPID" , "1") 
            this.props.navigation.navigate('list_of_stop_buses' , {
                STOPID : '1' 
            })
        }
        if(event == 'Stop2'){
          AsyncStorage.setItem("STOPID" , "2") 
            this.props.navigation.navigate('list_of_stop_buses' , {
                STOPID : '2' 
            })
        }
        if(event == 'Stop3'){
          AsyncStorage.setItem("STOPID" , "3") 
            this.props.navigation.navigate('list_of_stop_buses' , {
                STOPID : '3' 
            })
        }
        if(event == 'Stop4'){
          AsyncStorage.setItem("STOPID" , "4") 
            this.props.navigation.navigate('list_of_stop_buses' , {
                STOPID : '4' 
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

      openDatePicker = async()=>{
        if(this.state.seldate == false){
          this.setState({
            seldate : true ,
            defaultimage: duwhite
          })
        }else{
          this.setState({
            seldate : false,
            defaultimage: dropdown
          })
        }
      }

      opentimePicker = async()=>{
        if(this.state.seltime == false){
          this.setState({
            seltime : true ,
            defaultimage1: duwhite
          })
        }else{
          this.setState({
            seltime : false,
            defaultimage1: dropdown
          })
        }
      }
    
    render() {

    
      const { selectedHours, selectedMinutes , date } = this.state;

        const {latitude , longitude} = this.state
  
        if (latitude) {
          return ( 
              
            <View style={styles.parent}>  
              <View style={{flex:1}}>
                                <View style={{flexDirection:'row' , marginTop:30}}>
                                        <TouchableOpacity
                                                onPress={() => this.props.navigation.navigate('MAP')}>
                                                                           <Image style={{marginTop:15 ,  marginLeft:25}}
                                                         source={require('./../../assets/images/backbtn/back.png')}></Image>
                    
                                                                        </TouchableOpacity>

                   {this.state.fontLoaded ? (           <Text style={styles.h1}>Good Morning  {this.state.uname},</Text>) : null }

                            
                                   </View>

                                   {this.state.fontLoaded ? (  <Text style={styles.h2}>Where are you going?</Text>) : null }
                            <ImageBackground 
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

{/* // // {this.state.fontLoaded ? ( <Text style={styles.stopname}>Johar Chorangi</Text> ) : null } */}

                                </View> 
                              
                               

                                <View style={{flexDirection:'row' ,marginTop:5}}>
                                        <Image 
                                     
                                        source={require('./../../assets/images/reddot/red.png')}></Image>

{this.state.fontLoaded ? (                    <Text style={styles.title}>Destination Bus Stop</Text>) : null }
                                </View>
                                  
                                {/* {this.state.fontLoaded ? (           <Text style={styles.stopname}>I.I Chundrigar Road</Text> ) : null } */}



                                  {this.state.fontLoaded ? (           <Text style={styles.seats}>Number of Seats Selected</Text>) : null }
                                    {this.state.fontLoaded ? (          <Text style={{marginLeft:25,padding:5}}>{this.state.seatcount}</Text>) : null }
                           
                           
                                <View  style={styles.viewstyle}  />


                                {this.state.fontLoaded ? (            <Text style={styles.seats}>Booking Date</Text>) : null }

                                <View style={{flexDirection:'row'}}>
                                        {this.state.fontLoaded ? (          <Text style={{marginLeft:25,padding:5}}>{this.state.date}</Text>) : null }

                                          <TouchableOpacity style={{right:0 ,position:'absolute' , marginRight:40 ,padding:5}} 
                                                  onPress={() => this.openDatePicker()}
                                                  >
                                                    <View >
                                                        <Image  source={this.state.defaultimage}></Image>
                                                  
                                                    </View>
                                                                          
                                          </TouchableOpacity>

                                </View>
                                 


                                 <View  style={styles.viewstyle}  />

                                { this.state.seldate && <View style={{padding:5}}>
                                        <Text  style={styles.seats} >Select date</Text>
                                            <TouchableOpacity>
                                                    <DatePicker
                                                          style={{ width: 200 , alignSelf:'center' }}
                                                          date={this.state.date} //initial date from state
                                                          mode="date" //The enum of date, datetime and time
                                                          placeholder="select date"
                                                          format="DD-MM-YYYY"
                                                            minDate={this.state.todayss}
                                                          maxDate="01-01-2030"
                                                          confirmBtnText="Confirm"
                                                          cancelBtnText="Cancel"
                                                          customStyles={{
                                                            dateIcon: {
                                                              position: 'absolute',
                                                              left: 0,
                                                              top: 4,
                                                              marginLeft: 0,
                                                            },
                                                            dateInput: {
                                                              marginLeft: 36,
                                                            },
                                                          }}
                                                          onDateChange={date => {
                                                            this.setState({ date: date });
                                                          }}
                                                        />
                                            </TouchableOpacity>
                                                 
                                        <View  style={styles.viewstyle}  />
                                </View> }

                                {this.state.fontLoaded ? (          <Text style={styles.seats}>Time slot</Text>) : null }
                              
                              <View style={{flexDirection:'row'}}>
                              {this.state.fontLoaded ? (         <Text style={{marginLeft:25,padding:5}}>{selectedHours}:{selectedMinutes}</Text>) : null }
                                
                                <TouchableOpacity style={{right:0 ,position:'absolute' , marginRight:40 , padding:5}} 
                                            onPress={() => this.opentimePicker()}
                                            >
                                              <View >
                                                  <Image  source={this.state.defaultimage1}></Image>
                                            
                                              </View>
                                                                    
                                    </TouchableOpacity>
                              
                              </View>
                                 
                                
                                <View  style={styles.viewstyle}  />

                                { this.state.seltime && <View style={{padding:5}}>
                                        <Text  style={styles.seats} >Select time</Text>
                                            <TouchableOpacity>
                                            <TimePicker style={{width:50}}
                                              selectedHours={selectedHours}
                                              selectedMinutes={selectedMinutes}
                                              onChange={(hours, minutes) => this.setState({ selectedHours: hours, selectedMinutes: minutes })}
                                                                          />
                                            </TouchableOpacity>
                                                 
                                        <View  style={styles.viewstyle}  />

                                        <TouchableOpacity onPress={() => this.checkif_selected()} style={{borderColor:'grey' , borderWidth:1 , alignSelf:"center" , borderRadius:5 , padding:10 , marginTop:10}}>
                                          <Text>Confirm booking</Text>
                                        </TouchableOpacity>
                                </View> }




             </ImageBackground>
             

            
               
                                                        <MapView 
                                                         zoomEnabled={true}
                                                         
                                                         showsUserLocation={true}
                                                         showsCompass={true}
                                                         
                                                         style={{flex:1}}
                                                         initialRegion={{
                                                           latitude ,
                                                           longitude ,
                                                           latitudeDelta: 0.6,
                                                           longitudeDelta: 0.6,
                                                         }}
                                                       >
                                        
                                    
                                        {this.state.markers.map((marker, index) => 
                                              ( <MapView.Marker
                                                onPress={() => this.handleMarkerPress(marker.title)}
                                                key={index} coordinate={marker.coordinate} 
                                                 title = {marker.title} description = {marker.description}
                                              /> ))}

                                        </MapView>
                                     
                                            
                                      
              </View>
              <Loading ref='loading2'/>
              </View>
             
          );
        }
        return(
            <View style={{flex: 1, paddingTop: 20 , justifyContent:'center'}}>
            <ActivityIndicator color='#FF4500' size="large"  />
          </View>
        ) 
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

  
  