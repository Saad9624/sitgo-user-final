import React from 'react';
import { View, Text } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {createDrawerNavigator , DrawerItems} from 'react-navigation-drawer';
import registration from './screens/registration' ;
import login from './screens/login' ;
import signup from './screens/signup' ;
import otp from './screens/otp' ;
import dashboard from './screens/dashboard';
import leftdrawer from './screens/sidedrawer' ; 
 
import activebookings from './screens/bookings/activebooking' ; 
import bookinghistory from './screens/bookings/bookinghistory' ;
import testing from './screens/testing' ;
import creditcard from './screens//payments/creditcard' ;
import addingitemsinfl from './screens/testingfolder/addingitemsinfl' ;
import addcard from './screens/payments/addcard' ;
import selectseats from './screens/testingfolder/selectseats' ; 
import payment from './screens/payments/payment' ;
import currentloc from './screens/maps/currentloc' ;
import locatebus from './screens/maps/locatebus';
import routes from './screens/testingfolder/routes';
import news from './screens/news/news';
import wallet from './screens/payments/wallet';
import list from './screens/testingfolder/list';
import detailnews from './screens/news/detailnews';
import newselectseat from './screens/testingfolder/newselectseat';
import testingformarkers from './screens/maps/testingformarkers';
import statusbar from './components/statusbar';
import listofstopbuses from './screens/buses/listofstopbuses';
import add_booking_details from './screens/bookings/add_booking_details';
import afterbookingdetails from './screens/maps/afterbookingdetails';
import stoplist from './screens/stops/stoplist';
import hydtokhi_stops from './screens/stops/hydtokhi_stops';
import previous_booking from './screens/bookings/previous_booking';
import newbooking from './screens/bookings/nexbooking';
import movingbus from './screens/movingbus';
import card_details from './screens/bookings/card_details';
import mylocation from './screens/mylocation'
import changelang from './screens/changelang';
import bus_route from './screens/drawroutes/bus_route';
import mapviewdecoding from './screens/drawroutes/mapviewdecoding';
import editprofile from './screens/profile/editprofile' 
import signupnew from './screens/signupnew/signup'
import verifynumber from './screens/forgotpassword/verifynumber'
import confirm_password from './screens/forgotpassword/confirm_password'
import verify_otp from './screens/forgotpassword/verifyotp' 
import updateprofile from './screens/profile/updateprofile' ;

const RootStack = createStackNavigator(
    {
      Home: registration,
      LOGIN :login , 
      SIGNUP :signup ,
      OTP : otp  ,
    //  DASH: dashboard ,
     
    // AB : activebookings ,
     //BH : bookinghistory , 
    // MODAL: testing ,
     CREDITCARD : creditcard ,
     ADDITEM : addingitemsinfl,
     ADDCARD: addcard ,
     //SS: selectseats , 
     PAYMENT : payment ,
     MAP : currentloc , 
     LOCATEBUS: locatebus ,
     ROUTES: routes ,
     NEWS: news ,
     WALLET: wallet ,
     LIST: list , 
     D_NEWS : detailnews ,

     // bus seats new screen
     NEWSELECTSEAT: newselectseat ,
     
     
     TFM: testingformarkers  ,
     S_BAR : statusbar ,
     list_of_stop_buses : listofstopbuses ,
     BOOKING_DETAILS : add_booking_details ,
     AFTERBOOKING :  afterbookingdetails ,
     ALL_STOPS_LIST: stoplist ,
     HYD_TO_KHI_STOPS : hydtokhi_stops ,
     PREVIOUS_BOOKING : previous_booking ,
     NEW_BOOKING : newbooking ,
     SIDE_DRAWER: leftdrawer ,

     //this is active booking details screen from where user can locate the current location of driver
     CARD_DETAILS : card_details,

     MYLOC: mylocation ,

     MOVINGBUS: movingbus ,
     CHANGELANG : changelang ,

     BUS_ROUTE: bus_route ,
     MAP_DECODING: mapviewdecoding ,

     MYPROFILE: editprofile ,
     SIGNUPNEW : signupnew ,

     //forgot password 
     VERIFY_NUM : verifynumber  ,
     CONFIRM_PASSWORD : confirm_password ,
     VERIFY_OTP : verify_otp ,

     UPDATEPROFIL : updateprofile 

    },
    {
      initialRouteName: 'Home',
    }
  );

  // RootStack.navigationOptions = ({ navigation }) => {
  //   let drawerLockMode = 'locked-closed';
  //   let gesturesEnabled = 'true' ; 
  
  //   if (navigation.state.index == 2     || navigation.state.index == 3 ) {
      
  //     drawerLockMode = 'locked-unlocked';
  //   }
     
  //   else  {
  //     drawerLockMode = 'locked-closed';
  //   }

    

  //   return {
  //     drawerLockMode,
  //     gesturesEnabled 
  //   };
  // };


  const DrawerNavigation =  createDrawerNavigator({
    Home: RootStack ,
   
    
  },
  {
    
      contentComponent:leftdrawer
    
  } );
  

  export default createAppContainer(DrawerNavigation);