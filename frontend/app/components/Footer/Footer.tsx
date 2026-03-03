import { View, Text } from "react-native";
import React from "react";
import {
  BookingsIcon,
  CommunityIcon,
  HomeIcon,
  MatchUpsIcon,
  ProfileIcon,
} from "../icons/Icons";

export default function Footer() {
  return (
    <View className="h-[68.75px] flex flex-row items-center justify-center w-full bg-[#FFFFFF] px-[20px] py-[10px]">
      <View className="flex flex-row gap-x-[32px] items-center justify-between w-full">
        <View className="w-[29px] h-[49px] flex flex-col items-center justify-center">
          <HomeIcon />
          <Text className="mt-[3px] text-[#444444] text-[10px] font-medium leading-[110%] tracking-[0%]">
            Home
          </Text>
        </View>
        <View className="w-[29px] h-[49px] flex flex-col items-center justify-center">
          <CommunityIcon />
          <Text className="mt-[3px] text-[#444444] text-[10px] font-medium leading-[110%] tracking-[0%]">
            Community
          </Text>
        </View>
        <View className="w-[29px] h-[49px] flex flex-col items-center justify-center">
          <MatchUpsIcon />
          <Text className="mt-[3px] text-[#444444] text-[10px] font-medium leading-[110%] tracking-[0%]">
            MatchUps
          </Text>
        </View>
        <View className="w-[29px] h-[49px] flex flex-col items-center justify-center">
          <BookingsIcon />
          <Text className="mt-[3px] text-[#444444] text-[10px] font-medium leading-[110%] tracking-[0%]">
            Bookings
          </Text>
        </View>
        <View className="w-[29px] h-[49px] flex flex-col items-center justify-center">
          <ProfileIcon />
          <Text className="mt-[3px] text-[#444444] text-[10px] font-medium leading-[110%] tracking-[0%]">
            Profile
          </Text>
        </View>
      </View>
    </View>
  );
}
