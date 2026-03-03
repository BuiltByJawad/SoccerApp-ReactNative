import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import Navigation from "../components/Navigation/Navigation";
import { LinearGradient } from "expo-linear-gradient";

export default function Arena() {
  const [activeTab, setActiveTab] = useState("reserve");
  const [selectedDate, setSelectedDate] = useState<number | null>(null);

  const dates = [
    { date: "04", day: "THU", id: 1 },
    { date: "05", day: "FRI", id: 2 },
    { date: "06", day: "SAT", id: 3 },
    { date: "07", day: "SUN", id: 4 },
    { date: "08", day: "MON", id: 5 },
    { date: "09", day: "TUE", id: 6 },
    { date: "10", day: "WED", id: 7 },
    { date: "11", day: "THU", id: 8 },
    { date: "12", day: "FRI", id: 9 },
    { date: "13", day: "SAT", id: 10 },
    { date: "14", day: "SUN", id: 11 },
    { date: "15", day: "MON", id: 12 },
    { date: "16", day: "TUE", id: 13 },
    { date: "17", day: "WED", id: 14 },
    { date: "18", day: "THU", id: 15 },
  ];

  const handleDatePress = (dateId: number) => {
    setSelectedDate(dateId);
  };

  return (
    <View className="w-full">
      <View className="mt-[8px] w-full flex-row items-center justify-center">
        <Navigation />
      </View>
      <View className="mt-[8px]">
        <Image
          source={require("../../assets/images/banner-2.png")}
          resizeMode="contain"
          style={{
            width: 390,
            height: 172,
          }}
        />
      </View>
      <View className="bg-white px-[18.5px] py-[6px] flex-row items-center justify-between">
        <View>
          <Text className="text-[#18181B] font-bold leading-[100%] tracking-[0%] text-base font-gil">
            DBox Sports Complex
          </Text>
          <Text className="text-[#444444] leading-[24px] tracking-[0%] text-[9px] font-normal font-gil">
            Plot no 217, Block, B B Rd No. 3, Dhaka 1216
          </Text>
        </View>
        <TouchableOpacity className="w-[115px] h-[28px] rounded-[54px] bg-[#E4E7FF] items-center justify-center">
          <Text className="text-[#6600A5] leading-[100%] tracking-[0%] text-xs font-normal font-gil">
            Follow
          </Text>
        </TouchableOpacity>
      </View>
      <View className="w-[390px] h-[1.5px]">
        <LinearGradient
          colors={["#FFFFFF", "#F0F0F0", "#F0F0F0", "#FFFFFF"]}
          locations={[0, 0.3, 0.7, 1]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{
            flex: 1,
          }}
        />
      </View>
      <View className=" bg-white border-b-2 border-[#EDEDED] h-[36px] w-full px-[11px] flex-row items-center justify-center gap-x-[24px]">
        <TouchableOpacity
          className={`h-[36px] w-[70px] flex-row items-center justify-center ${
            activeTab === "reserve" ? "border-b-2 border-[#6600A5]" : ""
          }`}
          onPress={() => setActiveTab("reserve")}
        >
          <Text
            className={`text-xs flex-row items-center justify-center text-center leading-[100%] tracking-[0%] font-gil ${
              activeTab === "reserve"
                ? "font-bold text-[#6600A5]"
                : "font-normal text-[#18181B]"
            }`}
          >
            Reserve
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`h-[36px] w-[70px] flex-row items-center justify-center ${
            activeTab === "events" ? "border-b-2 border-[#6600A5]" : ""
          }`}
          onPress={() => setActiveTab("events")}
        >
          <Text
            className={`text-xs flex-row items-center justify-center text-center leading-[100%] tracking-[0%] font-gil ${
              activeTab === "events"
                ? "font-bold text-[#6600A5]"
                : "font-normal text-[#18181B]"
            }`}
          >
            Events
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`h-[36px] w-[70px] flex-row items-center justify-center ${
            activeTab === "gallery" ? "border-b-2 border-[#6600A5]" : ""
          }`}
          onPress={() => setActiveTab("gallery")}
        >
          <Text
            className={`text-xs flex-row items-center justify-center text-center leading-[100%] tracking-[0%] font-gil ${
              activeTab === "gallery"
                ? "font-bold text-[#6600A5]"
                : "font-normal text-[#18181B]"
            }`}
          >
            Gallery
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          className={`h-[36px] w-[70px] flex-row items-center justify-center ${
            activeTab === "about" ? "border-b-2 border-[#6600A5]" : ""
          }`}
          onPress={() => setActiveTab("about")}
        >
          <Text
            className={`text-xs flex-row items-center justify-center text-center leading-[100%] tracking-[0%] font-gil ${
              activeTab === "about"
                ? "font-bold text-[#6600A5]"
                : "font-normal text-[#18181B]"
            }`}
          >
            About
          </Text>
        </TouchableOpacity>
      </View>
      <View className="mt-[12.5px] px-[20px]">
        <Text className="text-[#000000] font-gil font-bold text-xs leading-[100%] tracking-[0%]">
          Select the days available in{" "}
          <Text className="font-bold font-gil text-[#6600A5] text-xs leading-[100%] tracking-[0%]">
            August
          </Text>
        </Text>
      </View>
      {/* scrollable */}
      <View className="mt-[8px] h-[70px] w-full ps-[20px]">
        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingLeft: 0,
            alignItems: "center",
          }}
          className="bg-white"
        >
          <View className="bg-white ps-[8px] flex-row items-center gap-x-[10px]">
            {dates.map((item) => (
              <TouchableOpacity
                key={item.id}
                className="h-[46px] w-[32px] flex-col gap-y-[4px] items-center justify-center"
                onPress={() => handleDatePress(item.id)}
              >
                <View
                  className="w-[32px] h-[32px] flex-row items-center justify-center rounded-[50px] border border-[#FFFFFF]"
                  style={{
                    backgroundColor:
                      selectedDate === item.id ? "#6600A5" : "#FFFFFF",
                  }}
                >
                  <Text
                    className="w-full text-center text-[13px] font-normal leading-[100%] tracking-[0%] font-gil"
                    style={{
                      color: selectedDate === item.id ? "#FFFFFF" : "#000000",
                    }}
                  >
                    {item.date}
                  </Text>
                </View>
                <Text className="uppercase font-normal text-[9px] font-gil leading-[100%] tracking-[0%] text-black">
                  {item.day}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
}
