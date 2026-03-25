import {
  Image,
  ImageSourcePropType,
  Linking,
  Text,
  TouchableOpacity,
} from "react-native";

interface HostLinkerProps {
  name: string;
  logo: ImageSourcePropType;
  url: string;
}

export default function HostLinker({ name, logo, url }: HostLinkerProps) {
  return (
    <TouchableOpacity
      onPress={() => Linking.openURL(url)}
      activeOpacity={0.7}
      style={{
        height: 70,
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 16,
        paddingRight: 16,
        gap: 12,
        alignSelf: "stretch",
        flexDirection: "row",
        alignItems: "center",
        borderRadius: 16,
        backgroundColor: "#D9D9D9",
      }}
    >
      <Image
        source={logo}
        style={{ width: 40, height: 40, borderRadius: 8 }}
        resizeMode="contain"
      />
      <Text className="text-b3 font-sb text-gray-black">{name}</Text>
    </TouchableOpacity>
  );
}
