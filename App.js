import React from 'react';
import { Alert } from 'react-native';
import Loading from './loading';
import * as Location from 'expo-location';

export default class extends React.Component {
  getLocation = async()=> {
    try {
      await Location.requestForegroundPermissionsAsync();
      const location = await Location.getCurrentPositionAsync();
      console.log(location);
    }
    catch(error){
      Alert.alert("Can't find you.","So Sad");
    }
  }
  componentDidmount(){
    this.getLocation();
  }
  render(){
    return <Loading />;
  }
}

