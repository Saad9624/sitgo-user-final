import React from 'react'  ;

import {View ,
    TouchableOpacity ,StatusBar , Platform , StyleSheet , Image , Text , FlatList, AsyncStorage , ScrollView
} from 'react-native';
import * as Font from 'expo-font';

import statusbar from '../../components/statusbar';

import en from './../../strings/en.json' ;
import ur from './../../strings/ur.json' ;
import si from './../../strings/si.json' ;
import i18n from 'i18n-js';
import CalendarStrip from 'react-native-calendar-strip';
import Moment from 'moment';

export default class listofstopbuses extends React.Component{
    static navigationOptions ={
        header: null
    }

    state = {
        fontLoaded: false,
        stopid: '' ,
        stops:[]  ,
        nobus: false ,
        selecteddate :'' ,
        month:'' ,
        lang:''  ,
        today:1,
        from_id:''
      };

      componentWillMount(){
        const fromid = this.props.navigation.state.params.STOPID 
        this.setState({
              from_id :fromid
        })
        const tostopid = this.props.navigation.state.params.TOSTOPID 
        console.log("from_stopid" , fromid)
        console.log("tostopid" , tostopid)
        
        this.getCuurentmonth()
        this.getLanguage()
        
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
             this.get_AllStop_Buses_List(this.state.from_id , this.state.lang)
        
           }
        

      async componentDidMount() {
        await Font.loadAsync({
          'opreg': require('./../../assets/fonts/opreg.ttf'),
        });
    
        this.setState({ fontLoaded: true });
        
      }

      checksignupcall(sid){
         const baseUrl = "https://hitsofficialpk.com/sitgo/stops/bus?";
        const param = `stopid=${sid}&language=${this.state.lang}`;
        return `${baseUrl}${param}`;
    
      }

      get_AllStop_Buses_List = async (s_id) => {

         try{

            const url = this.checksignupcall(s_id)
            console.log(url)

            let response = await fetch(url)
           // let response = await fetch(`https://hitsofficialpk.com/sitgo/stops/bus?stopid=${this.state.stopid}`)

            const completeresponse =  await response.json()
            console.log("response " , completeresponse)

            if(completeresponse.message == 'Bus Found'){
                console.log("underif")
                const st_array = completeresponse.stops 

                this.setState({
                    stops:st_array
                })
            }
            else if(completeresponse.message == 'No Bus Found'){
              console.log("under no bus found")
              this.setState({
                nobus : true
              })
          }
           

         }
         catch(e){
             console.log(e)
         }
      }

      onPress = async (item)=>{

            if(this.state.selecteddate != ''){
                  this.props.navigation.navigate('NEWSELECTSEAT' ,{
                        BUS_ID : item.busid  
                      })
              
                      AsyncStorage.setItem("BUSID" , item.busid)
                      AsyncStorage.setItem("bookingtime" , item.departure)
                      AsyncStorage.setItem("bookingdate" , this.state.selecteddate)
                        console.log("bbus_id_on_list" , item.busid)
            }
            else{
                  alert("Please select date first")
            }

      
      }

      onPress1= (num) => {
           const converteddate = Moment(num).format("DD-MM-YYYY")
            console.log("date22" , converteddate)
            this.setState({
                  selecteddate : converteddate
            })
      }
      
      getCuurentmonth= () =>{
            date = new Date()
            const converteddate = Moment(date).format("DD-MM-YYYY")
            console.log("date11" , converteddate.toString())
            this.setState({
                  today: date ,
                  selecteddate : converteddate
            })
      }
      

   

    render(){
        return(
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
                                                                        {this.state.fontLoaded ? (             <Text style={{fontSize:25 , marginTop:10 , fontFamily:'opreg'}}>{i18n.t('bus')}</Text> ) : null }
                                                    
                                                        </View>
                              </View>

            

          <CalendarStrip
                           minDate={this.state.today}
                          onDateSelected={(date) => this.onPress1(date)}
                    calendarAnimation={{type: 'sequence', duration: 30}}
                    daySelectionAnimation={{type: 'border', duration: 200, borderWidth: 1, borderHighlightColor: 'white'}}
                    style={{height: 100, paddingTop: 20, paddingBottom: 10}}
                    calendarHeaderStyle={{color: 'white'}}
                    calendarColor={'#103056'}
                    dateNumberStyle={{color: 'white'}}
                    dateNameStyle={{color: 'white'}}
                    highlightDateNumberStyle={{color: 'white'}}
                    highlightDateNameStyle={{color: 'white'}}
                    disabledDateNameStyle={{color: 'grey'}}
                    disabledDateNumberStyle={{color: 'grey'}}
                  
                    iconContainer={{flex: 0.1}}
                />



<View style={{flexDirection:'row' , justifyContent:'space-between' , marginLeft:10 , marginRight:10 , marginTop:10 }}>
          <Text >{i18n.t('arrival')}</Text>
          <Text>{i18n.t('departure')}</Text>
          <Text>{i18n.t('fare')}</Text>
          <Text>{i18n.t('seat')}</Text>

</View>

<View opacity={0.3}  style={{  marginTop:5 , borderBottomColor: 'grey',  borderBottomWidth: 1, marginTop:20  }}></View>
                

                {this.state.nobus && <Text style={{marginTop:20 , alignSelf:'center' , fontSize:20 , color:'#C62930'}}>No Bus Found</Text>}
                
                              <FlatList
                            data={ this.state.stops }
                            keyExtractor={(item,index)=>index}
                            renderItem={({item}) =>
                              ( 
                                  
                                  <TouchableOpacity
                                  onPress={() => this.onPress(item)}
                                  >
                                  
                                  
                     
                                
                                                          <View style={{marginTop:10,flexDirection:'row' , justifyContent:'space-between' , marginLeft:10 , marginRight:10}}>
                                                                      <Text style={{fontSize:12}}>{item.arrival}</Text>
                                                                      <Text style={{fontSize:12}}>{item.departure}</Text>
                                                                      <Text style={{fontSize:12}}>{item.price}</Text>
                                                                      <Text style={{fontSize:12}}>{item.seats}</Text>

                                                            </View>
                            
                                                              {/* <View style={{flexDirection:'row' , marginLeft:20 , marginRight:20 ,height:70}}>


                                                                                            <View style={{flexDirection:'row'}}>
                                                                                                <Image source={(require('../../assets/images/bus/bus.png'))}></Image>
                                                                                                <Text style={{marginLeft:10 , marginTop:17 , fontSize:15}} >{item.busname}</Text>
                                                                                            </View>
                                                                                           
                                                                                             <View style={{flexDirection:'column' ,right:0 ,position:'absolute' , marginTop:10}}>

                                                                                                  <Text>Total Seats: {item.seats}</Text>
                                                                                                  <Text>Time : {item.time}</Text>
                                                                                             </View>
                                                               </View>
                                                                                             */}
                                                            

                                                            
                                                             <View opacity={0.3}  style={{  marginTop:5 , borderBottomColor: 'grey',  borderBottomWidth: 1,  }}></View>
                                 
                          </TouchableOpacity> 
                          )}
                            keyExtractor={(item, index) => index.toString()}
                          />


            </View>
        )
    }
}

const styles = StyleSheet.create({
    
 statusBarBackground: {
        height: (Platform.OS === 'ios') ? 18 : Expo.Constants.statusBarHeight, 
              backgroundColor: "#FFFFFF",
      }
  });