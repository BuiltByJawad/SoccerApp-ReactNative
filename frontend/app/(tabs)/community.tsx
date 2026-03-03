import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAsyncResource } from "../hooks/useAsyncResource";
import { getCommunityData } from "../data/enterpriseData";

export default function Community() {
  const { data, isLoading, error, refresh } =
    useAsyncResource(getCommunityData);

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#F3F3F3] items-center justify-center">
        <ActivityIndicator size="large" color="#6600A5" />
        <Text className="mt-[12px] text-[#6B7280] font-gil text-[12px] leading-[120%] tracking-[0%]">
          Loading community updates
        </Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View className="flex-1 bg-[#F3F3F3] items-center justify-center px-[24px]">
        <Text className="text-[#111827] font-gil font-semibold text-[14px] leading-[120%] tracking-[0%] text-center">
          Unable to load community data
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

  const { announcements, programs } = data;

  return (
    <ScrollView className="flex-1 bg-[#F3F3F3]">
      <View className="px-[20px] pt-[20px]">
        <Text className="text-[#18181B] font-gil font-bold text-base leading-[120%] tracking-[0%]">
          Community Hub
        </Text>
        <Text className="mt-[6px] text-[#6B7280] font-gil font-normal text-[11px] leading-[120%] tracking-[0%]">
          Centralize announcements, programs, and partner engagement.
        </Text>
      </View>

      <View className="px-[20px] mt-[18px]">
        <Text className="text-[#18181B] font-gil font-bold text-sm leading-[100%] tracking-[0%]">
          Announcements
        </Text>
        <View className="mt-[10px] gap-y-[10px]">
          {announcements.map((item) => (
            <View
              key={item.id}
              className="bg-white rounded-[16px] px-[16px] py-[14px]"
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-[#111827] font-gil font-semibold text-[12px] leading-[120%] tracking-[0%]">
                  {item.title}
                </Text>
                <Text className="text-[#9CA3AF] font-gil font-medium text-[9px] leading-[100%] tracking-[0%]">
                  {item.time}
                </Text>
              </View>
              <Text className="mt-[6px] text-[#6B7280] font-gil font-normal text-[10px] leading-[140%] tracking-[0%]">
                {item.detail}
              </Text>
              <TouchableOpacity className="mt-[10px] bg-[#E4E7FF] rounded-[54px] px-[12px] py-[8px] self-start">
                <Text className="text-[#6600A5] text-[10px] font-gil font-medium leading-[100%] tracking-[0%]">
                  View Details
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>

      <View className="px-[20px] mt-[18px] pb-[24px]">
        <Text className="text-[#18181B] font-gil font-bold text-sm leading-[100%] tracking-[0%]">
          Programs
        </Text>
        <View className="mt-[10px] gap-y-[10px]">
          {programs.map((program) => (
            <View
              key={program.id}
              className="bg-white rounded-[16px] px-[16px] py-[14px]"
            >
              <Text className="text-[#111827] font-gil font-semibold text-[12px] leading-[120%] tracking-[0%]">
                {program.title}
              </Text>
              <Text className="mt-[6px] text-[#6B7280] font-gil font-normal text-[10px] leading-[140%] tracking-[0%]">
                {program.detail}
              </Text>
              <TouchableOpacity className="mt-[10px] bg-[#F3F4F6] rounded-[54px] px-[12px] py-[8px] self-start">
                <Text className="text-[#111827] text-[10px] font-gil font-medium leading-[100%] tracking-[0%]">
                  Manage Program
                </Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
