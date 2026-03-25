import { Image, Text, View } from 'react-native';
import { typo } from '@/styles/typography';

interface MDProductCardProps {
  imageUri: string;
  title: string;
  price: string;
}

export default function MDProductCard({ imageUri, title, price }: MDProductCardProps) {
  return (
    <View
      style={{
        flexDirection: 'column',
        alignItems: 'center',
        paddingBottom: 16,
        borderRadius: 16,
        borderWidth: 1,
        borderColor: '#E4E4E4',
        backgroundColor: '#FFF',
        overflow: 'hidden',
      }}
    >
      <Image
        source={{ uri: imageUri }}
        style={{
          width: 164,
          height: 164,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          alignSelf: 'stretch',
        }}
        resizeMode="cover"
      />

      <View
        style={{
          padding: 16,
          paddingBottom: 0,
          flexDirection: 'column',
          alignItems: 'flex-start',
          gap: 16,
          alignSelf: 'stretch',
        }}
      >
        <Text
          className={typo.B3_Eb}
          style={{ color: '#1A1A1A' }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>

        <Text className={typo.B5_Rg} style={{ color: '#1A1A1A' }}>
          {price}
        </Text>
      </View>
    </View>
  );
}
