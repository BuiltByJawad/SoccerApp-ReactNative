import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAsyncResource } from "../hooks/useAsyncResource";
import { getBookingsData } from "../data/enterpriseData";

export default function Bookings() {
  const { data, isLoading, error, refresh } =
    useAsyncResource(getBookingsData);

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#F3F3F3] items-center justify-center">
        <ActivityIndicator size="large" color="#6600A5" />
        <Text className="mt-[12px] text-[#6B7280] font-gil text-[12px] leading-[120%] tracking-[0%]">
          Loading bookings
        </Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View className="flex-1 bg-[#F3F3F3] items-center justify-center px-[24px]">
        <Text className="text-[#111827] font-gil font-semibold text-[14px] leading-[120%] tracking-[0%] text-center">
          Unable to load bookings
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

  const { upcoming, recent } = data;

  return (
    <ScrollView className="flex-1 bg-[#F3F3F3]">
      <View className="px-[20px] pt-[20px]">
        <Text className="text-[#18181B] font-gil font-bold text-base leading-[120%] tracking-[0%]">
          Bookings
        </Text>
        <Text className="mt-[6px] text-[#6B7280] font-gil font-normal text-[11px] leading-[120%] tracking-[0%]">
          Track enterprise reservations, approvals, and utilization.
        </Text>
      </View>

      <View className="px-[20px] mt-[16px]">
        <Text className="text-[#18181B] font-gil font-bold text-sm leading-[100%] tracking-[0%]">
          Upcoming
        </Text>
        <View className="mt-[10px] gap-y-[10px]">
          {upcoming.map((booking) => (
            <View
              key={booking.id}
              className="bg-white rounded-[16px] px-[16px] py-[14px]"
            >
              <View className="flex-row items-center justify-between">
                <Text className="text-[#111827] font-gil font-semibold text-[12px] leading-[120%] tracking-[0%]">
                  {booking.venue}
                </Text>
                {booking.status ? (
                  <View className="bg-[#EEF2FF] px-[8px] py-[4px] rounded-[20px]">
                    <Text className="text-[#4338CA] text-[9px] font-gil font-medium leading-[100%] tracking-[0%]">
                      {booking.status}
                    </Text>
                  </View>
                ) : null}
              </View>
              <Text className="mt-[6px] text-[#6B7280] font-gil font-normal text-[10px] leading-[120%] tracking-[0%]">
                {booking.time}
              </Text>
              <Text className="mt-[2px] text-[#6B7280] font-gil font-normal text-[10px] leading-[120%] tracking-[0%]">
                {booking.court}
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
          Recent Activity
        </Text>
        <View className="mt-[10px] gap-y-[10px]">
          {recent.map((booking) => (
            <View
              key={booking.id}
              className="bg-white rounded-[16px] px-[16px] py-[14px]"
            >
              <Text className="text-[#111827] font-gil font-semibold text-[12px] leading-[120%] tracking-[0%]">
                {booking.venue}
              </Text>
              <Text className="mt-[6px] text-[#6B7280] font-gil font-normal text-[10px] leading-[120%] tracking-[0%]">
                {booking.time}
              </Text>
              <Text className="mt-[2px] text-[#6B7280] font-gil font-normal text-[10px] leading-[120%] tracking-[0%]">
                {booking.court}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
