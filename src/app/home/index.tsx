import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import * as Location from "expo-location";

export default function Page() {
    const [location, setLocation] = useState<null | Location.LocationObject>(null);
    const [permission, setPermission] = useState(false);
    const [locSub, setLocSub] = useState<null | Location.LocationSubscription>(null);

    useEffect(() => {

        (async () => {

            const status = await Location.requestForegroundPermissionsAsync();
            if (!status) return;

            const locSub = await Location.watchPositionAsync({ accuracy: Location.Accuracy.Lowest }, (location) => {
                setLocation(location)
            })

            setLocSub(locSub);
        })()

        return () => {
            if (!!locSub) locSub.remove();
        }

    }, [])

    return (
        <SafeAreaView className="flex flex-row justify-between">
            <View className="bg-red-400">
                <Text>{!!location ? `${location.coords.latitude} : ${location.coords.longitude}` : "No location yet"}</Text>
            </View>
            <Link href="/" className="p-2 bg-slate-300">
                Go back nour
            </Link>
        </SafeAreaView>
    )
}