import ArtistIcon from "@/assets/svgs/artist.svg";
import MapIcon from "@/assets/svgs/map.svg";
import MoreIcon from "@/assets/svgs/more.svg";
import PersonalIcon from "@/assets/svgs/personal.svg";
import NavAllosIcon from "@/assets/nav_allosicon.svg";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TAB_ITEMS = [
  { name: "Artist", label: "ARTIST", Icon: ArtistIcon },
  { name: "Personal", label: "PERSONAL", Icon: PersonalIcon },
  { name: "Home", label: "", Icon: null },
  { name: "Map", label: "MAP", Icon: MapIcon },
  { name: "More", label: "MORE", Icon: MoreIcon },
];

export default function BottomBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{
        paddingBottom: insets.bottom,
        backgroundColor: "#FFF",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 8,
      }}
      className="items-center"
    >
      <View
        style={{
          width: 341,
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          flexShrink: 0,
        }}
      >
        {TAB_ITEMS.map((item, index) => {
          const isFocused = state.index === index;
          const color = isFocused ? "#FF7654" : "#aaa";
          const isHome = item.name === "Home";

          return (
            <TouchableOpacity
              key={item.name}
              style={
                isHome
                  ? {
                      width: 80,
                      height: 80,
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: -12,
                    }
                  : { width: 68 }
              }
              className={isHome ? "" : "items-center justify-center gap-1 py-4"}
              onPress={() => navigation.navigate(item.name)}
              activeOpacity={0.7}
            >
              {isHome ? (
                <View
                  className={`w-20 h-20 rounded-full  items-center justify-center shadow-allos ${isFocused ? "bg-secondary-salmon" : "bg-soft-gray-white"}`}
                >
                  <View className="items-center">
                    <View className="items-center shadow-allos">
                      <NavAllosIcon width={32} height={32} />
                    </View>
                    <Text
                      className={` text-center font-extrabold text-[11px] mt-[5px] ${isFocused ? "text-white" : "text-gray"}`}
                    >
                      HOME
                    </Text>
                  </View>
                </View>
              ) : (
                <>
                  {item.Icon && (
                    <item.Icon width={24} height={24} color={color} />
                  )}
                  <Text
                    className={`text-[11px] font-eb ${isFocused ? "text-text-salmon" : "text-gray"}`}
                  >
                    {item.label}
                  </Text>
                </>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}
