import React from 'react';
import { Button, View, StyleSheet } from 'react-native';
import * as TaskManager from 'expo-task-manager';
import * as Location from 'expo-location';
import { useLocationStore } from '@/store/location-store';

export const LOCATION_TASK_NAME = 'background-location-task';

const requestPermissions = async () => {
  const { status: foregroundStatus } = await Location.requestForegroundPermissionsAsync();
  if (foregroundStatus === 'granted') {
    const { status: backgroundStatus } = await Location.requestBackgroundPermissionsAsync();
    if (backgroundStatus === 'granted') {
      await Location.startLocationUpdatesAsync(LOCATION_TASK_NAME, {
        accuracy: Location.Accuracy.High,
      });
    }
  }
};

let setLocation = (location: Location.LocationObject | null) => {return}

const PermissionsButton = () => {
    setLocation = useLocationStore((state) => state.setLocation);
    return (
        <View className='rounded-md bg-slate-100 w-fit'>
            <Button onPress={requestPermissions} title="Enable background location" />
        </View>
    )  
};

TaskManager.defineTask(LOCATION_TASK_NAME, ({ data, error }) => {
  if (error) {
    console.log(error);
    return;
  }
  if (data) {
    const { locations } = data as { locations: Location.LocationObject[] };
    setLocation(locations[locations.length - 1])
  }
});

export default PermissionsButton;
