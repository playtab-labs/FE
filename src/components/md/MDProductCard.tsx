import { Image, Text, View } from 'react-native';
import { typo } from '@/styles/typography';
import MDSizeBadge from './MDSizeBadge';

interface MDProductCardProps {
  imageUri: string;
  title: string;
  price: string;
  sizes?: string[];
  soldOut?: boolean;
}

export default function MDProductCard({ imageUri, title, price, sizes, soldOut = false }: MDProductCardProps) {
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
          gap: 16,
          alignSelf: 'stretch',
        }}
      >
        <View style={{ flexDirection: 'column', alignItems: 'flex-start', alignSelf: 'stretch' }}>
          <Text
            className={typo.B3_Eb}
            style={{ color: '#1A1A1A' }}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>

          {sizes && sizes.length > 0 && (
            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, marginTop: 8 }}>
              {sizes.map((size) => (
                <MDSizeBadge key={size} size={size} soldOut={soldOut} />
              ))}
            </View>
          )}
        </View>

        <Text className={typo.B5_Rg} style={{ color: '#1A1A1A' }}>
          {price}
        </Text>
      </View>
    </View>
  );
}
