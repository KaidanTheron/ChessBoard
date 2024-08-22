import * as Location from "expo-location";
import { create } from "zustand";

interface LocationState {
    location: Location.LocationObject | null,
    setLocation: (location: Location.LocationObject | null) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
    location: null,
    setLocation: (location) => set({ location: location }),
}))