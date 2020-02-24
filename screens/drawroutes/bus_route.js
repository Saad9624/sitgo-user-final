import React, { Component } from 'react';
import { View, Text, Dimensions, StyleSheet, Alert, Platform ,StatusBar,TouchableOpacity,Image,AsyncStorage} from 'react-native';
// import { Constants, MapView } from 'expo';
import MapView from 'react-native-maps';
// Using a local version here because we need it to import MapView from 'expo'
import MapViewDirections from './mapviewdecoding';

const { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / height;
const LATITUDE = 37.771707;
const LONGITUDE = -122.4053769;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const GOOGLE_MAPS_APIKEY = 'AIzaSyDM6VAS4eWX4mOmdY0zh0TxlQs83m7iI6M';

import en from './../../strings/en.json' ;
import ur from './../../strings/ur.json' ;
import i18n from 'i18n-js';
import si from './../../strings/si.json' ;


export default class bus_route extends Component {

	static navigationOptions ={
		header: null
}

componentWillMount(){
	this.getLanguage()
}

	constructor(props) {
		super(props);

		this.state = {
			coordinates: [
				{
					latitude: 24.8432148,
					longitude: 67.0393195,
				},
				{
					latitude: 24.822612,
					longitude: 67.0458319,
                },
                {
					latitude: 24.8247886,
					longitude: 67.0815976,
                },
                {
					latitude: 24.8871967,
					longitude: 67.1517334,
				},
				{
					latitude: 24.9354657,
					longitude: 67.13865,
				},
				// {
				// 	latitude: 31.3813592,
				// 	longitude: 74.1863471,
				// },
				{
					latitude: 25.4147916,
					longitude: 68.3363268,
				},
				{
					latitude: 25.4147905,
					longitude: 68.3210058,
				},
				{
					latitude: 25.3877171,
					longitude: 68.3390983,
				},
				{
					latitude: 25.3729537,
					longitude: 68.354869,
				},
				{
					latitude:25.3728945,
					longitude: 68.3762095,
				},
			],
		};

		this.mapView = null;
	}

	async getLanguage(){
		i18n.fallbacks = true;
		i18n.translations = {
			en, ur , si
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

	onMapPress = (e) => {
		if (this.state.coordinates.length == 10) {
			this.setState({
				coordinates: [
					e.nativeEvent.coordinate,
				],
			});
		} else {
			this.setState({
				coordinates: [
					...this.state.coordinates,
					e.nativeEvent.coordinate,
				],
			});
		}
	}

	onReady = (result) => {
		this.mapView.fitToCoordinates(result.coordinates, {
			edgePadding: {
				right: (width / 20),
				bottom: (height / 20),
				left: (width / 20),
				top: (height / 20),
			}
		});
	}

	onError = (errorMessage) => {
		Alert.alert(errorMessage);
	} 

	render() {
	
	  
		return (
		  <View style={{flex:1,flexDirection:'column'}}>
				   <View style={{ height: (Platform.OS === 'ios') ? 0 : 0, backgroundColor: "#ffffff"}}></View>
                    <StatusBar hidden={false} />
                    <StatusBar barStyle={'dark-content'} backgroundColor ={'#FFFFFF'} translucent={true} /> 
          

         
                        <View style={{ flexDirection: 'row', backgroundColor:'transparent' ,height:60 ,marginTop:25}}>
                                        <TouchableOpacity 
                                        onPress={() => this.props.navigation.goBack()}
                                        >

                                        <Image style={{marginTop:15 ,  marginLeft:25}} source={require('./../../assets/images/backbtn/back.png')}></Image>

                                        </TouchableOpacity>
                                       

                                        <View style={{flexDirection:'column' , marginLeft:25}}>
                                            <Text style={{fontSize:25 , marginTop:10 , fontWeight:'bold'}}>{i18n.t('bus_route')}</Text>
                                     
                                        </View>
                              </View>
  			<MapView
  				initialRegion={{
  					latitude: 24.8432148,
  					longitude: 67.0393195,
  					latitudeDelta: 0.1,
  					longitudeDelta: 0.1,
  				}}
  				style={{flex:1}}
  				ref={c => this.mapView = c} // eslint-disable-line react/jsx-no-bind
  				onPress={this.onMapPress}
                  loadingEnabled={true}
                 
  			>
  				{this.state.coordinates.map((coordinate, index) =>
  					<MapView.Marker key={`coordinate_${index}`} coordinate={coordinate} /> // eslint-disable-line react/no-array-index-key
  				)}
  				{(this.state.coordinates.length === 10) && (
  					<MapViewDirections
  						origin={this.state.coordinates[0]}
  						destination={this.state.coordinates[1]}
  						apikey={GOOGLE_MAPS_APIKEY}
  						strokeWidth={4}
  						strokeColor="blue"
  						//onReady={this.onReady}
  						onError={this.onError}
  					/>

                      
                      
  				)}
                  {(this.state.coordinates.length === 10) && (
  					<MapViewDirections
  						origin={this.state.coordinates[1]}
  						destination={this.state.coordinates[2]}
  						apikey={GOOGLE_MAPS_APIKEY}
  						strokeWidth={4}
  						strokeColor="blue"
  					//	onReady={this.onReady}
  						onError={this.onError}
  					/>

                      
                      
					)}
					         {(this.state.coordinates.length === 10) && (
  					<MapViewDirections
  						origin={this.state.coordinates[2]}
  						destination={this.state.coordinates[3]}
  						apikey={GOOGLE_MAPS_APIKEY}
  						strokeWidth={4}
  						strokeColor="blue"
  						//onReady={this.onReady}
  						onError={this.onError}
						/>	)}
						      {(this.state.coordinates.length === 10) && (
  					<MapViewDirections
  						origin={this.state.coordinates[3]}
  						destination={this.state.coordinates[4]}
  						apikey={GOOGLE_MAPS_APIKEY}
  						strokeWidth={4}
  						strokeColor="blue"
  						//onReady={this.onReady}
  						onError={this.onError}
						/>	)}
						      {(this.state.coordinates.length === 10) && (
  					<MapViewDirections
  						origin={this.state.coordinates[3]}
  						destination={this.state.coordinates[4]}
  						apikey={GOOGLE_MAPS_APIKEY}
  						strokeWidth={4}
  						strokeColor="blue"
  					//	onReady={this.onReady}
  						onError={this.onError}
						/>	)}
						
						{(this.state.coordinates.length === 10) && (
  					<MapViewDirections
  						origin={this.state.coordinates[4]}
  						destination={this.state.coordinates[5]}
  						apikey={GOOGLE_MAPS_APIKEY}
  						strokeWidth={4}
  						strokeColor="blue"
  					//	onReady={this.onReady}
  						onError={this.onError}
						/>	)}
						
						{(this.state.coordinates.length === 10) && (
  					<MapViewDirections
  						origin={this.state.coordinates[5]}
  						destination={this.state.coordinates[6]}
  						apikey={GOOGLE_MAPS_APIKEY}
  						strokeWidth={4}
  						strokeColor="blue"
  					//	onReady={this.onReady}
  						onError={this.onError}
						/>	)}
						
						{(this.state.coordinates.length === 10) && (
  					<MapViewDirections
  						origin={this.state.coordinates[6]}
  						destination={this.state.coordinates[7]}
  						apikey={GOOGLE_MAPS_APIKEY}
  						strokeWidth={4}
  						strokeColor="blue"
  					//	onReady={this.onReady}
  						onError={this.onError}
						/>	)}
						      {(this.state.coordinates.length === 10) && (
  					<MapViewDirections
  						origin={this.state.coordinates[7]}
  						destination={this.state.coordinates[8]}
  						apikey={GOOGLE_MAPS_APIKEY}
  						strokeWidth={4}
  						strokeColor="blue"
  					//	onReady={this.onReady}
  						onError={this.onError}
						/>	)}
						      {(this.state.coordinates.length === 10) && (
  					<MapViewDirections
  						origin={this.state.coordinates[8]}
  						destination={this.state.coordinates[9]}
  						apikey={GOOGLE_MAPS_APIKEY}
  						strokeWidth={4}
  						strokeColor="blue"
  					//	onReady={this.onReady}
  						onError={this.onError}
						/>	)}
					
						  

  			</MapView>
              
			</View>
		);
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 10,
    backgroundColor: '#ecf0f1',
	},
	statusBarBackground: {
		height: (Platform.OS === 'ios') ? 18 : 0,
		backgroundColor: "#FF4500",
	},
});