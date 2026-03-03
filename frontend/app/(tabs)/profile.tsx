import {
  ActivityIndicator,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { useAsyncResource } from "../hooks/useAsyncResource";
import { getProfileData } from "../data/enterpriseData";

export default function Profile() {
  const { data, isLoading, error, refresh } =
    useAsyncResource(getProfileData);

  if (isLoading) {
    return (
      <View className="flex-1 bg-[#F3F3F3] items-center justify-center">
        <ActivityIndicator size="large" color="#6600A5" />
        <Text className="mt-[12px] text-[#6B7280] font-gil text-[12px] leading-[120%] tracking-[0%]">
          Loading profile
        </Text>
      </View>
    );
  }

  if (error || !data) {
    return (
      <View className="flex-1 bg-[#F3F3F3] items-center justify-center px-[24px]">
        <Text className="text-[#111827] font-gil font-semibold text-[14px] leading-[120%] tracking-[0%] text-center">
          Unable to load profile
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

  const { profile } = data;

  return (
    <ScrollView className="flex-1 bg-[#F3F3F3]">
      <View className="px-[20px] pt-[20px]">
        <Text className="text-[#18181B] font-gil font-bold text-base leading-[120%] tracking-[0%]">
          Profile
        </Text>
        <Text className="mt-[6px] text-[#6B7280] font-gil font-normal text-[11px] leading-[120%] tracking-[0%]">
          Enterprise operator profile and access configuration.
        </Text>
      </View>

      <View className="px-[20px] mt-[16px]">
        <View className="bg-white rounded-[18px] px-[16px] py-[16px]">
          <Text className="text-[#111827] font-gil font-bold text-[14px] leading-[120%] tracking-[0%]">
            {profile.name}
          </Text>
          <Text className="mt-[6px] text-[#6B7280] font-gil font-normal text-[10px] leading-[120%] tracking-[0%]">
            {profile.role} · {profile.region}
          </Text>
          <View className="mt-[10px] flex-row gap-x-[8px]">
            {profile.badges.map((badge) => (
              <View
                key={badge.id}
                className={`rounded-[16px] px-[10px] py-[6px] ${
                  badge.tone === "success" ? "bg-[#ECFDF3]" : "bg-[#EEF2FF]"
                }`}
              >
                <Text
                  className={`text-[9px] font-gil font-medium leading-[100%] tracking-[0%] ${
                    badge.tone === "success"
                      ? "text-[#16A34A]"
                      : "text-[#4338CA]"
                  }`}
                >
                  {badge.label}
                </Text>
              </View>
            ))}
          </View>
          <TouchableOpacity className="mt-[14px] bg-[#E4E7FF] rounded-[54px] px-[12px] py-[8px] self-start">
            <Text className="text-[#6600A5] text-[10px] font-gil font-medium leading-[100%] tracking-[0%]">
              Edit Profile
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      <View className="px-[20px] mt-[18px]">
        <Text className="text-[#18181B] font-gil font-bold text-sm leading-[100%] tracking-[0%]">
          Permissions
        </Text>
        <View className="mt-[10px] gap-y-[8px]">
          {profile.permissions.map((permission) => (
            <View
              key={permission}
              className="bg-white rounded-[14px] px-[14px] py-[12px]"
            >
              <Text className="text-[#111827] font-gil font-medium text-[11px] leading-[120%] tracking-[0%]">
                {permission}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <View className="px-[20px] mt-[18px] pb-[24px]">
        <Text className="text-[#18181B] font-gil font-bold text-sm leading-[100%] tracking-[0%]">
          Preferences
        </Text>
        <View className="mt-[10px] gap-y-[8px]">
          {profile.preferences.map((preference) => (
            <View
              key={preference.id}
              className="bg-white rounded-[14px] px-[14px] py-[12px] flex-row items-center justify-between"
            >
              <Text className="text-[#111827] font-gil font-medium text-[11px] leading-[120%] tracking-[0%]">
                {preference.label}
              </Text>
              <Text className="text-[#6B7280] font-gil font-normal text-[10px] leading-[120%] tracking-[0%]">
                {preference.state}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}
