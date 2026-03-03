import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAsyncResource } from "../hooks/useAsyncResource";
import { getMatchupsData } from "../data/enterpriseData";

export default function Matchups() {
  const { data, isLoading, error, refresh } =
    useAsyncResource(getMatchupsData);

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#F3F3F3] items-center justify-center">
        <ActivityIndicator size="large" color="#6600A5" />
        <Text className="mt-[12px] text-[#6B7280] font-gil text-[12px] leading-[120%] tracking-[0%]">
          Loading matchups
        </Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View className="flex-1 bg-[#F3F3F3] items-center justify-center px-[24px]">
        <Text className="text-[#111827] font-gil font-semibold text-[14px] leading-[120%] tracking-[0%] text-center">
          Unable to load matchups
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

  const { matchups, divisions } = data;

  return (
    <ScrollView className="flex-1 bg-[#F3F3F3]">
      <View className="px-[20px] pt-[20px]">
        <Text className="text-[#18181B] font-gil font-bold text-base leading-[120%] tracking-[0%]">
          Matchups
        </Text>
        <Text className="mt-[6px] text-[#6B7280] font-gil font-normal text-[11px] leading-[120%] tracking-[0%]">
          Manage league pairings, team availability, and competitive balance.
        </Text>
      </View>

      <View className="px-[20px] mt-[14px] flex-row gap-x-[8px]">
        {divisions.map((division) => (
          <View
            key={division}
            className="bg-white border border-[#E5E7EB] rounded-[20px] px-[12px] py-[6px]"
          >
            <Text className="text-[10px] text-[#111827] font-gil font-medium leading-[100%] tracking-[0%]">
              {division}
            </Text>
          </View>
        ))}
      </View>

      <View className="px-[20px] mt-[16px] gap-y-[10px] pb-[24px]">
        {matchups.map((match) => (
          <View
            key={match.id}
            className="bg-white rounded-[16px] px-[16px] py-[14px]"
          >
            <Text className="text-[#111827] font-gil font-semibold text-[12px] leading-[120%] tracking-[0%]">
              {match.title}
            </Text>
            <Text className="mt-[6px] text-[#6B7280] font-gil font-normal text-[10px] leading-[120%] tracking-[0%]">
              {match.time}
            </Text>
            <Text className="mt-[2px] text-[#6B7280] font-gil font-normal text-[10px] leading-[120%] tracking-[0%]">
              {match.venue}
            </Text>
            <View className="flex-row items-center justify-between mt-[10px]">
              <Text className="text-[#16A34A] font-gil font-medium text-[10px] leading-[100%] tracking-[0%]">
                {match.slots}
              </Text>
              <TouchableOpacity className="bg-[#E4E7FF] rounded-[54px] px-[12px] py-[8px]">
                <Text className="text-[#6600A5] text-[10px] font-gil font-medium leading-[100%] tracking-[0%]">
                  Manage
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
