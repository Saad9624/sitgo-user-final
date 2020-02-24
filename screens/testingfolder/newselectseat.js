import React from 'react';
import { View, Text , Image , ImageBackground , StyleSheet , FlatList ,
TextInput ,
TouchableOpacity,
Dimensions,
StatusBar,
Keyboard ,Platform ,AsyncStorage
} from 'react-native';
import tickimage from '../../assets/images/tick/tick.png' ;
import blacktick from '../../assets/images/check.png';
import * as Font from 'expo-font';
import Modal from 'react-native-modal';

import en from './../../strings/en.json' ;
import ur from './../../strings/ur.json' ;
import si from './../../strings/si.json' ;
import i18n from 'i18n-js';
import Toast, {DURATION} from 'react-native-easy-toast'


export default class newselectseat extends React.Component {

    static navigationOptions ={
        header: null
    }
    state = {
     visibleModal: null,
     seatprice:'',
     lang:''
     
}


     async componentWillMount(){
      await Font.loadAsync({
        'opreg': require('./../../assets/fonts/opreg.ttf'),
      });
  
      this.setState({ fontLoaded: true });

     const bus_id = this.props.navigation.state.params.BUS_ID 
      console.log("bus_id" , bus_id)
      this.get_bus_information(bus_id)
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
  
     }

    bus_info_call(bus_id){
      const baseUrl = "https://hitsofficialpk.com/sitgo/stops/singlebus?";
     const param = `busid=${bus_id}&language=${this.state.lang}`;
     return `${baseUrl}${param}`;
 
   }
   get_bus_information1 = async (bus_id) => {

    try{

       const url = this.bus_info_call(bus_id)
       console.log(url)

       let response = await fetch(url)
      // let response = await fetch(`https://hitsofficialpk.com/sitgo/stops/bus?stopid=${this.state.stopid}`)

       const completeresponse =  await response.json()
       console.log("response " , completeresponse)

       if(completeresponse.message == 'Bus Found'){


           console.log("underif_in_businfo")
           const seats = completeresponse.stops[0].seats
            const price = completeresponse.stops[0].price
            this.setState({
              seatprice:  price
            })
         

            // for(var i = 0 ; i < seats.length ; i++){
            //   var seatname = seats[i].seatname 
             
            // }

            if(seats.length > 0 ){

              for(var i = 0 ; i < seats.length ; i++){

                
                var status = seats[i].seatstatus 
                //console.log("status of all seats" , status)
                if(status == 0 ){
                  var seatname = seats[i].seatname 
                  console.log("name of all available seats" , seatname)

                  if(seatname != '1a'){
                    this.setState({
                      one_a_image:true ,
                      one_a : false ,
                      touch1a: true
                    })
                  }

                  else if(seatname == '1b'){
                    this.setState({
                      one_b_image:true ,
                      one_b : false ,
                      touch1b: true
                    })
                  }




                }
               

              
              }

          //   var status1 = seats[0].seatstatus 
          // //1 = occupied
          // //0 = vacant
          //   if(status1 == '1'){
          //     this.setState({
          //       one_a_image:true ,
          //       one_a : false ,
          //       touch1a: true
          //     })
          //   }
          //   else{
          //     this.setState({
          //       one_a_image:false ,
          //       one_a : true ,
          //       touch1a: false
          //     })
          //   }

          // }
            

          // if(seats.length > 1 ){

          //   var status2 = seats[1].seatstatus
          //    if(status2 == '1'){
          //     this.setState({
          //       one_b_image:true ,
          //       one_b : false ,
          //       touch1b :true ,
          //     })
          //   }
          //   else{
          //     this.setState({
          //       one_b_image:false ,
          //       one_b : true ,
          //       touch1b : false ,
          //     })
          //   }
          //  }


          //  if(seats.length > 2 ){
           

          //   var status3 = seats[2].seatstatus
          //    if(status3 == '1'){
          //     this.setState({
          //       one_c_image:true ,
          //       one_c : false  ,
          //       touch1c: true ,
          //     })
          //   }
          //   else{
          //     this.setState({
          //       one_c_image:false ,
          //       one_c : true ,
          //       touch1c: false
          //     })
          //   }
          //  }

          //  if(seats.length > 3 ){
           

          //   var status4 = seats[3].seatstatus
          //    if(status4 == '1'){
          //     this.setState({
          //       one_d_image:true ,
          //       one_d : false  ,
          //       touch1d: true 
          //     })
          //   }
          //   else{
          //     this.setState({
          //       one_d_image:false ,
          //       one_d : true ,
          //       touch1d : false
          //     })
          //   }
          //  }

       }
      }

    }
    catch(e){
        console.log(e)
    }
 }

   get_bus_information = async (bus_id) => {

      try{

         const url = this.bus_info_call(bus_id)
         console.log(url)

         let response = await fetch(url)
        // let response = await fetch(`https://hitsofficialpk.com/sitgo/stops/bus?stopid=${this.state.stopid}`)

         const completeresponse =  await response.json()
         console.log("response " , completeresponse)

         if(completeresponse.message == 'Bus Found'){


             console.log("underif_in_businfo")
             const seats = completeresponse.stops[0].seats
              const price = completeresponse.stops[0].price
              this.setState({
                seatprice:  price
              })
           

              // for(var i = 0 ; i < seats.length ; i++){
              //   var seatname = seats[i].seatname 
               
              // }
              if(seats.length > 0 ){

              var status1 = seats[0].seatstatus 
            //1 = occupied
            //0 = vacant
              if(status1 == '1'){
                this.setState({
                  one_a_image:true ,
                  one_a : false ,
                  touch1a: true
                })
              }
              else{
                this.setState({
                  one_a_image:false ,
                  one_a : true ,
                  touch1a: false
                })
              }

            }
              

            if(seats.length > 1 ){

              var status2 = seats[1].seatstatus
               if(status2 == '1'){
                this.setState({
                  one_b_image:true ,
                  one_b : false ,
                  touch1b :true ,
                })
              }
              else{
                this.setState({
                  one_b_image:false ,
                  one_b : true ,
                  touch1b : false ,
                })
              }
             }


             if(seats.length > 2 ){
             

              var status3 = seats[2].seatstatus
               if(status3 == '1'){
                this.setState({
                  one_c_image:true ,
                  one_c : false  ,
                  touch1c: true ,
                })
              }
              else{
                this.setState({
                  one_c_image:false ,
                  one_c : true ,
                  touch1c: false
                })
              }
             }

             if(seats.length > 3 ){
             

              var status4 = seats[3].seatstatus
               if(status4 == '1'){
                this.setState({
                  one_d_image:true ,
                  one_d : false  ,
                  touch1d: true 
                })
              }
              else{
                this.setState({
                  one_d_image:false ,
                  one_d : true ,
                  touch1d : false
                })
              }
             }

             if(seats.length > 4 ){
             

              var status5 = seats[4].seatstatus
               if(status5 == '1'){
                this.setState({
                  two_a_image:true ,
                  two_a : false  ,
                  touch2a: true 
                })
              }
              else{
                this.setState({
                  two_a_image:false ,
                  two_a : true ,
                  touch2a : false
                })
              }
             }

             if(seats.length > 5 ){
             

              var status6 = seats[5].seatstatus
               if(status6 == '1'){
                this.setState({
                  two_b_image:true ,
                  two_b : false  ,
                  touch2b: true 
                })
              }
              else{
                this.setState({
                  two_b_image:false ,
                  two_b : true ,
                  touch2b : false
                })
              }
             }


             
             if(seats.length > 6 ){
             

              var status7 = seats[6].seatstatus
               if(status7 == '1'){
                this.setState({
                  two_c_image:true ,
                  two_c : false  ,
                  touch2c: true 
                })
              }
              else{
                this.setState({
                  two_c_image:false ,
                  two_c : true ,
                  touch2c : false
                })
              }
             }

             if(seats.length > 7 ){
             

              var status8 = seats[7].seatstatus
               if(status8 == '1'){
                this.setState({
                  two_d_image:true ,
                  two_d : false  ,
                  touch2d: true 
                })
              }
              else{
                this.setState({
                  two_d_image:false ,
                  two_d : true ,
                  touch2d : false
                })
              }
             }

         }
        

      }
      catch(e){
          console.log(e)
      }
   }



constructor(props){
    super(props) 
    this.state = {
         stops:[] , 

         touch1a: false ,   
         touch1b: false ,
         touch1c: false ,
         touch1d: false ,

         touch2a: false ,
         touch2b: false ,
         touch2c: false ,
         touch2d: false ,

         touch3a: false ,
         touch3b: false ,
         touch3c: false ,
         touch3d: false ,

         touch4a: false ,
         touch4b: false ,

         touch5a: false ,   
         touch5b: false ,
         touch5c: false ,
         touch5d: false ,

         touch6a: false ,
         touch6b: false ,
         touch6c: false ,
         touch6d: false ,

         touch7a: false ,
         touch7b: false ,
         touch7c: false ,
         touch7d: false ,

         touch8a: false ,
         touch8b: false ,
         touch8c: false ,
         touch8d: false ,

        fontLoaded: false,
        selectedtext:false ,

         one_a_image: false ,
         one_b_image:false ,
         one_c_image: false ,
         one_d_image:false ,
         one_a : true ,
         one_b :true,
         one_c : true ,
         one_d :true,

         two_a_image: false ,
         two_b_image:false ,
         two_c_image: false ,
         two_d_image:false ,
         two_a : true ,
         two_b :true,
         two_c : true ,
         two_d :true,

         three_a_image: false ,
         three_b_image:false ,
         three_c_image: false ,
         three_d_image:false ,
         three_a : true ,
         three_b :true,
         three_c : true ,
         three_d :true,

         four_a_image: false ,
         four_b_image:false ,
         four_c_image: false ,
         four_d_image:false ,
         four_a : true ,
         four_b :true,
         four_c : true ,
         four_d :true,

         five_a_image: false ,
         five_b_image:false ,
         five_c_image: false ,
         five_d_image:false ,
         five_a : true ,
         five_b :true,
         five_c : true ,
         five_d :true,

         sixth_a_image: false ,
         sixth_b_image:false ,
         sixth_c_image: false ,
         sixth_d_image:false ,
         sixth_a : true ,
         sixth_b :true,
         sixth_c : true ,
         sixth_d :true,

         seven_a_image: false ,
         seven_b_image:false ,
         seven_c_image: false ,
         seven_d_image:false ,
         seven_a : true ,
         seven_b :true,
         seven_c : true ,
         seven_d :true,

         eight_a_image: false ,
         eight_b_image:false ,
         eight_c_image: false ,
         eight_d_image:false ,
         eight_a : true ,
         eight_b :true,
         eight_c : true ,
         eight_d :true,
        
        }
    
}

async componentDidMount() {
   
  }

  check_the_counr_of_seats  = async () => {

    this.setState({
      visibleModal: null
    })


    //toucha is false (checking ) because if seat is already occupied then it will become false from service 
    var arr=[]
      if(this.state.one_a_image == true && this.state.touch1a == false ){
        arr.push("1a")
      }
  
      if(this.state.one_b_image == true && this.state.touch1b == false ){
        arr.push("1b")
      }
      if(this.state.one_c_image == true && this.state.touch1c == false ){
        arr.push("1c")
      }
      if(this.state.one_d_image == true && this.state.touch1d == false ){
        arr.push("1d")
      }
  
      if(this.state.two_a_image == true && this.state.touch2a == false){
        arr.push("2a")
      }
      if(this.state.two_b_image == true && this.state.touch2b == false ){
        arr.push("2b")
      }
      if(this.state.two_c_image == true && this.state.touchc == false){
        arr.push("2c")
      }
      if(this.state.two_d_image == true && this.state.touch2d == false ){
        arr.push("2d")
      }
  
      if(this.state.three_a_image == true && this.state.touch3a == false){
        arr.push("3a")
      }
      if(this.state.three_b_image == true && this.state.touch3b == false ){
        arr.push("3b")
      }
      if(this.state.three_c_image == true  && this.state.touch3c == false){
        arr.push("3c")
      }
      if(this.state.three_d_image == true && this.state.touch3d == false ){
        arr.push("3d")
      }
  
      if(this.state.four_a_image == true && this.state.touch4a == false){
        arr.push("4a")
      }
      if(this.state.four_b_image == true && this.state.touch4b == false ){
        arr.push("4b")
      }
      
  
      if(this.state.five_a_image == true && this.state.touch5a == false){
        arr.push("5a")
      }
      if(this.state.five_b_image == true && this.state.touch5b == false ){
        arr.push("5b")
      }
      if(this.state.five_c_image == true && this.state.touch5c == false ){
        arr.push("5c")
      }
      if(this.state.five_d_image == true && this.state.touch5d == false ){
        arr.push("5d")
      }
  
  
      if(this.state.sixth_a_image == true && this.state.touch6a == false){
        arr.push("6a")
      }
      if(this.state.sixth_b_image == true && this.state.touch6b == false ){
        arr.push("6b")
      }
      if(this.state.sixth_c_image == true && this.state.touch6c == false){
        arr.push("6c")
      }
      if(this.state.sixth_d_image == true  && this.state.touch6d == false){
        arr.push("6d")
      }
  
      if(this.state.seven_a_image == true && this.state.touch7a == false){
        arr.push("7a")
      }
      if(this.state.seven_b_image == true && this.state.touch7b == false ){
        arr.push("7b")
      }
      if(this.state.seven_c_image == true && this.state.touch7c == false){
        arr.push("7c")
      }
      if(this.state.seven_d_image == true  && this.state.touch7d == false){
        arr.push("7d")
      }
  
      if(this.state.eight_a_image == true && this.state.touch8a == false){
        arr.push("8a")
      }
      if(this.state.eight_b_image == true  && this.state.touch8b == false){
        arr.push("8b")
      }
      if(this.state.eight_c_image == true && this.state.touch8c == false){
        arr.push("8c")
      }
      if(this.state.eight_d_image == true && this.state.touch8d == false ){
        arr.push("8d")
      }

      if(arr.length > 2) {
        this.refs.toast.show("You cannot book more than two(2) seats", 500, () => {
          // something you want to do at close
       });
      } 
      else{
        this.props.navigation.navigate('BOOKING_DETAILS' ,{
          SEATS_NAME : arr ,
          SEAT_COUNT : arr.length ,
          PRICE: this.state.seatprice
        })
      }
  
      console.log(arr)
      console.log("seat length" ,arr.length)
  
  }

  openmodal = () =>{
    this.setState({
      visibleModal : 5
    })
  }

  closemodal = () =>{
    this.setState({
      visibleModal: null
    })
  }

  gotopayment = () => {
    this.setState({
      visibleModal: null
    })
    this.props.navigation.navigate('BOOKING_DETAILS')
  }

  _renderModalContent = () => (
    <View style={styles.modalContent}>
  
                <View   style={styles.payview} > 

                            <View style={{flexDirection:'row' , flex:1}} >

                                      <Text style={styles.payment}>{i18n.t('choose_payment_option')}</Text>

                                      <TouchableOpacity 
                                          style={{right:0 , position:'absolute' }}
                                       onPress = {() => this.closemodal()} >
                                              <Image
                                              style={{marginTop:15  , marginRight:15}}
                                              source={require('./../../assets/images/ddwhite/ddwhite.png')}></Image>
                                        </TouchableOpacity>

                              </View>

                  </View>

                  <TouchableOpacity onPress={() => this.check_the_counr_of_seats()}>
                       <Text style={{fontSize:15 , color:'#103056', padding:15,textAlign:'left'}}>{i18n.t('pay_on_arrival')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                  onPress={() =>this.check_the_counr_of_seats() }>
                       <Text style={{fontSize:15 , color:'#103056', padding:15,textAlign:'left'}}>{i18n.t('pay_through_credit_card')}</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                  onPress={() =>this.check_the_counr_of_seats() }>
                       <Text style={{fontSize:15 , color:'#103056', padding:15,textAlign:'left'}}>{i18n.t('Paywithwallet')}</Text>
                  </TouchableOpacity>
{/*      
      {this._renderButton('Close', () => this.setState({ visibleModal: null }))} */}
    </View>
  );


  renderImage1a = () => {
    if(this.state.one_a_image == true){
    
          this.setState({
              one_a_image:false ,
              one_a : true ,
              
          })
      }
      else{
    
          this.setState({
            one_a_image : true ,
            one_a : false  ,
            
          })
      }
    }  

  renderImage1b = () => {
    if(this.state.one_b_image == true){
          this.setState({
            one_b_image:false ,
            one_b : true ,
           
          })
      }
      else{
          this.setState({
            one_b_image:true ,
            one_b : false  ,
            
          })
      }
    }  

    renderImage1c = () => {
      if(this.state.one_c_image == true){
      
            this.setState({
                one_c_image:false ,
                one_c : true ,
                
            })
        }
        else{
      
            this.setState({
              one_c_image : true ,
              one_c : false  ,
              
            })
        }
      }  
  
    renderImage1d = () => {
      if(this.state.one_d_image == true){
            this.setState({
              one_d_image:false ,
              one_d : true ,
             
            })
        }
        else{
            this.setState({
              one_d_image:true ,
              one_d : false  ,
              
            })
        }
      } 

      renderImage2a = () => {
        if(this.state.two_a_image == true){
        
              this.setState({
                two_a_image:false ,
                two_a : true ,
                  
              })
          }
          else{
        
              this.setState({
                two_a_image : true ,
                two_a : false  ,
                
              })
          }
        }  
    
      renderImage2b = () => {
        if(this.state.two_b_image == true){
              this.setState({
                two_b_image:false ,
                two_b : true ,
               
              })
          }
          else{
              this.setState({
                two_b_image:true ,
                two_b : false  ,
                
              })
          }
        }  
    
        renderImage2c = () => {
          if(this.state.two_c_image == true){
          
                this.setState({
                  two_c_image:false ,
                  two_c : true ,
                    
                })
            }
            else{
          
                this.setState({
                  two_c_image : true ,
                  two_c : false  ,
                  
                })
            }
          }  
      
        renderImage2d = () => {
          if(this.state.two_d_image == true){
                this.setState({
                  two_d_image:false ,
                  two_d : true ,
                 
                })
            }
            else{
                this.setState({
                  two_d_image:true ,
                  two_d : false  ,
                  
                })
            }
          } 

          renderImage3a = () => {
            if(this.state.three_a_image == true){
            
                  this.setState({
                    three_a_image:false ,
                    three_a : true ,
                      
                  })
              }
              else{
            
                  this.setState({
                    three_a_image : true ,
                    three_a : false  ,
                    
                  })
              }
            }  
        
          renderImage3b = () => {
            if(this.state.three_b_image == true){
                  this.setState({
                    three_b_image:false ,
                    three_b : true ,
                   
                  })
              }
              else{
                  this.setState({
                    three_b_image:true ,
                    three_b : false  ,
                    
                  })
              }
            }  
        
            renderImage3c = () => {
              if(this.state.three_c_image == true){
              
                    this.setState({
                      three_c_image:false ,
                      three_c : true ,
                        
                    })
                }
                else{
              
                    this.setState({
                      three_c_image : true ,
                      three_c : false  ,
                      
                    })
                }
              }  
          
            renderImage3d = () => {
              if(this.state.three_d_image == true){
                    this.setState({
                      three_d_image:false ,
                      three_d : true ,
                     
                    })
                }
                else{
                    this.setState({
                      three_d_image:true ,
                      three_d : false  ,
                      
                    })
                }
              } 
    
              renderImage5a = () => {
                if(this.state.five_a_image == true){
                
                      this.setState({
                          five_a_image:false ,
                          five_a : true ,
                          
                      })
                  }
                  else{
                
                      this.setState({
                        five_a_image : true ,
                        five_a : false  ,
                        
                      })
                  }
                }  
            
              renderImage5b = () => {
                if(this.state.five_b_image == true){
                      this.setState({
                        five_b_image:false ,
                        five_b : true ,
                       
                      })
                  }
                  else{
                      this.setState({
                        five_b_image:true ,
                        five_b : false  ,
                        
                      })
                  }
                }  
            
                renderImage5c = () => {
                  if(this.state.five_c_image == true){
                  
                        this.setState({
                          five_c_image:false ,
                          five_c : true ,
                            
                        })
                    }
                    else{
                  
                        this.setState({
                          five_c_image : true ,
                          five_c : false  ,
                          
                        })
                    }
                  }  
              
                renderImage5d = () => {
                  if(this.state.five_d_image == true){
                        this.setState({
                          five_d_image:false ,
                          five_d : true ,
                         
                        })
                    }
                    else{
                        this.setState({
                          five_d_image:true ,
                          five_d : false  ,
                          
                        })
                    }
                  } 

                  renderImage6a = () => {
                    if(this.state.sixth_a_image == true){
                    
                          this.setState({
                            sixth_a_image:false ,
                            sixth_a : true ,
                              
                          })
                      }
                      else{
                    
                          this.setState({
                            sixth_a_image : true ,
                            sixth_a : false  ,
                            
                          })
                      }
                    }  
                
                  renderImage6b = () => {
                    if(this.state.sixth_b_image == true){
                          this.setState({
                            sixth_b_image:false ,
                            sixth_b : true ,
                           
                          })
                      }
                      else{
                          this.setState({
                            sixth_b_image:true ,
                            sixth_b : false  ,
                            
                          })
                      }
                    }  
                
                    renderImage6c = () => {
                      if(this.state.sixth_c_image == true){
                      
                            this.setState({
                              sixth_c_image:false ,
                              sixth_c : true ,
                                
                            })
                        }
                        else{
                      
                            this.setState({
                              sixth_c_image : true ,
                              sixth_c : false  ,
                              
                            })
                        }
                      }  
                  
                    renderImage6d = () => {
                      if(this.state.sixth_d_image == true){
                            this.setState({
                              sixth_d_image:false ,
                              sixth_d : true ,
                             
                            })
                        }
                        else{
                            this.setState({
                              sixth_d_image:true ,
                              sixth_d : false  ,
                              
                            })
                        }
                      }
                      renderImage7a = () => {
                        if(this.state.seven_a_image == true){
                        
                              this.setState({
                                seven_a_image:false ,
                                seven_a : true ,
                                  
                              })
                          }
                          else{
                        
                              this.setState({
                                seven_a_image : true ,
                                seven_a : false  ,
                                
                              })
                          }
                        }  
                    
                      renderImage7b = () => {
                        if(this.state.seven_b_image == true){
                              this.setState({
                                seven_b_image:false ,
                                seven_b : true ,
                               
                              })
                          }
                          else{
                              this.setState({
                                seven_b_image:true ,
                                seven_b : false  ,
                                
                              })
                          }
                        }  
                    
                        renderImage7c = () => {
                          if(this.state.seven_c_image == true){
                          
                                this.setState({
                                  seven_c_image:false ,
                                  seven_c : true ,
                                    
                                })
                            }
                            else{
                          
                                this.setState({
                                  seven_c_image : true ,
                                  seven_c : false  ,
                                  
                                })
                            }
                          }  
                      
                        renderImage7d = () => {
                          if(this.state.seven_d_image == true){
                                this.setState({
                                  seven_d_image:false ,
                                  seven_d : true ,
                                 
                                })
                            }
                            else{
                                this.setState({
                                  seven_d_image:true ,
                                  seven_d : false  ,
                                  
                                })
                            }
                          } 




                          renderImage8a = () => {
                            if(this.state.eight_a_image == true){
                            
                                  this.setState({
                                    eight_a_image:false ,
                                    eight_a : true ,
                                      
                                  })
                              }
                              else{
                            
                                  this.setState({
                                    eight_a_image : true ,
                                    eight_a : false  ,
                                    
                                  })
                              }
                            }  
                        
                          renderImage8b = () => {
                            if(this.state.eight_b_image == true){
                                  this.setState({
                                    eight_b_image:false ,
                                    eight_b : true ,
                                   
                                  })
                              }
                              else{
                                  this.setState({
                                    eight_b_image:true ,
                                    eight_b : false  ,
                                    
                                  })
                              }
                            }  
                        
                            renderImage8c = () => {
                              if(this.state.eight_c_image == true){
                              
                                    this.setState({
                                      eight_c_image:false ,
                                      eight_c : true ,
                                        
                                    })
                                }
                                else{
                              
                                    this.setState({
                                      eight_c_image : true ,
                                      eight_c : false  ,
                                      
                                    })
                                }
                              }  
                          
                            renderImage8d = () => {
                              if(this.state.eight_d_image == true){
                                    this.setState({
                                      eight_d_image:false ,
                                      eight_d : true ,
                                     
                                    })
                                }
                                else{
                                    this.setState({
                                      eight_d_image:true ,
                                      eight_d : false  ,
                                      
                                    })
                                }
                              } 


                              renderImage4a = () => {
                                if(this.state.four_a_image == true){
                                
                                      this.setState({
                                        four_a_image:false ,
                                        four_a : true ,
                                          
                                      })
                                  }
                                  else{
                                
                                      this.setState({
                                        four_a_image : true ,
                                        four_a : false  ,
                                        
                                      })
                                  }
                                }  
                            
                              renderImage4b = () => {
                                if(this.state.four_b_image == true){
                                      this.setState({
                                        four_b_image:false ,
                                        four_b : true ,
                                       
                                      })
                                  }
                                  else{
                                      this.setState({
                                        four_b_image:true ,
                                        four_b : false  ,
                                        
                                      })
                                  }
                                } 
                      
                                check_selected_seats= async () => {
                                    if(this.state.touch1a == true){
                                      console.log("1a selected")

                                    }
                                    else{
                                      console.log("1a notselected")
                                    }
                                }
    
  render() {
    return (
        <View style={{flex:1 , backgroundColor:'#E8ECF5'}}>

            

                <View style={styles.statusBarBackground}></View>
                <StatusBar hidden={false} />
                        <StatusBar barStyle={'dark-content'} backgroundColor ={'#FFFFFF'} translucent={true} /> 
          

         
                        <View style={{ flexDirection: 'row', backgroundColor:'#ffffff' ,height:60 }}>
                                        <TouchableOpacity 
                                                        onPress={() => this.props.navigation.goBack()}
                                                        >

                                                        <Image style={{marginTop:15 ,  marginLeft:25}} source={require('./../../assets/images/backbtn/back.png')}></Image>

                                                        </TouchableOpacity>

                                        <View style={{flexDirection:'column' , marginLeft:25}}>
                                            <Text style={{fontSize:25 , marginTop:10 , fontWeight:'bold'}}>{i18n.t('select_your_seats')}</Text>
                                     
                                        </View>
                              </View>

          <View style={{flexDirection:'row' , alignSelf:'center'}}>
          <Text style={{marginLeft:10 , marginRight:10}}>{i18n.t('seatprice')}  </Text>
            <Text>{this.state.seatprice}</Text>
          </View>

                              <View style={{flexDirection:"row" , alignSelf:'center' ,justifyContent:'space-around' ,marginBottom:20 , marginTop:20}}>

                                                  <View style={{flexDirection:'row' , marginRight: 30}}>


                                                                    <TouchableOpacity
                                                                                disabled={this.state.touch1a}
                                                                                onPress={() => this.renderImage1a()}
                                                                                style={styles.checkbox}>
                                                                            
                                                                                {this.state.one_a_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                                                
                                                                                {this.state.one_a && <Text  style={styles.toCenter}>1a</Text> } 
                                                                              
                                                                                    
                                                                    </TouchableOpacity> 

                                                                    <TouchableOpacity
                                                                                    disabled={this.state.touch1b}
                                                                                    onPress={() => this.renderImage1b()}
                                                                                    style={styles.checkbox}>
                                                                                
                                                                                    {this.state.one_b_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                                                    {this.state.one_b && <Text  style={styles.toCenter}>1b</Text> }
                                                                                
                                                                    </TouchableOpacity>

                                                  </View>

                                                  <View style={{flexDirection:'row' , marginLeft: 30}}>


                                                                    <TouchableOpacity disabled={this.state.touch1c}

                                                                                onPress={() => this.renderImage1c()}
                                                                                style={styles.checkbox}>
                                                                            
                                                                                {this.state.one_c_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                                                
                                                                                {this.state.one_c && <Text  style={styles.toCenter}>1c</Text> } 
                                                                              
                                                                                    
                                                                    </TouchableOpacity>

                                                                    <TouchableOpacity 
                                                                                  disabled={this.state.touch1d}

                                                                                    onPress={() => this.renderImage1d()}
                                                                                    style={styles.checkbox}>
                                                                                
                                                                                    {this.state.one_d_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                                                    {this.state.one_d && <Text  style={styles.toCenter}>1d</Text> }
                                                                                
                                                                    </TouchableOpacity>

                                                  </View>

                                                  

                              </View>

                                        
                              <View style={styles.mainview}>

                                          <View style={{flexDirection:'row' , marginRight: 30}}>


                                                            <TouchableOpacity
                                                             disabled={this.state.touch2a}
                                                                        onPress={() => this.renderImage2a()}
                                                                        style={styles.checkbox}>
                                                                    
                                                                        {this.state.two_a_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                                        
                                                                        {this.state.two_a && <Text  style={styles.toCenter}>2a</Text> } 
                                                                      
                                                                            
                                                            </TouchableOpacity>

                                                            <TouchableOpacity disabled={this.state.touch2b}

                                                                            onPress={() => this.renderImage2b()}
                                                                            style={styles.checkbox}>
                                                                        
                                                                            {this.state.two_b_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                                            {this.state.two_b && <Text  style={styles.toCenter}>2b</Text> }
                                                                        
                                                            </TouchableOpacity>

                                          </View>

                                          <View style={{flexDirection:'row' , marginLeft: 30}}>


                                                            <TouchableOpacity disabled={this.state.touch2c}

                                                                        onPress={() => this.renderImage2c()}
                                                                        style={styles.checkbox}>
                                                                    
                                                                        {this.state.two_c_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                                        
                                                                        {this.state.two_c && <Text  style={styles.toCenter}>2c</Text> } 
                                                                      
                                                                            
                                                            </TouchableOpacity>

                                                            <TouchableOpacity  disabled={this.state.touch2d}

                                                                            onPress={() => this.renderImage2d()}
                                                                            style={styles.checkbox}>
                                                                        
                                                                            {this.state.two_d_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                                            {this.state.two_d && <Text  style={styles.toCenter}>2d</Text> }
                                                                        
                                                            </TouchableOpacity>

                                          </View>



                      </View>

                              <View style={styles.mainview}>

                      <View style={{flexDirection:'row' , marginRight: 30}}>


                                        <TouchableOpacity

                                                    onPress={() => this.renderImage3a()}
                                                    style={styles.checkbox}>
                                                
                                                    {this.state.three_a_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                    
                                                    {this.state.three_a && <Text  style={styles.toCenter}>3a</Text> } 
                                                  
                                                        
                                        </TouchableOpacity>

                                        <TouchableOpacity

                                                        onPress={() => this.renderImage3b()}
                                                        style={styles.checkbox}>
                                                    
                                                        {this.state.three_b_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                        {this.state.three_b && <Text  style={styles.toCenter}>3b</Text> }
                                                    
                                        </TouchableOpacity>

                      </View>

                      <View style={{flexDirection:'row' , marginLeft: 30}}>


                                        <TouchableOpacity

                                                    onPress={() => this.renderImage3c()}
                                                    style={styles.checkbox}>
                                                
                                                    {this.state.three_c_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                    
                                                    {this.state.three_c && <Text  style={styles.toCenter}>3c</Text> } 
                                                  
                                                        
                                        </TouchableOpacity>

                                        <TouchableOpacity

                                                        onPress={() => this.renderImage3d()}
                                                        style={styles.checkbox}>
                                                    
                                                        {this.state.three_d_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                        {this.state.three_d && <Text  style={styles.toCenter}>3d</Text> }
                                                    
                                        </TouchableOpacity>

                      </View>



                      </View>

                              <View style={styles.mainview}>

                                    <View style={{flexDirection:'row' , marginRight: 30}}>


                                        <TouchableOpacity

                                                    
                                                    style={styles.checkbox1}>
                                                
                                                    
                                                  
                                                        
                                        </TouchableOpacity>

                                        <TouchableOpacity

                                                        style={styles.checkbox1}>
                                                    
                                                    
                                        </TouchableOpacity>

                      </View>

                      <View style={{flexDirection:'row' , marginLeft: 30}}>


                                        <TouchableOpacity

                                                    onPress={() => this.renderImage4a()}
                                                    style={styles.checkbox}>
                                                
                                                    {this.state.four_a_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                    
                                                    {this.state.four_a && <Text  style={styles.toCenter}>4a</Text> } 
                                                  
                                                        
                                        </TouchableOpacity>

                                        <TouchableOpacity

                                                        onPress={() => this.renderImage4b()}
                                                        style={styles.checkbox}>
                                                    
                                                        {this.state.four_b_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                        {this.state.four_b && <Text  style={styles.toCenter}>4b</Text> }
                                                    
                                        </TouchableOpacity>

                      </View>



                      </View>

                              <View style={styles.mainview}>

                                                  <View style={{flexDirection:'row' , marginRight: 30}}>


                                                                    <TouchableOpacity

                                                                                onPress={() => this.renderImage5a()}
                                                                                style={styles.checkbox}>
                                                                            
                                                                                {this.state.five_a_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                                                
                                                                                {this.state.five_a && <Text  style={styles.toCenter}>5a</Text> } 
                                                                              
                                                                                    
                                                                    </TouchableOpacity>

                                                                    <TouchableOpacity

                                                                                    onPress={() => this.renderImage5b()}
                                                                                    style={styles.checkbox}>
                                                                                
                                                                                    {this.state.five_b_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                                                    {this.state.five_b && <Text  style={styles.toCenter}>5b</Text> }
                                                                                
                                                                    </TouchableOpacity>

                                                  </View>

                                                  <View style={{flexDirection:'row' , marginLeft: 30}}>


                                                                    <TouchableOpacity

                                                                                onPress={() => this.renderImage5c()}
                                                                                style={styles.checkbox}>
                                                                            
                                                                                {this.state.five_c_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                                                
                                                                                {this.state.five_c && <Text  style={styles.toCenter}>5c</Text> } 
                                                                              
                                                                                    
                                                                    </TouchableOpacity>

                                                                    <TouchableOpacity

                                                                                    onPress={() => this.renderImage5d()}
                                                                                    style={styles.checkbox}>
                                                                                
                                                                                    {this.state.five_d_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                                                    {this.state.five_d && <Text  style={styles.toCenter}>5d</Text> }
                                                                                
                                                                    </TouchableOpacity>

                                                  </View>

                                                  

                              </View>

                              <View style={styles.mainview}>

                      <View style={{flexDirection:'row' , marginRight: 30}}>


                                        <TouchableOpacity

                                                    onPress={() => this.renderImage6a()}
                                                    style={styles.checkbox}>
                                                
                                                    {this.state.sixth_a_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                    
                                                    {this.state.sixth_a && <Text  style={styles.toCenter}>6a</Text> } 
                                                  
                                                        
                                        </TouchableOpacity>

                                        <TouchableOpacity

                                                        onPress={() => this.renderImage6b()}
                                                        style={styles.checkbox}>
                                                    
                                                        {this.state.sixth_b_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                        {this.state.sixth_b && <Text  style={styles.toCenter}>6b</Text> }
                                                    
                                        </TouchableOpacity>

                      </View>

                      <View style={{flexDirection:'row' , marginLeft: 30}}>


                                        <TouchableOpacity

                                                    onPress={() => this.renderImage6c()}
                                                    style={styles.checkbox}>
                                                
                                                    {this.state.sixth_c_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                    
                                                    {this.state.sixth_c && <Text  style={styles.toCenter}>6c</Text> } 
                                                  
                                                        
                                        </TouchableOpacity>

                                        <TouchableOpacity

                                                        onPress={() => this.renderImage6d()}
                                                        style={styles.checkbox}>
                                                    
                                                        {this.state.sixth_d_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                        {this.state.sixth_d && <Text  style={styles.toCenter}>6d</Text> }
                                                    
                                        </TouchableOpacity>

                      </View>



                      </View>

                              <View style={styles.mainview}>

                      <View style={{flexDirection:'row' , marginRight: 30}}>


                                        <TouchableOpacity

                                                    onPress={() => this.renderImage7a()}
                                                    style={styles.checkbox}>
                                                
                                                    {this.state.seven_a_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                    
                                                    {this.state.seven_a && <Text  style={styles.toCenter}>7a</Text> } 
                                                  
                                                        
                                        </TouchableOpacity>

                                        <TouchableOpacity

                                                        onPress={() => this.renderImage7b()}
                                                        style={styles.checkbox}>
                                                    
                                                        {this.state.seven_b_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                        {this.state.seven_b && <Text  style={styles.toCenter}>7b</Text> }
                                                    
                                        </TouchableOpacity>

                      </View>

                      <View style={{flexDirection:'row' , marginLeft: 30}}>


                                        <TouchableOpacity

                                                    onPress={() => this.renderImage7c()}
                                                    style={styles.checkbox}>
                                                
                                                    {this.state.seven_c_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                    
                                                    {this.state.seven_c && <Text  style={styles.toCenter}>7c</Text> } 
                                                  
                                                        
                                        </TouchableOpacity>

                                        <TouchableOpacity

                                                        onPress={() => this.renderImage7d()}
                                                        style={styles.checkbox}>
                                                    
                                                        {this.state.seven_d_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                        {this.state.seven_d && <Text  style={styles.toCenter}>7d</Text> }
                                                    
                                        </TouchableOpacity>

                      </View>



                      </View>

                              <View style={styles.mainview}>

                      <View style={{flexDirection:'row' , marginRight: 30}}>


                                        <TouchableOpacity

                                                    onPress={() => this.renderImage8a()}
                                                    style={styles.checkbox}>
                                                
                                                    {this.state.eight_a_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                    
                                                    {this.state.eight_a && <Text  style={styles.toCenter}>8a</Text> } 
                                                  
                                                        
                                        </TouchableOpacity>

                                        <TouchableOpacity

                                                        onPress={() => this.renderImage8b()}
                                                        style={styles.checkbox}>
                                                    
                                                        {this.state.eight_b_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                        {this.state.eight_b && <Text  style={styles.toCenter}>8b</Text> }
                                                    
                                        </TouchableOpacity>

                      </View>

                      <View style={{flexDirection:'row' , marginLeft: 30}}>


                                        <TouchableOpacity

                                                    onPress={() => this.renderImage8c()}
                                                    style={styles.checkbox}>
                                                
                                                    {this.state.eight_c_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                    
                                                    {this.state.eight_c && <Text  style={styles.toCenter}>8c</Text> } 
                                                  
                                                        
                                        </TouchableOpacity>

                                        <TouchableOpacity

                                                        onPress={() => this.renderImage8d()}
                                                        style={styles.checkbox}>
                                                    
                                                        {this.state.eight_d_image && <Image  style={styles.toCenter}  source={ tickimage }/> }
                                                        {this.state.eight_d && <Text  style={styles.toCenter}>8d</Text> }
                                                    
                                        </TouchableOpacity>

                      </View>



                      </View>

                            
                   
                              <View style={styles.bottomview}>

                                            {!this.state.one_a  && <Text style={styles.bottomtext}>1A  </Text>  }
                                            {!this.state.one_b  &&  <Text style={styles.bottomtext}>1B  </Text>}
                                            {!this.state.one_c  && <Text style={styles.bottomtext}>1C  </Text>  }
                                            {!this.state.one_d  &&  <Text style={styles.bottomtext}>1D  </Text>}


                                            {!this.state.two_a  && <Text style={styles.bottomtext}>2A  </Text>  }
                                            {!this.state.two_b  &&  <Text style={styles.bottomtext}>2B  </Text>}
                                            {!this.state.two_c  && <Text style={styles.bottomtext}>2C  </Text>  }
                                            {!this.state.two_d  &&  <Text style={styles.bottomtext}>2D  </Text>}


                                            {!this.state.three_a  && <Text style={styles.bottomtext}>3A  </Text>  }
                                            {!this.state.three_b  &&  <Text style={styles.bottomtext}>3B  </Text>}
                                            {!this.state.three_c  && <Text style={styles.bottomtext}>3C  </Text>  }
                                            {!this.state.three_d  &&  <Text style={styles.bottomtext}>3D  </Text>}


                                            {!this.state.four_a  && <Text style={styles.bottomtext}>4A  </Text>  }
                                            {!this.state.four_b  &&  <Text style={styles.bottomtext}>4B  </Text>}
                                            {!this.state.four_c  && <Text style={styles.bottomtext}>4C  </Text>  }
                                            {!this.state.four_d  &&  <Text style={styles.bottomtext}>4D  </Text>}

                                            {!this.state.five_a  && <Text style={styles.bottomtext}>5A  </Text>  }
                                            {!this.state.five_b  &&  <Text style={styles.bottomtext}>5B  </Text>}
                                            {!this.state.five_c  && <Text style={styles.bottomtext}>5C  </Text>  }
                                            {!this.state.five_d  &&  <Text style={styles.bottomtext}>5D  </Text>}


                                            {!this.state.sixth_a  && <Text style={styles.bottomtext}>6A  </Text>  }
                                            {!this.state.sixth_b  &&  <Text style={styles.bottomtext}>6B  </Text>}
                                            {!this.state.sixth_c  && <Text style={styles.bottomtext}>6C  </Text>  }
                                            {!this.state.sixth_d  &&  <Text style={styles.bottomtext}>6D  </Text>}


                                            {!this.state.seven_a  && <Text style={styles.bottomtext}>7A  </Text>  }
                                            {!this.state.seven_b  &&  <Text style={styles.bottomtext}>7B  </Text>}
                                            {!this.state.seven_c  && <Text style={styles.bottomtext}>7C  </Text>  }
                                            {!this.state.seven_d  &&  <Text style={styles.bottomtext}>7D  </Text>}


                                            {!this.state.eight_a  && <Text style={styles.bottomtext}>8A  </Text>  }
                                            {!this.state.eight_b  &&  <Text style={styles.bottomtext}>8B  </Text>}
                                            {!this.state.eight_c  && <Text style={styles.bottomtext}>8C  </Text>  }
                                            {!this.state.eight_d  &&  <Text style={styles.bottomtext}>8D  </Text>}


                                </View> 
         
              {/* <TouchableOpacity style={{bottom:0 , right: 0 , position:'absolute' , marginRight:10 , marginBottom:10}}
              onPress={() => this.check_the_counr_of_seats() }
              >

              <Text>NEXT</Text>

              </TouchableOpacity> */}

              <TouchableOpacity
           onPress = {() => this.openmodal()}
            style={styles.payview1} >
                        <View style={{flexDirection:'row' , flex:1}} >

                                <Text style={styles.payment}>{i18n.t('choose_payment_option')}</Text>
                            
                            <Image
                            style={{marginTop:15 , right:0 , position:'absolute' , marginRight:15}}
                            source={require('./../../assets/images/duwhite/duwhite.png')}></Image>

                  </View>
            </TouchableOpacity>


            <Modal
                                    backdropColor={'transparent'}
                                    backdropTransitionOutTiming={0}
                                    isVisible={this.state.visibleModal === 5} style={styles.bottomModal}>
                                    {this._renderModalContent()}
          
                                 </Modal>
                      <Toast ref="toast"/>   
        </View>

        
    );
  }
}

const styles = StyleSheet.create({
    parent :{
        flex:1 ,
        backgroundColor:'#E8ECF5', 
    } ,
    statusBarBackground: {
        height: (Platform.OS === 'ios') ? 18 : Expo.Constants.statusBarHeight, 
              backgroundColor: "#FFFFFF",
      },
     checkbox: {
         alignContent:'center' , 
         justifyContent:'center' , 
         borderColor:'grey' , 
         borderWidth:2 , 
         width:35, 
         height:35 , 
         padding:5 ,
         backgroundColor:'white'
         },
         checkbox1: {
          alignContent:'center' , 
          justifyContent:'center' , 
          width:35, 
          height:35 , 
          padding:5 ,
          backgroundColor:'transparent'
          },
     toCenter:{
         alignSelf:'center' 
     } ,
     bottomview:{
         flexDirection:'row' ,
         bottom:0 , 
         position:'absolute' , 
         alignSelf:'center' , 
         fontSize:20 , 
         marginBottom:20
        
        },
        bottomtext:{
            fontSize:20 , 
            fontFamily:'opreg'
        
        },
        mainview:{flexDirection:"row" , 
        alignSelf:'center' ,
        justifyContent:'space-around' ,
         marginBottom:20}
         ,

     payview1:{width:'100%' , bottom:0 , position:'absolute' ,height:50 , backgroundColor:'#103056'} ,

    payment:{color:'white' , marginLeft:20 , marginTop:15 , fontSize:15,textAlign:'left'} ,
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

   
  });