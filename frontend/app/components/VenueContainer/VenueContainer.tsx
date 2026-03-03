import { Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Venue } from "../../types/enterprise";

type VenueContainerProps = {
  venues: Venue[];
};

export default function VenueContainer({ venues }: VenueContainerProps) {
  if (!venues.length) {
    return (
      <View className="bg-[#F3F3F3] flex flex-col gap-y-[8px] w-full justify-start">
        <View className="bg-white h-[120px] w-full rounded-[16px] flex items-center justify-center">
          <Text className="text-[12px] text-[#6B7280] font-gil font-normal leading-[120%] tracking-[0%]">
            No venues available right now
          </Text>
        </View>
      </View>
    );
  }

  return (
    <View className="bg-[#F3F3F3] flex flex-col gap-y-[8px] w-full justify-start">
      {venues.map((venue) => (
        <View
          key={venue.id}
          className="bg-white w-full rounded-[16px] overflow-hidden px-[4px] pt-[4px] pb-[12px]"
        >
          <View className="relative">
            <Image
              source={venue.image}
              className="w-full aspect-[16/9] rounded-[12px] bg-[#F3F3F3]"
              resizeMode="contain"
            />
          </View>

          <View className="mt-[4px] px-[9px]">
            <Text className="text-base text-[#18181B] leading-[100%] tracking-[0%] font-gil font-bold">
              {venue.name}
            </Text>
            <Text className="text-[10px] text-[#444444] font-gil font-normal leading-[24px] tracking-[0%]">
              {venue.address}
            </Text>
            <View className="mt-[4px]" style={{ height: 1 }}>
              <LinearGradient
                colors={["#FFFFFF", "#F0F0F0", "#FFFFFF"]}
                locations={[0, 0.5045, 1]}
                start={{ x: 0, y: 0.5 }}
                end={{ x: 1, y: 0.5 }}
                style={{ flex: 1 }}
              />
            </View>
            <View className="flex-row justify-between items-start mt-[4px]">
              <View className="flex-row">
                <Text className="text-[10px] text-[#444444] font-normal font-gil leading-[24px] tracking-[0%]">
                  Starting From
                </Text>
                <Text className="text-[10px] font-gil font-bold text-[#000000] leading-[24px] tracking-[0%]">
                  {" "}
                  {venue.price}
                </Text>
              </View>

              <TouchableOpacity className="bg-[#E4E7FF] flex-row justify-between items-center w-[105px] h-[28px] py-3 px-6 rounded-[54px]">
                <Text className="text-[#6600A5] text-[10px] font-normal font-gil leading-[100%] tracking-[0%]">
                  Reserve Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}
