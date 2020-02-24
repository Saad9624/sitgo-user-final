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
        lang:'' 
      };

      componentWillMount(){
        const fromid = this.props.navigation.state.params.STOPID 
        const tostopid = this.props.navigation.state.params.TOSTOPID 
        console.log("from_stopid" , fromid)
        console.log("tostopid" , tostopid)
        this.get_AllStop_Buses_List(fromid)
        this.getCuurentmonth()
        this.getLanguage()
        
      }


      getCuurentmonth(){
            var d = new Date();
            var n = d.getMonth(); 
            if(n == 0){
                  this.setState({
                        month:'January'
                  })

            }  
            else if(n == 1){
                  this.setState({
                        month:'February'
                  })

            }  

            else if(n == 2){
                  this.setState({
                        month:'March'
                  })

            }  
            else  if(n == 3){
                   this.setState({
                        month:'April'
                  })

            }  
            else  if(n == 4){
                  this.setState({
                       month:'May'
                 })

           }  
           else  if(n == 5){
            this.setState({
                 month:'June'
           })

            }  
            else  if(n == 6){             
                  this.setState({
                  month:'July'
            })

            }  
            else  if(n == 7){             
                  this.setState({
                  month:'August'
            })

            }  
            else  if(n == 8){             
                  this.setState({
                  month:'September'
            })

            }  
            else  if(n == 9){             
                  this.setState({
                  month:'October'
            })

            }  
            else  if(n == 10){             
                  this.setState({
                  month:'November'
            })

            }  
            else if(n == 11){             
                        this.setState({
                        month:'December'
                  })

            }  
            else{
                              
                        this.setState({
                        month:'N/A'
                  })   
            }
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

            console.log("date" , num)
            this.setState({
                  selecteddate : num
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

                              <View style={{color:'white' , width:'100%' , backgroundColor:'#103056' , marginTop:5 ,padding:15, alignSelf:'center'}}>
            <Text style={{alignSelf:'center' , color:'white'}}>{this.state.month}</Text>
          </View>

          <View style={{height:70 , backgroundColor:'#103056'}}>
                          <ScrollView  style={{backgroundColor:'#103056' , height:70 , marginLeft:20 , marginRight:20}}
                          horizontal
                          >

                              <TouchableOpacity
                              onPress={() => this.onPress1("1" +"-" + this.state.month) }
                              style={{flexDirection:'column' , margin:5}}>
                                    <Text style={{alignSelf:'center' , color:'white'}}>1</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center' , color:'white'}}>Mon</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                 onPress={() => this.onPress1("2" +"-" + this.state.month) }
                              style={{flexDirection:'column' , margin:5}}>
                                    <Text style={{alignSelf:'center', color:'white'}}>2</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Tue</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                    onPress={() => this.onPress1("3" +"-" + this.state.month) } style={{flexDirection:'column' , margin:5}}>
                                    <Text style={{alignSelf:'center', color:'white'}}>3</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Mon</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                 onPress={() => this.onPress1("4" +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                              <Text style={{alignSelf:'center', color:'white'}}>4</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Tue</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("5" +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                                    <Text style={{alignSelf:'center', color:'white'}}>5</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Mon</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("6" +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                              <Text style={{alignSelf:'center', color:'white'}}>6</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Tue</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("7" +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                                    <Text style={{alignSelf:'center', color:'white'}}>7</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Mon</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("8" +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                              <Text style={{alignSelf:'center', color:'white'}}>8</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Tue</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("9" +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                                    <Text style={{alignSelf:'center', color:'white'}}>9</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Mon</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("10" +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                              <Text style={{alignSelf:'center', color:'white'}}>10</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Tue</Text>


                              </TouchableOpacity>

                              <TouchableOpacity 
                                   onPress={() => this.onPress1("11" +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                                    <Text style={{alignSelf:'center', color:'white'}}>11</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Mon</Text>


                              </TouchableOpacity>

                              <TouchableOpacity 
                                   onPress={() => this.onPress1("12" +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                              <Text style={{alignSelf:'center', color:'white'}}>12</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Tue</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("13" +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                                    <Text style={{alignSelf:'center', color:'white'}}>13</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Mon</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("14" +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                              <Text style={{alignSelf:'center', color:'white'}}>14</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Tue</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("15" +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                                    <Text style={{alignSelf:'center', color:'white'}}>15</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Mon</Text>


                              </TouchableOpacity>

                              <TouchableOpacity 
                                   onPress={() => this.onPress1("16" +"-" + this.state.month )}
                              style={{flexDirection:'column' , margin:5}}>
                              <Text style={{alignSelf:'center', color:'white'}}>16</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Tue</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("17"  +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                                    <Text style={{alignSelf:'center', color:'white'}}>17</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Mon</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("18"  +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                              <Text style={{alignSelf:'center', color:'white'}}>18</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Tue</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("19"  +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                                    <Text style={{alignSelf:'center', color:'white'}}>19</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Mon</Text>


                              </TouchableOpacity>

                              <TouchableOpacity 
                                   onPress={() => this.onPress1("20"  +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                              <Text style={{alignSelf:'center', color:'white'}}>20</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Tue</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("21"  +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                                    <Text style={{alignSelf:'center', color:'white'}}>21</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Mon</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("22" +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                              <Text style={{alignSelf:'center', color:'white'}}>22</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Tue</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("23" +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                                    <Text style={{alignSelf:'center', color:'white'}}>23</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Mon</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("24" +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                              <Text style={{alignSelf:'center', color:'white'}}>24</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Tue</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("25"  +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                                    <Text style={{alignSelf:'center', color:'white'}}>25</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Mon</Text>


                              </TouchableOpacity>

                              <TouchableOpacity 
                                   onPress={() => this.onPress1("26"  +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                              <Text style={{alignSelf:'center', color:'white'}}>26</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Tue</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("27"  +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                                    <Text style={{alignSelf:'center', color:'white'}}>27</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Mon</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("28"  +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                              <Text style={{alignSelf:'center', color:'white'}}>28</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Tue</Text>


                              </TouchableOpacity>

                              <TouchableOpacity 
                                   onPress={() => this.onPress1("29"  +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                                    <Text style={{alignSelf:'center', color:'white'}}>29</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Mon</Text>


                              </TouchableOpacity>

                              <TouchableOpacity 
                                   onPress={() => this.onPress1("30" +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                              <Text style={{alignSelf:'center', color:'white'}}>30</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Tue</Text>


                              </TouchableOpacity>

                              <TouchableOpacity
                                   onPress={() => this.onPress1("31" +"-" + this.state.month)}
                              style={{flexDirection:'column' , margin:5}}>
                                    <Text style={{alignSelf:'center', color:'white'}}>31</Text>
                                    <Text style={{fontSize:10 , alignSelf:'center', color:'white'}}>Mon</Text>


                              </TouchableOpacity>

                            
                          </ScrollView>


          </View>



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