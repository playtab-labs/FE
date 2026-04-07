import { View, Text } from 'react-native';
import { typo } from '@/styles/typography';
import React from 'react';
import { SvgProps } from 'react-native-svg';

interface BingoCellProps {
  title: string;
  description: string;
  StampSvg?: React.ComponentType<SvgProps> | null;
}

export default function BingoCell({ title, description, StampSvg }: BingoCellProps) {
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
        backgroundColor: '#FFFFFF',
        position: 'relative',
        overflow: 'hidden',
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

      {StampSvg && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}>
          <StampSvg width="100%" height="100%" />
        </View>
      )}
    </View>
  );
}
