import { View } from "react-native";
import React from "react";
import { BackIcon, NavigationIcon, SmallBookmarkIcon } from "../icons/Icons";

export default function Navigation() {
  return (
    <View className="flex-row items-center justify-center w-full h-[32px]">
      <View className="h-full w-full flex-row items-center justify-between">
        <View className="w-[32px] h-[32px] rounded-[100px] border border-[#F3F3F3] flex-row items-center justify-center">
          <BackIcon />
        </View>
        <View className="flex-row justify-center items-center gap-[8px]">
          <View className="flex-row items-center justify-center w-[32px] h-[32px] rounded-[100px] border border-[#F3F3F3]">
            <SmallBookmarkIcon />
          </View>
          <View className="flex-row items-center justify-center w-[32px] h-[32px] rounded-[100px] border border-[#F3F3F3]">
            <NavigationIcon />
          </View>
        </View>
      </View>
    </View>
  );
}
