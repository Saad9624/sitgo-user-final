import React, { Component } from "react";
import { Button, View , StyleSheet , Text , Platform , StatusBar, TouchableOpacity , Image ,AsyncStorage , Alert,ImageBackground
,Dimensions} from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

import TimePicker from 'react-native-simple-time-picker';
import DatePicker from 'react-native-datepicker'
import SB from  './../../components/statusbar'
import Loading from 'react-native-whc-loading' 
import baseurl from './../../components/baseurl' 
import moment from 'moment';
import * as Font from 'expo-font';

import en from './../../strings/en.json' ;
import ur from './../../strings/ur.json' ;
import si from './../../strings/si.json' ;
import i18n from 'i18n-js';
import Toast, {DURATION} from 'react-native-easy-toast'
 
export default class add_booking_details extends Component {

    
  constructor(props) {
    super(props);
    this.state = {
      isDateTimePickerVisible: false ,
      selectedHours: 0,
    selectedMinutes: 0,
    selecteddate: 0,
    date:"3-01-2020" ,
    seatname:[]  ,
    seatcount: '' ,
    seatprice:'' ,
    userid:'',
    busid:'' ,
    fromstopid:'' ,
    todayss: 0 , 
    fromname : '' ,
    toname :'' ,
    fontLoaded: false, 
    bookingdate: '' ,
    bookingtime : '' ,
    tostopid:'' ,
    lang:'' ,

    
    };
  }

  static navigationOptions ={
    header: null
}



  componentWillMount(){
    //const BOOKING_DATE = this.props.navigation.state.params.bookingdate 
    const seats_name = this.props.navigation.state.params.SEATS_NAME 
    // e
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



    this._getStorageValue()
    
    const today = moment().format("DD-MM-YYYY");
    this.setState({
      todayss : today
    })
    console.log("today" , today)
    this.getLanguage()
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

  async _getStorageValue(){

    var from_stop_name = await AsyncStorage.getItem('FSN')
    var from_stop_id = await AsyncStorage.getItem('FSI')
    var to_stop_name = await AsyncStorage.getItem('TSN')
    var to_stop_id = await AsyncStorage.getItem('TSI')
    var boook_time = await AsyncStorage.getItem('bookingtime') 
    var boook_date = await AsyncStorage.getItem('bookingdate') 

    console.log("from_stop_name" , from_stop_name)
    console.log("from_stop_id " , from_stop_id)
    console.log("to_stop_name " , to_stop_name)
    console.log("to_stop_id " , to_stop_id)
    console.log("to_stop_id " , boook_time)
    console.log("boook_date " , boook_date)

    var USERID = await AsyncStorage.getItem('USERID')
    var BUSID = await AsyncStorage.getItem('BUSID')
    var STOPID = await AsyncStorage.getItem('STOPID')
    
    console.log("userid" , USERID)
    console.log("stop id " , STOPID)
    // console.log("bus id " , BUSID)
    this.setState({

      userid :     USERID ,
      busid :      BUSID ,
      fromstopid : from_stop_id ,
      fromname :   from_stop_name ,
      toname :     to_stop_name ,
      bookingtime: boook_time ,
      bookingdate : boook_date ,
      tostopid:   to_stop_id

    })
   
  }


 
  showDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: true });
  };
 
  hideDateTimePicker = () => {
    this.setState({ isDateTimePickerVisible: false });
  };
 
  handleDatePicked = date => {
      this.setState({
          selecteddate:date
      })
    console.log("A date has been picked: ", date);
    this.hideDateTimePicker();
  };

  // checkif_selected= async () =>{
  //   this.refs.loading2.show() ;

  //   if(this.state.selectedHours == 0 && this.state.selectedMinutes == 0){
  //     this.refs.loading2.close() ;
  //     alert("Select time of your booking")
  //   }
  //   else{
  //     this.refs.loading2.close() ;
  //     if(this.state.date == "3-01-2020"){
  //       alert("Select date of your booking")
  //     }
  //     else{
  //       this.CONFIRM_BOOKING()
  //     }
  //   }
    
  // }

  checkif_selected= async () =>{
    this.refs.loading2.show() ;

    this.CONFIRM_BOOKING()
    
  }
  
  CONFIRM_BOOKING = async () => {

    try{
    
        console.log("try" , "under try in add booking ")

        var details = {
          'userid'     : this.state.userid ,
          'fromstopid' : this.state.fromstopid ,
          'tostopid'   : this.state.tostopid,
          'busid'      : this.state.busid ,
          'time'       : this.state.bookingtime ,
          'date'       : this.state.bookingdate ,
          'seats'      : this.state.seatcount,
          'customerseats'   : this.state.seatname.toString() ,
          'amount'     : this.state.seatprice  ,
          'paymentmethod' : 'pay on arrival',
          "language"  : this.state.lang
             
 };


 console.log('///////////////////////////////////////////////////////////////')
 console.log(details.seats)
 console.log(details.seatname)
 console.log('userid'     , this.state.userid ,)
 console.log('fromstopid' , this.state.fromstopid)
 console.log('tostopid'     , this.state.tostopid ,)
 console.log('busid'      , this.state.busid)
 console.log( 'time'      , this.state.bookingtime)
 console.log( 'date'     , this.state.bookingdate)
 console.log('seats'      , this.state.seatcount)
 console.log( 'amount'    , this.state.seatprice )
 console.log( 'seat name to String'    ,this.state.seatname.toString() )
 
 
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
                
                    this.refs.toast.show(responseJson.message, 300, () => {
                      // something you want to do at close
                   });
                    this.props.navigation.navigate('MAP')
                    //this.movetohome(responseJson.message)
                  }
                 
                  else{
                    this.refs.loading2.close() ;
                    this.refs.toast.show("Something went wrong", 300, () => {
                      // something you want to do at close
                   });
                   this.props.navigation.navigate('MAP')
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

movetohome = async (msg) => {
  Alert.alert(
    'Confirmed',
    msg,
    [
      
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () =>this.props.navigation.navigate('MAP')},
    ],
    {cancelable: false},
  );
}


async componentDidMount() {
     
  await Font.loadAsync({
    'opreg': require('./../../assets/fonts/opreg.ttf'),
  });

  this.setState({ fontLoaded: true });


  
}
 
  render() {
    const { selectedHours, selectedMinutes , date } = this.state;
    return (
    
          <View style={{flex:1}}>
           <View style={styles.statusBarBackground}></View>
                <StatusBar hidden={false} />
                <StatusBar barStyle={'dark-content'} backgroundColor ={'#FFFFFF'} translucent={true} /> 

                <View style={{ flexDirection: 'row', backgroundColor:'#ffffff' ,height:60 }}>
                                        <TouchableOpacity 
                                                        onPress={() => this.props.navigation.goBack()}
                                                        >

                                                        <Image style={{marginTop:15 ,  marginLeft:25}}
                                                         source={require('./../../assets/images/backbtn/back.png')}></Image>

                                                        </TouchableOpacity>

                                        <View style={{flexDirection:'column' , marginLeft:25}}>
                                        <Text style={{fontSize:20  , fontWeight:'bold' , marginTop:12 }}>{i18n.t('confirm_your_booking')}</Text> 
                                     
                                        </View>
                              </View>


                               <ImageBackground 
             style={{width:Dimensions.get('window').width / 100 * 90 
               , alignSelf:'center' , marginTop:10 , padding:10}}
             source={require('./../../assets/images/whiteback/whiteback.png')}>


                                      <View style={{flexDirection:'row'}}>
                                              <Image  style={{marginTop:5 }}
                                              source={require('./../../assets/images/reddot/red.png')}></Image> 
                                              {this.state.fontLoaded ? ( <Text style={styles.title}>{i18n.t('from_bus_stop')}</Text>) : null }
                                              {this.state.fontLoaded ? (  <Text style={{right:0 , position:'absolute' , fontFamily:'opreg' , fontSize:15}}>{this.state.fromname}</Text> ) : null }
                                      </View>  

                                       <View style={{flexDirection:'row'}}>
                                              <Image style={{marginLeft:2  ,marginTop:5}} 
                                              source={require('./../../assets/images/greydots/grey.png')}></Image>
                                       </View> 
                              
                               

                                        <View style={{flexDirection:'row' ,marginTop:5}}>
                                       
                                                 <Image source={require('./../../assets/images/reddot/red.png')}></Image>
                                                 {this.state.fontLoaded ? (<Text style={styles.title}>{i18n.t('destination_stop')}</Text>) : null }
                                                 {this.state.fontLoaded ? (<Text style={{right:0 , position:'absolute' , fontFamily:'opreg' , fontSize:15}}>{this.state.toname}</Text> ) : null }
                                       </View>
                                  
                              


                                        <View style={{flexDirection:'row' , justifyContent:'space-between' , marginTop:15}}>
                                            
                                               {this.state.fontLoaded ? (<Text style={styles.seats}>{i18n.t('seat')}</Text>) : null }
                                               {this.state.fontLoaded ? ( <Text style={{marginLeft:25,padding:5}}>{this.state.seatcount}</Text>) : null }
                          

                                        </View>

                                        <View style={{flexDirection:'row' , justifyContent:'space-between' , marginTop:15}}>
                                            
                                            {this.state.fontLoaded ? (<Text style={styles.seats}>{i18n.t('seat_no')}</Text>) : null }
                                            {this.state.fontLoaded ? ( <Text style={{marginLeft:25,padding:5}}>{this.state.seatname.toString()}</Text>) : null }
                       

                                     </View>
                                 
                                        <View style={{flexDirection:'row' , justifyContent:'space-between' , marginTop:15}}>

                                          {this.state.fontLoaded ? (<Text style={styles.seats}>{i18n.t('bookingdate')}</Text>) : null }
                                          {this.state.fontLoaded ? (<Text style={{marginLeft:25,padding:5}}>{this.state.bookingdate}</Text>) : null }
                                    
                                       </View>
                               
                               
                                        <View style={{flexDirection:'row' , justifyContent:'space-between' , marginTop:15}}>
                                                {this.state.fontLoaded ? (<Text style={styles.seats}>{i18n.t('time')}</Text>) : null }
                                                {this.state.fontLoaded ? (<Text style={{marginLeft:25,padding:5}}>{this.state.bookingtime}</Text>) : null }
                                        </View>

                                        <View style={{flexDirection:'row' , justifyContent:'space-between' , marginTop:15}}>
                                                {this.state.fontLoaded ? (<Text style={styles.seats}>{i18n.t('fare')}</Text>) : null }
                                                {this.state.fontLoaded ? (<Text style={{marginLeft:25,padding:5}}>{this.state.seatprice}</Text>) : null }
                                        </View>

                                         <View style={{flexDirection:'row' , justifyContent:'space-between' , marginTop:15}}>
                                                {this.state.fontLoaded ? (<Text style={styles.seats}>{i18n.t('payment')}</Text>) : null }
                                                {this.state.fontLoaded ? (<Text style={{marginLeft:25,padding:5}}>COD</Text>) : null }
                                        </View>

             </ImageBackground>












            {/* <Text style={{alignSelf:'center' , fontSize:13}} >Your selected seats are:  {this.state.seatname}</Text> */}
{/* 

<View style={{flexDirection:'column'}}>
          <View style={{flexDirection:'row'  }}>
                  
                  <Text style={{marginLeft:30 ,left:0 , position:'absolute' ,fontSize:15 }}>From Stop </Text>
                  <Text style={{marginRight:30,right:0 , position:'absolute' , fontSize:15}} >{this.state.fromname}</Text>
          </View>

          <View style={{flexDirection:'row' , marginTop:20  }}>
                  
                  <Text style={{marginLeft:30 ,left:0 , position:'absolute' ,fontSize:15}}>To Stop </Text>
                  <Text style={{marginRight:30,right:0 , position:'absolute' , fontSize:15}} >{this.state.toname}</Text>
          </View>

                 <View style={{flexDirection:'row' , marginTop:20 }}>
                  
                          <Text style={{marginLeft:30 ,left:0 , position:'absolute' ,fontSize:15}}>Selected seats</Text>
                          <Text style={{marginRight:30,right:0 , position:'absolute' , fontSize:15}} >{this.state.seatname}</Text>
                  </View>


                  <View style={{flexDirection:'row', marginTop:20  }}>
                  
                          <Text style={{marginLeft:30 ,left:0 , position:'absolute' ,fontSize:15}} >Payment Option</Text>
                          <Text style={{marginRight:30,right:0 , position:'absolute' , fontSize:15}} >COD</Text>
                  </View>


            {/* <Text style={{alignSelf:'center' , fontSize:10}} >Payment Option = COD</Text> */}

                 {/* <View style={{flexDirection:'row' , marginTop:20 }}>
                  
                          <Text style={{marginLeft:30 ,left:0 , position:'absolute' ,fontSize:15}} >TOTAL FARE</Text>
                          <Text style={{marginRight:30,right:0 , position:'absolute' , fontSize:15}} >PKR: {this.state.seatprice}</Text>
                  </View>
</View>

 */} 

           {/* <View style={{borderColor:'#e8e8e8' , borderWidth:3 ,marginTop:10 , marginBottom:10}}></View> */}

            {/* <Text style={{alignSelf:'center' , fontSize:10}} >TOTAL FARE = PKR: {this.state.seatprice}</Text> */}
           

            {/* <Text style={{alignSelf:'center' , fontSize:20 , marginTop:20 , marginBottom:10 , marginTop:10}} >Select Date</Text> */}

        {/* <DatePicker
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
        /> */}


        
{/* <View style={styles.container}>
<Text style={{alignSelf:'center' , fontSize:20,marginTop:20 , marginBottom:10}} >Select Time</Text>
<Text style={{fontSize:30}}>{selectedHours}:{selectedMinutes}</Text>

<TimePicker style={{width:50}}
          selectedHours={selectedHours}
          selectedMinutes={selectedMinutes}
          onChange={(hours, minutes) => this.setState({ selectedHours: hours, selectedMinutes: minutes })}
        />
</View> */}


          <TouchableOpacity
          onPress={() => this.checkif_selected()}
          style={{borderColor:'#103056' , backgroundColor:'#103056' , width:Dimensions.get('window').width / 100 * 80 ,marginBottom:30
            , borderWidth:1 , bottom:0 , position:'absolute' , margin:10 , alignSelf:'center' , padding:10 , borderRadius:10}}>
           {this.state.fontLoaded ? ( <Text style={{color:'white' , fontFamily:'opreg' , alignSelf:'center'}}>{i18n.t('confirm_your_booking')}</Text> ) : null }
          </TouchableOpacity>
     
          <Loading ref='loading2'/>
          <Toast ref="toast"/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      marginRight:100 ,marginLeft:100
    },
    statusBarBackground: {
      height: (Platform.OS === 'ios') ? 18 : Expo.Constants.statusBarHeight, 
            backgroundColor: "#FFFFFF",
    },
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