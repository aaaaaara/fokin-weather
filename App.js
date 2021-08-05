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
    const { data } = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&APPID=${API_KEY}&units=metric`
      );//`` 변수를 문자열에 포함시켜야 하기 때문에 "" ''를 사용하지 않는다
    
    console.log(data);
    this.setState({
      isLoading: false, 
      temp: data.main.temp
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
    const { isLoading } = this.state;
    return isLoading ? <Loading/> : <Weather/>;
  };
}

