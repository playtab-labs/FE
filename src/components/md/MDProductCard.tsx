import { Image, ImageSourcePropType, Text, View } from 'react-native';
import { typo } from '@/styles/typography';

interface MDProductCardProps {
  imageSource: ImageSourcePropType;
  title: string;
  price: string;
  soldOut?: boolean;
}

export default function MDProductCard({ imageSource, title, price, soldOut = false }: MDProductCardProps) {
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
      <View style={{ position: 'relative', alignSelf: 'stretch' }}>
        <Image
          source={imageSource}
          style={{
            width: '100%',
            height: 164,
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            alignSelf: 'stretch',
          }}
          resizeMode="cover"
        />
        {soldOut && (
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderTopLeftRadius: 16,
              borderTopRightRadius: 16,
              backgroundColor: 'rgba(255, 255, 255, 0.50)',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              className={typo.T1_Eb}
              style={{ color: '#000', letterSpacing: -0.2 }}
            >
              Sold out
            </Text>
          </View>
        )}
      </View>

      <View
        style={{
          padding: 16,
          paddingBottom: 0,
          flexDirection: 'column',
          alignItems: 'flex-start',
          alignSelf: 'stretch',
        }}
      >
        <Text
          className={typo.B3_Eb}
          style={{ color: '#1A1A1A', alignSelf: 'stretch' }}
          numberOfLines={1}
          ellipsizeMode="tail"
        >
          {title}
        </Text>

        <Text className={typo.B5_Rg} style={{ color: '#1A1A1A', marginTop: 14, letterSpacing: -0.1 }}>
          {price}
        </Text>
      </View>
    </View>
  );
}
