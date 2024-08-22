import PermissionsButton from "@/components/permission-button";
import { useLocationStore } from "@/store/location-store";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import * as Location from "expo-location";

export default function Page() {
  const [loc, setLocation] = useState<null | Location.LocationObject>(null);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);
  const [backGroundElapsedTime, setBackgroundElapsedTime] = useState<number | null>(null);
  const time = useRef<number>(Date.now());

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Permission to access location was denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });
      setLocation(loc);
    })();
  }, []);

  useEffect(() => {
    if (loc !== null) {
      const endTime = Date.now();
      setElapsedTime((endTime - time.current) / 1000); // Calculate the elapsed time in seconds
    }
  }, [loc]);

  const backgroundLocation = useLocationStore((state) => state.location);

  useEffect(() => {
    if (!backgroundLocation || !!backGroundElapsedTime) return;
    setBackgroundElapsedTime((Date.now() - time.current) / 1000);
  }, [backgroundLocation])

  return (
    <SafeAreaView className="flex flex-col items-center justify-center h-full gap-10 p-10">
      {!!backgroundLocation ? (
        <View className="flex flex-row items-center justify-center">
          <View>
            <Text>Your Latitude is {backgroundLocation.coords.latitude}</Text>
            <Text>Your Longitude is {backgroundLocation.coords.longitude}</Text>
          </View>
        </View>
      ) : (
        <Text>Not fuggen here nor there</Text>
      )}
      {elapsedTime !== null && (
        <Text>Time elapsed: {elapsedTime} seconds</Text>
      )}
      {backGroundElapsedTime !== null && (
        <Text>Time elapsed for background location: {backGroundElapsedTime} seconds</Text>
      )}
      <PermissionsButton />
    </SafeAreaView>
  );
}
