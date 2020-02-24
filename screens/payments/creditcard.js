import React from 'react';
import { View, Text , Image , ImageBackground , StyleSheet ,
TextInput ,
TouchableOpacity,
Dimensions,
StatusBar, FlatList ,
Keyboard ,Platform ,AsyncStorage
} from 'react-native';

import Loading from 'react-native-whc-loading' ;
import baseurl from '../../components/baseurl' ;

export default class creditcard extends React.Component {

    static navigationOptions ={
        header: null
    }

    componentWillMount(){
        this._getStorageValue()
    }

    async _getStorageValue(){
        var userid = await AsyncStorage.getItem('USERID')
        console.log("userid" , userid)
       
    
        this.GETCARD(userid)
       
      }




constructor(props){
    super(props)

    this.state= {
        cardnumber:'1111 0000 1111 0000' ,
        date:'',
        cvc:'' ,
        name:'' ,
        width:0 ,
        height:0 ,
        cards :[]
          
        };

       

}
  
    gettingdata= () =>{
         CN = AsyncStorage.getItem("CN") 
         DATE = AsyncStorage.getItem("DATE") 
         CVC = AsyncStorage.getItem("CVC") 
         NAME = AsyncStorage.getItem("NAME") 
      
        if(CN != null || CN != ''){
            this.setState({
                cardnumber : CN  ,
                date :  DATE , 
                cvc: CVC, 
                name : NAME ,
                width : '90%',
                height:220
            })
        }
        else{
            this.setState({
                width:0 ,
                height:0
            })
        }
    
        console.log("width" , this.state.width)
        
    }

    GETCARD = async (userid) => {
        this.refs.loading2.show()
       

        try{
        
            console.log("try" , "under try")
    
            var details = {
                   
             "user_id" : userid ,
                
     };
     
     var formBody = [];
     for (var property in details) {
       var encodedKey = encodeURIComponent(property);
       var encodedValue = encodeURIComponent(details[property]);
       formBody.push(encodedKey + "=" + encodedValue);
     }
      formBody = formBody.join("&");
    
    
          fetch(baseurl.uatbaseurl + 'card/all',
          {
           
            method: 'POST',
               headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
              },
            
    
            body: formBody
      
           })
       
       
    
           .then((response) => response.json())
           
                  .then((responseJson) => {
                   
                       console.log('response object: ',responseJson)
                     
    
    
                       if(responseJson.success == true ){
                           this.refs.loading2.close()
                      
                        const allcards = responseJson.cards
                        this.setState({
                            cards :allcards
                        })
                      
                      }
                      else if(responseJson.responcecode == '001' ){
                        this.refs.loading2.close()
                      }
                      else{
                        this.refs.loading2.close()
                        alert(responseJson.success)
                      }
                  })
                  .catch((error) => {
                    this.refs.loading2.close()
                  console.error(error);
                  });
    
          
        }
        catch(e){
        
            this.refs.loading2.close()
          console.log("catch" , e)
          
        }
    
    
    
    }
  

    
  render() {
    return (
        <View style={{flex:1 , backgroundColor:'#E8ECF5'}}>

            

                <View style={styles.statusBarBackground}></View>
                <StatusBar hidden={false} />
                        <StatusBar barStyle={'light-content'} backgroundColor ={'#FFFFFF'} translucent={true} /> 
          

         
                        <View style={{ flexDirection: 'row', backgroundColor:'#ffffff' ,height:60 }}>
                                        <TouchableOpacity 
                                        onPress={() => this.props.navigation.goBack()}
                                        >

                                        <Image style={{marginTop:15 ,  marginLeft:25}} source={require('./../../assets/images/backbtn/back.png')}></Image>

                                        </TouchableOpacity>
                                       

                                        <View style={{flexDirection:'column' , marginLeft:25}}>
                                            <Text style={{fontSize:25 , marginTop:10 , fontWeight:'bold'}}>Add Credit Card</Text>
                                     
                                        </View>
                              </View>
          
                        {/* <View style={{bottom:0 ,position:'absolute', right:0 , marginRight:20 , marginBottom:20}}>
                                    <TouchableOpacity style={{flexDirection:'row' }}
                                     onPress={() => this.props.navigation.navigate('ADDCARD')}>
                                    
                                            <Text style={{marginRight:10 , marginTop:10 , fontSize:15 , fontWeight:'bold'}}>Add new Card</Text>
                                            <Image source={require('./../../assets/images/nextbtnblue/nextbtn.png')}></Image>

                                    </TouchableOpacity>
                                    
                            </View> */}


                      
                            <FlatList
                            data={ this.state.cards }
                            keyExtractor={(item,index)=>index}
                            renderItem={({item}) =>
                              ( 
                                  
                                <ImageBackground 
                                imageStyle={{ borderRadius: 10 }}
                                style={{marginTop:20 ,backgroundColor:'#313131' ,  width:'90%' , alignSelf:'center' , height:220 , marginRight:10 , marginLeft:10}}
                                >
        
                                <View style={{flexDirection:'column'}}>
                                
                                                
                                                <Image 
                                                style={{left:0 , top:0 , position:'absolute' , padding: 20 , marginLeft:20 , marginTop:20}}
                                                source={require('./../../assets/images/visa/visa.png')}></Image>
        
        
                                                <Text style={{color:'white' , marginTop:70 , alignSelf:'center' , fontSize:30}}>{item.cardnumber}</Text>  
        
                                                    <View style={{flexDirection:'row'}}>
                                                             <View style={{flexDirection:'column' , marginLeft:20}}>
                                                                    <Text style={{color:'white'}}>Month/Year</Text> 
                                                                    <Text style={{color:'white'}}>{item.expiry}</Text> 
                                                            </View> 
        
                                                            <View style={{flexDirection:'column' , right:0 ,  position:'absolute' , marginRight:20}}>
                                                                    <Text style={{color:'white'}}>CVV</Text> 
                                                                    <Text style={{color:'white'}}>{item.cvv}</Text> 
                                                            </View> 
                                                    
                                                    </View>
                                                           
        
                                               <Text style={{color:'white' , marginTop:20 , marginLeft:20  , fontSize:20}}>{item.cardname}</Text>  
        
        
                                    </View>
                                    
                                    </ImageBackground> 
        
                          )}
                            keyExtractor={(item, index) => index.toString()}
                          />
                            <View > 
                                
                            </View>   
                            <Loading ref='loading2'/>
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

   
  });