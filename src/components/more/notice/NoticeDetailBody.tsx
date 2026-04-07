import { View, Text, Image, StyleSheet } from 'react-native';
import { typo } from '@/styles/typography';
import { SvgProps } from 'react-native-svg';

interface NoticeDetailBodyProps {
  content: string;
  image?: string | React.FC<SvgProps>;
}

export default function NoticeDetailBody({ content, image }: NoticeDetailBodyProps) {
  return (
    <View style={styles.container}>
      {image && (
        <>
          {typeof image === 'string' ? (
            <Image source={{ uri: image }} style={styles.image} resizeMode="cover" />
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
  image: {
    height: 131,
    alignSelf: 'stretch',
    borderRadius: 8,
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
