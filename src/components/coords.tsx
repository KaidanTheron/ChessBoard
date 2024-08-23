import { useColorSchemeStyle } from "@/util/color-scheme-style";
import * as Location from "expo-location";
import { Text, useColorScheme, View } from "react-native";
import Ionicons from '@expo/vector-icons/FontAwesome';
import Animated, { useSharedValue, withClamp, withSpring } from "react-native-reanimated";
import { useEffect, useRef } from "react";

type Props = {
    location: Location.LocationObject | null,
    title: string,
}

const Coords = (props: Props) => {
    const darkLightStyle = useColorSchemeStyle();
    const colorScheme = useColorScheme();
    const height = useSharedValue(80);

    const { location, title } = props;

    useEffect(() => {
        if (!location || height.value !== 80) return;
        height.value = withSpring(height.value + 20, { damping: 40 });
    }, [location])

    return (
        <Animated.View className={`flex gap-2 border p-2 rounded-md ${colorScheme === "dark" ? "border-stone-200" : " border-slate-800"}`}
            style={{
                height,
                width: 200
            }}>
            <Text className={`${darkLightStyle} text-lg underline`}>{title}</Text>
            {location ? <View className="flex gap-1">
                <Text className={`${darkLightStyle}`}>Latitude: {location.coords.latitude}</Text>
                <Text className={`${darkLightStyle}`}>Longitude: {location.coords.longitude}</Text>
            </View> : 
            <View className="flex items-center justify-center size-fit">
                <Ionicons name="spinner" className="animate-spin" color={colorScheme === "dark" ? "white" : "black"} size={20}/>
            </View>}
        </Animated.View>
    )

}

export default Coords;