import {
  Image,
  ImageSourcePropType,
  Linking,
  Text,
  TouchableOpacity,
} from "react-native";
import { SvgProps } from "react-native-svg";

type LogoProp = ImageSourcePropType | React.FC<SvgProps>;

interface HostLinkerProps {
  name: string;
  logo: LogoProp;
  url: string;
}

export default function HostLinker({ name, logo, url }: HostLinkerProps) {
  const isSvgComponent = typeof logo === "function";

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
      }}
      className="bg-secondary-salmon/60"
    >
      {isSvgComponent ? (
        (() => {
          const Logo = logo as React.FC<SvgProps>;
          return <Logo width={40} height={40} />;
        })()
      ) : (
        <Image
          source={logo as ImageSourcePropType}
          style={{ width: 40, height: 40, borderRadius: 8 }}
          resizeMode="contain"
        />
      )}
      <Text className="text-b3 font-sb text-gray-black">{name}</Text>
    </TouchableOpacity>
  );
}
