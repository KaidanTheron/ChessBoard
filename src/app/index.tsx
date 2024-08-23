import PermissionsButton from "@/components/permission-button";
import { useLocationStore } from "@/store/location-store";
import React, { useEffect, useMemo, useRef, useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import * as Location from "expo-location";
import { Link } from "expo-router";
import { Appearance, useColorScheme } from "react-native";

export default function Page() {

  const colorScheme = useColorScheme();

  return (
    <SafeAreaView className={`flex items-center justify-center h-full ${colorScheme === "dark" ? " bg-black" : " bg-white"}`}>
      <View className="p-2 text-white rounded-lg bg-slate-500">
        <Link href="/nav" className="text-white hover:cursor-pointer">Navigation</Link>
      </View>
    </SafeAreaView>
  )
}
