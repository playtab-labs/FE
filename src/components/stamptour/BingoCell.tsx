import { View, Text, Image } from 'react-native';
import { typo } from '@/styles/typography';
import stampImg from '@/assets/pngs/stamp1.png';

interface BingoCellProps {
  title: string;
  description: string;
  cleared?: boolean;
}

export default function BingoCell({ title, description, cleared = false }: BingoCellProps) {
  return (
    <View
      style={{
        display: 'flex',
        paddingTop: 26,
        paddingBottom: 16,
        paddingHorizontal: 16,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 12,
        aspectRatio: 1,
        borderRadius: 8,
        backgroundColor: cleared ? '#FFA38C' : '#FFFFFF',
        position: 'relative',
        overflow: 'visible',
      }}
    >
      <Text
        className={typo.B3_Eb}
        style={{ color: '#1A1A1A', textAlign: 'center', alignSelf: 'stretch' }}
      >
        {title}
      </Text>

      <Text
        className={typo.B4_Rg}
        style={{ color: '#656565', textAlign: 'center' }}
      >
        {description}
      </Text>

      {cleared && (
        <Image
          source={stampImg}
          style={{
            position: 'absolute',
            width:100,
            height:100,
            aspectRatio: 1,
            transform: [{ rotate: '-25deg' }]
          }}
          resizeMode="cover"
        />
      )}
    </View>
  );
}
