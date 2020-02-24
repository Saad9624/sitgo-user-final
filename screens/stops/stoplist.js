import React from 'react';
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import { View , Text, Button , NetInfo, Image ,
  Alert ,  TouchableOpacity,ImageBackground , StyleSheet , Share ,StatusBar ,
  Dimensions  ,
   ActivityIndicator , Platform, AsyncStorage , FlatList , TextInput , ScrollView} from 'react-native';
import { BackHandler } from 'react-native';
import * as Font from 'expo-font';
import baseurl from '../../components/baseurl';

import en from './../../strings/en.json' ;
import ur from './../../strings/ur.json' ;
import si from './../../strings/si.json' ;
import i18n from 'i18n-js';


export default class stoplist extends React.Component {

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
            longitude : 0 , 
            visible : false ,
            karachiStops:[] ,
            HydStops:[] ,
            nostops:false ,
            Hyderbad:false  ,
            fromid: 0 ,
            toid: 0 ,
            tostopname : '' ,
            fromname : '' ,
            lang:'' ,

        
        
        };
      }

      
     
      

      componentWillMount(){
       
        this._getStorageValue()
        this.getLanguage()
        
        
      }

      async _getStorageValue(){
            var USERNAME = await AsyncStorage.getItem('UN')
            console.log("username" , USERNAME)
            this.setState({
              uname : USERNAME
            })
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
        
        this.checkinternet()
       }
     
     
       async componentDidMount() {
     
        await Font.loadAsync({
          'opreg': require('./../../assets/fonts/opreg.ttf'),
        });
    
        this.setState({ fontLoaded: true });

        this.checkinternet()
        
      }


      checkinternet = () => {
      

        NetInfo.getConnectionInfo().then(connectionInfo => {
          if(connectionInfo.type  == 'none'){
            this.checklogin()
          } 
          else{
            
            this.get_all_stop_call()
            this.get_all_hyd_stop_call()
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
        if(event == 'Stop5'){
          AsyncStorage.setItem("STOPID" , "5") 
            this.props.navigation.navigate('list_of_stop_buses' , {
                STOPID : '5' 
            })
        }

        if(event == 'Stop6'){
          AsyncStorage.setItem("STOPID" , "6") 
            this.props.navigation.navigate('list_of_stop_buses' , {
                STOPID : '6' 
            })
        }

        
        if(event == 'Stop7'){
          AsyncStorage.setItem("STOPID" , "7") 
            this.props.navigation.navigate('list_of_stop_buses' , {
                STOPID : '7' 
            })
        }
        
      }
    

    get_all_stop_call = async ()=> {
        this.setState({
            isLoading:true
          })
    
        try{
          

          let response = await fetch(`https://sitgoride.com/admin/stops/all?city=Karachi&language=${this.state.lang}`) 

          const completeresponse =  await response.json()
          var markers = [];
          console.log("response " , completeresponse)
          

          const khistop = completeresponse.stops

          this.setState({
              karachiStops : khistop
          })

       
          

        //   for(var i = 0 ; i< stop.length  ; i++){

            console.log("stops" , khistop[0].stopname )
            console.log("stops1" , khistop[0].stopid )
            console.log("stops2" , khistop[0].latitutte )
            console.log("stops3" , khistop[0].longitude )

        //     var marker = {
        //         id : stop[i].id , 
        //         title : stop[i].stopname,
        //       coordinate: {
        //         latitude:parseFloat(stop[i].latitutte),
        //         longitude: parseFloat(stop[i].longitude),
               
        //       }
        //     }
        //     markers.push(marker);
          
        // }
      

          
        }
        catch(error){

        }

      }

      get_all_hyd_stop_call = async ()=> {
        this.setState({
            isLoading:true
          })
    
        try{
          

          let response = await fetch(`https://sitgoride.com/admin/stops/all?city=Hyderabad&language=${this.state.lang}` ) 

          const completeresponse =  await response.json()
          var markers = [];
          console.log("response " , completeresponse)
          
          if(completeresponse.errors == true){
            this.setState({
              nostops: true
            })
          }
          else{
            const hyd_stop = completeresponse.stops

            this.setState({
              HydStops : hyd_stop ,
              Hyderbad:true
            })
  
          }

         
       
          

        //   for(var i = 0 ; i< stop.length  ; i++){

            console.log("hyd_stop" , khistop[0].stopname )
            console.log("hyd_stop" , khistop[0].stopid )
            console.log("hyd_stop" , khistop[0].latitutte )
            console.log("hyd_stop" , khistop[0].longitude )

        //     var marker = {
        //         id : stop[i].id , 
        //         title : stop[i].stopname,
        //       coordinate: {
        //         latitude:parseFloat(stop[i].latitutte),
        //         longitude: parseFloat(stop[i].longitude),
               
        //       }
        //     }
        //     markers.push(marker);
          
        // }
      

          
        }
        catch(error){

        }

      }

      onPress1 = async (item)=>{
        console.log("fromstopid" , item.stopid)
        console.log("FSN" , item.stopname)

        // this.props.navigation.navigate('NEWSELECTSEAT' ,{
        //   BUS_ID : item.busid  
        // })

         AsyncStorage.setItem("FSN" , item.stopname)
         AsyncStorage.setItem("FSI" , item.stopid)

         

          this.setState({
            fromid : item.stopid ,
            fromname : item.stopname
          })
      }

      onPress2 = async (item)=>{
        console.log("tostopid" , item.stopid)
        console.log("tostopname" , item.stopname)

        AsyncStorage.setItem("TSN" , item.stopname)
        AsyncStorage.setItem("TSI" , item.stopid)
        
          // this.setState({
          //   toid : item.stopid ,
          //   tostopname : item.stopname
          // })
          this.setState({
            toid : item.stopid ,
            tostopname : item.stopname
          })
      }


      gotoSelectSeatscreen = async () =>{
          if(this.state.fromid == 0 || this.state.fromid == null){
            alert("Please select stops")
          }
          else if(this.state.toid == 0 || this.state.toid == null){
            alert("Please select stops")
          }
          else{
            this.props.navigation.navigate('list_of_stop_buses' ,{
              STOPID : this.state.fromid ,
              TOSTOPID : this.state.toid  
        })

        // AsyncStorage.setItem("FROMSTOPID" , this.state.fromid)
        // AsyncStorage.setItem("TOSTOPID" , this.state.toid)
          }
      }
    
    render() {

      return ( 
              
            <View style={styles.parent}>  
                    <View style={{ height: (Platform.OS === 'ios') ? 0 : 0, backgroundColor: "#ffffff"}}></View>
                    <StatusBar hidden={false} />
                    <StatusBar barStyle={'dark-content'} backgroundColor ={'#FFFFFF'} translucent={true} /> 

                                <View style={{ flexDirection: 'row',alignItems:'center', backgroundColor:'#ffffff' ,height:60 , marginTop:20 }}>
                                                        <TouchableOpacity 
                                                        onPress={() => this.props.navigation.goBack()}
                                                        >

                                                        <Image style={{marginTop:15 ,  marginLeft:25}}
                                                         source={require('./../../assets/images/backbtn/back.png')}></Image>

                                                        </TouchableOpacity>

                                                        <View style={{flexDirection:'column' , marginLeft:25}}>
                                                        {this.state.fontLoaded ? (             <Text style={{fontSize:25 , marginTop:10 , fontFamily:'opreg'}}>{i18n.t('choose_your_stop')}</Text> ) : null }
                                                    
                                                        </View>
                              </View>

                       <ScrollView>
               <View style={{flexDirection:'column' , flex:2}}>
               <View style={{flexDirection:'row'}}>
               {this.state.fontLoaded ? (    <Text style={{fontSize:20 , marginLeft:10, fontFamily:'opreg' , marginTop:10,textAlign:'left'}}>{i18n.t('karachi')}</Text> ) : null }
                   {this.state.fontLoaded ? (    <Text style={{fontSize:10 , right:0 , position:'absolute', fontFamily:'opreg' , margin:10,textAlign:'right'}}>{i18n.t('from')}</Text> ) : null }
               </View>
               
                        <View style={{flex:1 , alignSelf:'center' }}>
                        
                                        <FlatList
                                        style={{marginTop:20}}
     
                                            data={ this.state.karachiStops }
                                            keyExtractor={(item,index)=>index}
                                            renderItem={({item}) =>
                                            ( 
                                                
                                                <TouchableOpacity style={{margin:5 , width:100 }}
                                                onPress={() => this.onPress1(item)}
                                                >
                                            
                                                                            <View style={{padding:10 , alignSelf:'center' ,margin:10 ,
                                                                             borderColor:'#C62930' , backgroundColor:'#C62930' , borderWidth:1 , borderRadius:5     }}>

                                                                                    {this.state.fontLoaded ? (    
                                                                                          <Text
                                                                                            
                                                                                                   style={{fontSize:15 , fontFamily:'opreg' , width:60 , height:40 ,color:'white'}}>{item.stopname}</Text> 
                                                                                                   ) : null }
                                                                            </View>
                                                                                  
                                        </TouchableOpacity> 
                                        )}
                                        numColumns={3}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                        
                        </View>

                        <View style={{borderColor:'#e8e8e8' , borderWidth:3 , width:'100%'}}></View>
                      
                        <View style={{flex:1, alignSelf:'center'}}>

                        {/* {this.state.fontLoaded ? (             <Text style={{fontSize:25 , marginTop:10 , fontFamily:'opreg'}}>{i18n.t('choose_your_stop')}</Text> ) : null } */}
                       
                       {this.state.Hyderbad && 
                      <View style={{flexDirection:'row'}}>
                      {this.state.fontLoaded ? ( <Text style={{fontSize:20 , marginLeft:10 , fontFamily:'opreg',textAlign:'left'}}>{i18n.t('hyd')}</Text>) : null }
                      {this.state.fontLoaded ? ( <Text style={{fontSize:10 , marginRight:20 , right:0 , position:'absolute',fontFamily:'opreg' , margin:10,textAlign:'right'}}> {i18n.t('to')}</Text>) : null }
             
                 </View>
                        
                        } 
                         <FlatList
                                        style={{marginTop:20 , alignSelf:'center'}}
     
                                            data={ this.state.HydStops }
                                            keyExtractor={(item,index)=>index}
                                            renderItem={({item}) =>
                                            ( 
                                                
                                                <TouchableOpacity style={{margin:5 , width:100 }}
                                                onPress={() => this.onPress2(item)}
                                                >
                                              <ScrollView >
                                                                            <View style={{padding:10 , alignSelf:'center' ,margin:10 ,
                                                                             borderColor:'#103056' , backgroundColor:'#103056' , borderWidth:1 , borderRadius:5     }}>

                                                                                  
                                                                                    {this.state.fontLoaded ? (    
                                                                                        <Text
                                                                                            
                                                                                                   style={{fontSize:15 , fontFamily:'opreg' , width:60 , height:40 , color:'white'}}>{item.stopname}</Text> 
                                                                                                   ) : null }


                                                                                    

                                                                                   {/* <Text style={{fontSize:15}} >{item.stopname}</Text> */}
                                                                                 
                                                                            </View>
                                                                            </ScrollView>
                                                                                  
                                        </TouchableOpacity> 
                                        )}
                                        numColumns={3}
                                            keyExtractor={(item, index) => index.toString()}
                                        />
                        
                        </View>
                        
               </View>

                                                   
                                                   
                                                   <View  style={{flexDirection:"row" , justifyContent:'space-between' , marginLeft:20 , marginRight:20, marginTop:30  }}>
                                                                        {this.state.fontLoaded ? (      <Text style={{fontSize:10 , width:80 , fontFamily:'opreg',height:40}}>{this.state.fromname}</Text>  ) : null }
                                                          
                                                                         <TouchableOpacity
                                                                                onPress={() => this.gotoSelectSeatscreen()}
                                                                                  style={{alignSelf:'center' , borderColor:'#grey', backgroundColor:'transparent' , borderWidth:1 , borderRadius:5 , width:100 ,}} >
                                                                                  {this.state.fontLoaded ? (        <Text style={{padding:10 , fontSize:15 , color:'grey' , alignSelf:'center' , fontFamily:'opreg'}} >{i18n.t('next')}</Text>) : null }
                                                                            
                                                                          </TouchableOpacity>

                                                                  
                                                                        {this.state.fontLoaded ? (    <Text style={{fontSize:10 , width:80, fontFamily:'opreg',height:40}}>{this.state.tostopname}</Text>  ) : null }
                                                            
                                                            
                                                     </View>   
                               
                              
                                                     </ScrollView>
              </View>
             
          );
        
      }

  }

const styles = StyleSheet.create({
  parent :{
      flex:1 ,
      backgroundColor:'#F5F5F5'
  } ,
  statusBarBackground: {
      height: (Platform.OS === 'ios') ? 0 : 0,
      backgroundColor: "#ffffff",
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

  
  