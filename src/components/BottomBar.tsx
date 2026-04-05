import ArtistIcon from "@/assets/svgs/artist.svg";
import MapIcon from "@/assets/svgs/map.svg";
import MoreIcon from "@/assets/svgs/more.svg";
import PersonalIcon from "@/assets/svgs/personal.svg";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { Image, Text, TouchableOpacity, View } from "react-native";
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

  const PERSONAL_ROUTES = ["PersonalChange", "MyInfoChange", "PasswordChange", "ServiceWithdrawal", "WithdrawConfirm"];
  const activeRoute = state.routes[state.index];
  const nestedState = activeRoute?.state;
  const activeNestedRoute = nestedState?.routes?.[nestedState.index ?? 0];
  if (activeNestedRoute && PERSONAL_ROUTES.includes(activeNestedRoute.name)) return null;

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
          const color = isFocused ? "#CF5363" : "#aaa";
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
                <Image
                  source={require("@/assets/pngs/homeDuck.png")}
                  style={{ width: "100%", height: "100%" }}
                  resizeMode="contain"
                />
              ) : (
                <>
                  {item.Icon && (
                    <item.Icon width={24} height={24} color={color} />
                  )}
                  <Text className="text-gray text-[11px] font-sb">
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
