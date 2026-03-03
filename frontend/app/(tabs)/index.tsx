import {
  ActivityIndicator,
  Image,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useState } from "react";
import {
  BookmarkIcon,
  DownArrowIcon,
  LocationIcon,
  MailIcon,
  SearchIcon,
  StarIcon,
} from "../components/icons/Icons";
import VenueContainer from "../components/VenueContainer/VenueContainer";
import { useAsyncResource } from "../hooks/useAsyncResource";
import { getEnterpriseHome } from "../data/enterpriseData";

export default function Index() {
  const [activeTab, setActiveTab] = useState<"venues" | "events">("venues");
  const { data, isLoading, error, refresh } = useAsyncResource(getEnterpriseHome);

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#F3F3F3] items-center justify-center">
        <ActivityIndicator size="large" color="#6600A5" />
        <Text className="mt-[12px] text-[#6B7280] font-gil text-[12px] leading-[120%] tracking-[0%]">
          Loading enterprise dashboard
        </Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View className="flex-1 bg-[#F3F3F3] items-center justify-center px-[24px]">
        <Text className="text-[#111827] font-gil font-semibold text-[14px] leading-[120%] tracking-[0%] text-center">
          Unable to load enterprise data
        </Text>
        <Text className="mt-[6px] text-[#6B7280] font-gil text-[11px] leading-[140%] tracking-[0%] text-center">
          {error ?? "Please check your connection and try again."}
        </Text>
        <TouchableOpacity
          className="mt-[16px] bg-[#E4E7FF] rounded-[54px] px-[18px] py-[10px]"
          onPress={refresh}
        >
          <Text className="text-[#6600A5] text-[11px] font-gil font-medium leading-[100%] tracking-[0%]">
            Retry
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  const { kpis, events, operations, venues } = data;

  return (
    <ScrollView className="bg-[#F3F3F3] flex-1">
      <View className="bg-[#FFFFFF] px-[20px]">
        <View className="mt-[16px] w-full h-[32px]">
          <View className="flex items-center justify-center flex-row gap-x-[24px]">
            <View className="flex flex-row items-center justify-between flex-1">
              <LocationIcon />
              <Text className="flex-1 mx-[6px] flex items-center justify-start font-gil text-[#18181B] font-normal text-sm leading-[100%] tracking-[0%] whitespace-nowrap overflow-hidden text-ellipsis">
                Kawla Bazar, Airport Dhaka...
              </Text>
              <DownArrowIcon />
            </View>
            <View className="flex flex-row gap-x-[8px]">
              <MailIcon />
              <BookmarkIcon />
              <StarIcon />
            </View>
          </View>
        </View>

        <View className="mt-[16px]">
          <View className="relative">
            <TextInput
              className="bg-[#F3F3F3] w-full h-[48px] rounded-[50px] px-[12px] py-[16px]
              pr-[48px] text-[#444444] text-[13px] leading-[24px] tracking-[0%] font-gil font-normal outline-none"
              placeholder="Search for Venues, Locations"
              placeholderTextColor="#444444"
            />
            <View className="absolute right-[16px] top-1/2 transform -translate-y-1/2">
              <SearchIcon />
            </View>
          </View>
        </View>

        <View
          className="relative w-full h-[89px] mt-[23px] rounded-[12px] border-2 border-white
         bg-gradient-to-r from-[#07B388] to-[#00A55B] 
         [border-image:linear-gradient(93.7deg,_#FFFFFF_0%,_rgba(255,255,255,0)_33.17%,_rgba(255,255,255,0)_70.67%,_#FFFFFF_100%)_1]"
        >
          <Image
            source={require("../../assets/images/football.png")}
            style={{
              position: "absolute",
              width: 204,
              height: 109,
              top: -20,
              left: -29,
              zIndex: 1,
            }}
            resizeMode="contain"
          />
          <View className="flex flex-col gap-y-[8px] items-end justify-center">
            <Text className="mr-[16px] mt-[15px] font-gil text-center text-white font-normal leading-[100%] tracking-[0%] text-sm">
              Challenge Your Rival On The Turf
            </Text>
            <TouchableOpacity className="mr-[62.5px] bg-[#FFFFFF] w-[120px] h-[32px] rounded-[54px] py-[10px] flex items-center justify-center">
              <Text className="text-xs text-[#6600A5] leading-[100%] tracking-[0%] font-normal font-gil">
                Join Match
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="mt-[16px]">
          <Text className="text-[#18181B] font-gil font-bold text-sm leading-[100%] tracking-[0%]">
            Enterprise Insights
          </Text>
          <View className="mt-[12px] flex flex-row gap-x-[8px]">
            {kpis.map((kpi) => (
              <View
                key={kpi.id}
                className="bg-[#F9FAFB] border border-[#EEF0F3] rounded-[12px] px-[12px] py-[10px] flex-1 min-w-[100px]"
              >
                <Text className="text-[10px] text-[#6B7280] font-gil font-normal leading-[120%] tracking-[0%]">
                  {kpi.label}
                </Text>
                <Text className="mt-[6px] text-base text-[#111827] font-gil font-bold leading-[100%] tracking-[0%]">
                  {kpi.value}
                </Text>
                <Text
                  className={`mt-[4px] text-[9px] font-gil font-medium leading-[100%] tracking-[0%] ${
                    kpi.trendDirection === "down"
                      ? "text-[#DC2626]"
                      : kpi.trendDirection === "flat"
                        ? "text-[#6B7280]"
                        : "text-[#16A34A]"
                  }`}
                >
                  {kpi.trend}
                </Text>
              </View>
            ))}
          </View>
        </View>

        <View className="mt-[16px] flex flex-row">
          <TouchableOpacity
            className="flex-1"
            onPress={() => setActiveTab("venues")}
          >
            <Text
              className={`w-full text-sm text-center leading-[100%] tracking-[0%] font-gil ${
                activeTab === "venues"
                  ? "font-bold text-[#6600A5]"
                  : "font-normal text-[#18181B]"
              }`}
            >
              Venues (12)
            </Text>
            {activeTab === "venues" && (
              <View className="w-full mt-[8px] border-b-[2px] border-[#6600A5]"></View>
            )}
          </TouchableOpacity>

          <TouchableOpacity
            className="flex-1"
            onPress={() => setActiveTab("events")}
          >
            <Text
              className={`w-full text-sm text-center leading-[100%] tracking-[0%] font-gil ${
                activeTab === "events"
                  ? "font-bold text-[#6600A5]"
                  : "font-normal text-[#18181B]"
              }`}
            >
              Events (3)
            </Text>
            {activeTab === "events" && (
              <View className="w-full mt-[8px] border-b-[2px] border-[#6600A5]"></View>
            )}
          </TouchableOpacity>
        </View>
      </View>

      <View className="mt-[12px] px-[20px] pb-[12px] w-full">
        {activeTab === "venues" ? (
          <VenueContainer venues={venues} />
        ) : (
          <View className="gap-y-[10px]">
            {events.map((event) => (
              <View
                key={event.id}
                className="bg-white rounded-[16px] px-[16px] py-[14px]"
              >
                <View className="flex-row items-center justify-between">
                  <Text className="text-[#18181B] font-gil font-bold text-sm leading-[120%] tracking-[0%]">
                    {event.title}
                  </Text>
                  <View className="bg-[#EEF2FF] px-[8px] py-[4px] rounded-[20px]">
                    <Text className="text-[#4338CA] text-[9px] font-gil font-medium leading-[100%] tracking-[0%]">
                      {event.status}
                    </Text>
                  </View>
                </View>
                <Text className="mt-[6px] text-[10px] text-[#6B7280] font-gil font-normal leading-[120%] tracking-[0%]">
                  {event.time}
                </Text>
                <Text className="mt-[2px] text-[10px] text-[#6B7280] font-gil font-normal leading-[120%] tracking-[0%]">
                  {event.location}
                </Text>
                <TouchableOpacity className="mt-[10px] bg-[#E4E7FF] rounded-[54px] px-[14px] py-[8px] self-start">
                  <Text className="text-[#6600A5] text-[10px] font-gil font-medium leading-[100%] tracking-[0%]">
                    Manage Event
                  </Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>
        )}
      </View>

      <View className="px-[20px] pb-[24px]">
        <Text className="text-[#18181B] font-gil font-bold text-sm leading-[100%] tracking-[0%]">
          Operations Snapshot
        </Text>
        <View className="mt-[10px] gap-y-[8px]">
          {operations.map((update) => (
            <View
              key={update.id}
              className="bg-white rounded-[14px] px-[14px] py-[12px]"
            >
              <Text className="text-[#111827] font-gil font-semibold text-[12px] leading-[120%] tracking-[0%]">
                {update.title}
              </Text>
              <Text className="mt-[4px] text-[#6B7280] font-gil font-normal text-[10px] leading-[120%] tracking-[0%]">
                {update.detail}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
