import React from 'react';
import { Alert } from 'react-native';
import Loading from './loading';
import Weather from './Weather';
import * as Location from 'expo-location';
import axios from 'axios';

const API_KEY = "ff9a2d098ee1d42e43cdcc9f3fbd6cfa";

export default class extends React.Component {
  state = {
    isLoading : true
  };

  //2.날씨 가져오기
  getWeather = async (latitude, longitude) => {
    const { 
      data:{
        main:{temp},
        weather
      } 
    } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
    );
      
    this.setState({
      isLoading: false, 
      condition: weather[0].main,
      temp
    });
  };

  //1. 위치 가져오기
  getLocation = async () => {
    
    try {
      await Location.requestForegroundPermissionsAsync();
      const {
        coords: {latitude, longitude}
      } = await Location.getCurrentPositionAsync();
      this.getWeather(latitude, longitude)
      //this.setState({isLoading: false});
      
      // const location = await Location.getCurrentPositionAsync();
      // console.log(location);

      //send to API and get weather
    }
    catch(error){
      Alert.alert("Can't find you.","So Sad");
    }
  };
  
  componentDidMount(){
    this.getLocation();
    
  };
  render(){
    const { isLoading, temp, condition } = this.state;
    return isLoading ? <Loading/> : <Weather temp={Math.round(temp)} condition={condition}/>;
  };
}

