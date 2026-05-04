import { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, useWindowDimensions } from 'react-native';
import { typo } from '@/styles/typography';
import { SvgProps } from 'react-native-svg';

interface NoticeDetailBodyProps {
  content: string;
  image?: string | React.FC<SvgProps>;
}

export default function NoticeDetailBody({ content, image }: NoticeDetailBodyProps) {
  const { width } = useWindowDimensions();
  const [imageHeight, setImageHeight] = useState<number>(0);

  useEffect(() => {
    if (typeof image !== 'string') return;
    Image.getSize(image, (imgWidth, imgHeight) => {
      setImageHeight((imgHeight / imgWidth) * width);
    });
  }, [image, width]);

  return (
    <View style={styles.container}>
      {image && (
        <>
          {typeof image === 'string' ? (
            imageHeight > 0 && (
              <Image
                source={{ uri: image }}
                style={{ width: '100%', height: imageHeight }}
                resizeMode="cover"
              />
            )
          ) : (
            (() => {
              const SvgImage = image;
              return <SvgImage width="100%" />;
            })()
          )}
          <View style={styles.imageGap} />
        </>
      )}
      <Text className={typo.B3_Rg} style={styles.content}>
        {content}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
  },
  imageGap: {
    height: 24,
  },
  content: {
    alignSelf: 'stretch',
    color: '#1A1A1A',
    letterSpacing: -0.14,
  },
});
