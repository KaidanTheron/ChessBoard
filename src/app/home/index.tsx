import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import * as Location from "expo-location";
import * as TaskManager from "expo-task-manager";
import PermissionsButton, { LOCATION_TASK_NAME } from "@/components/permission-button";
import { useLocationStore } from "@/store/location-store";

export default function Page() {

    const [location, setLocation] = useState<null | Location.LocationObject>(null);

    useEffect(() => {
        
    })

    const backgroundLocation = useLocationStore((state) => state.location);
    console.log("Location in page: ", backgroundLocation);
    return (
        <SafeAreaView className="flex flex-col items-center justify-center h-full gap-10 p-10">
            <Text>Home</Text>
        </SafeAreaView>
    );
}
