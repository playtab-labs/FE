import ArrowLeft from '@/assets/svgs/arrow-left.svg';
import ArrowRight from '@/assets/svgs/arrow-right.svg';
import { useState } from 'react';
import { Image, ImageSourcePropType, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { typo } from '@/styles/typography';

interface MDImageCarouselProps {
  images: ImageSourcePropType[];
  soldOut?: boolean;
}

export default function MDImageCarousel({ images, soldOut = false }: MDImageCarouselProps) {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : images.length - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < images.length - 1 ? prev + 1 : 0));
  };

  return (
    <View style={{ width, height: width }}>
      <Image
        source={images[currentIndex]}
        style={{ width, height: width, position: 'absolute' }}
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
            backgroundColor: 'rgba(255, 255, 255, 0.50)',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text className={typo.T1_Eb} style={{ color: '#000', letterSpacing: -0.2 }}>
            Sold out
          </Text>
        </View>
      )}

      <View
        style={{
          position: 'absolute',
          bottom: 20,
          left: 0,
          right: 0,
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 6,
        }}
      >
        {images.map((_, i) => (
          <View
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: 3,
              backgroundColor: `rgba(255,255,255,${i === currentIndex ? 0.8 : 0.4})`,
            }}
          />
        ))}
      </View>

      {images.length > 1 && (
        <>
          <TouchableOpacity
            onPress={handlePrev}
            style={{
              position: 'absolute',
              left: 16,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
              padding: 8,
            }}
          >
            <ArrowLeft />
          </TouchableOpacity>

          <TouchableOpacity
            onPress={handleNext}
            style={{
              position: 'absolute',
              right: 16,
              top: 0,
              bottom: 0,
              justifyContent: 'center',
              padding: 8,
            }}
          >
            <ArrowRight />
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}
