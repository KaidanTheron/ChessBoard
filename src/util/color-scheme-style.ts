import { useColorScheme } from "react-native"

export const useColorSchemeStyle = () => {
    const colorScheme = useColorScheme();

    let className = "";

    if (colorScheme === "dark") {
        className = "text-stone-200 "
    } else {
        className = " text-slate-800"
    }

    return className;
}