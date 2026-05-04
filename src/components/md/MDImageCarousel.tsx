import { Image, ImageSourcePropType, Text, useWindowDimensions, View } from 'react-native';
import { typo } from '@/styles/typography';

interface MDImageCarouselProps {
  image: ImageSourcePropType;
  soldOut?: boolean;
}

export default function MDImageCarousel({ image, soldOut = false }: MDImageCarouselProps) {
  const { width } = useWindowDimensions();

  return (
    <View style={{ width, height: width }}>
      <Image source={image} style={{ width, height: width, position: 'absolute' }} resizeMode="cover" />

      {soldOut && (
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(255, 255, 255, 0.50)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text className={typo.H1_Eb} style={{ color: '#000', letterSpacing: -0.2 }}>
            SOLD OUT
          </Text>
        </View>
      )}
    </View>
  );
}
