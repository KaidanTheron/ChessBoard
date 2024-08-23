import { Link } from "expo-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, Text, useColorScheme, View } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import PermissionsButton, { LOCATION_TASK_NAME } from "@/components/permission-button";
import { useLocationStore } from "@/store/location-store";
import Coords from "@/components/coords";

export default function Page() {

  const [foregroundLocation, setForegroundLocation] = useState<null | Location.LocationObject>(null);
  const [elapsedTime, setElapsedTime] = useState<number | null>(null);
  const [backGroundElapsedTime, setBackgroundElapsedTime] = useState<number | null>(null);
  const time = useRef<number>(Date.now());
  const colorScheme = useColorScheme();

  useEffect(() => {
    try {
      (async () => {
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== "granted") {
            console.log("Permission to access location was denied");
            return;
          }

          const foregroundLocation = await Location.getCurrentPositionAsync({
            accuracy: Location.Accuracy.BestForNavigation,
          });
          setForegroundLocation(foregroundLocation);
        
        
      })();
    } catch (e) {
      console.log((e as Error).message);
    }
  }, []);

  useEffect(() => {
    if (foregroundLocation !== null) {
      const endTime = Date.now();
      setElapsedTime((endTime - time.current) / 1000); // Calculate the elapsed time in seconds
    }
  }, [foregroundLocation]);

  const backgroundLocation = useLocationStore((state) => state.location);

  useEffect(() => {
    if (!backgroundLocation || !!backGroundElapsedTime) return;
    setBackgroundElapsedTime((Date.now() - time.current) / 1000);
  }, [backgroundLocation])

  const colorSchemeStyle = useMemo(() => colorScheme === "dark" ? " text-white" : " text-slate-700", [colorScheme])

  return (
    <SafeAreaView className={`flex flex-col h-full gap-10 p-10 ${colorScheme === "dark" ? " bg-black" : "bg-white"}`}>
      <Coords location={backgroundLocation} title="Background Coords"/>
      <Coords location={foregroundLocation} title="Foreground Coords"/>
      {elapsedTime !== null && (
        <Text className={colorSchemeStyle}>Time elapsed: {elapsedTime} seconds</Text>
      )}
      {backGroundElapsedTime !== null && (
        <Text className={colorSchemeStyle}>Time elapsed for background location: {backGroundElapsedTime} seconds</Text>
      )}
        <PermissionsButton />
      </SafeAreaView>
    );
}
