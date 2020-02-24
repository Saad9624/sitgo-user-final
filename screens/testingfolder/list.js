import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet,AsyncStorage ,Text , Image, TouchableOpacity , Platform , StatusBar} from 'react-native';
import * as Font from 'expo-font';
import en from './../../strings/en.json' ;
import ur from './../../strings/ur.json' ;
import si from './../../strings/si.json' ;
import i18n from 'i18n-js';


const DATA = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    des : 'dasdasdasds' ,
    title: 'First Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    des : 'dasdasdasds' ,
    title: 'Second Item',
  },
  {
    id: '58694a0f-3da1-471f-bd96-145571e29d72',
    des : 'dasdasdasds' ,
    title: 'Third Item',
  },
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28b2',
    des : 'dasdasdasdads' ,
    title: 'Fourth Item',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
    des : 'dasdasdasdsaa' ,
    title: 'fifth Item',
  },
  
];

function Item({ title }) {
  return (
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

export default class list extends React.Component {

  static navigationOptions ={
    header: null
}

state = {
  isFocused: false,
  fontLoaded: false,
  lang:''
};

componentWillMount(){
  this.getLanguage()
}

async componentDidMount() {
  await Font.loadAsync({
    'opreg': require('./../../assets/fonts/opreg.ttf'),
  });

  this.setState({ fontLoaded: true });
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

render(){  
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
                                     <Text style={{fontSize:25 , marginTop:10 }}>{i18n.t('news')}</Text>
                                     
                                        </View>
                              </View> 
      <FlatList
        data={DATA}
        // renderItem={({ item }) => <Item title={item.title} />}
        renderItem={({item}) =>
  <View style={{ width:'90%' , alignSelf:'center'}}>
  <Text style={{padding:10 ,alignSelf:'center' , fontSize:20  }}> {item.title}</Text>
  <Image style={{marginTop:15, alignSelf:'center'}} 
     source={require('./../../assets/images/nic/nic.png')}></Image>

 <Text style={{padding:10 ,alignSelf:'center' , fontSize:15  }}> Lorem ipsum dolor sit amet,consectur adip sicing elit,sed do eiusmod tempor inciddunt ut , labore et</Text>
<TouchableOpacity
onPress={() => this.props.navigation.navigate('D_NEWS')}

style={{borderColor:'#C62930' , borderWidth:2 , borderRadius:10,padding:10 , alignSelf:'center' , marginTop:10}}>
  <Text style={{color:'#C62930'}}>{i18n.t('view_detail')}</Text>
</TouchableOpacity>
  </View>
 

  
  }
        keyExtractor={item => item.id}
      />
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
   
    flex: 1,
  
  },
  item: {
   
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  statusBarBackground: {
    height: (Platform.OS === 'ios') ? 18 : Expo.Constants.statusBarHeight, 
          backgroundColor: "#FFFFFF",
  }
});