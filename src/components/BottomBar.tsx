import { View, Text, TouchableOpacity } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { MicrophoneIcon, LevelIcon, HomeIcon, MapIcon, MenuIcon } from '@/components/icons/TabIcons';

const TAB_ITEMS = [
  { name: 'Artist',   label: 'ARTIST',   Icon: MicrophoneIcon },
  { name: 'Personal', label: 'PERSONAL', Icon: LevelIcon      },
  { name: 'Home',     label: 'HOME',     Icon: HomeIcon       },
  { name: 'Map',      label: 'MAP',      Icon: MapIcon        },
  { name: 'More',     label: 'MORE',     Icon: MenuIcon       },
];

export default function BottomBar({ state, navigation }: BottomTabBarProps) {
  const insets = useSafeAreaInsets();

  return (
    <View
      style={{ height: 108, paddingBottom: insets.bottom }}
      className="flex-row bg-white border-t border-gray-100"
    >
      {TAB_ITEMS.map((item, index) => {
        const isFocused = state.index === index;
        const color = isFocused ? '#CF5363' : '#aaa';

        return (
          <TouchableOpacity
            key={item.name}
            className="flex-1 items-center justify-center gap-1"
            onPress={() => navigation.navigate(item.name)}
            activeOpacity={0.7}
          >
            <item.Icon color={color} size={24} />
            <Text
              style={{ fontSize: 10 }}
              className={isFocused ? 'text-primary font-semibold' : 'text-gray-400'}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
