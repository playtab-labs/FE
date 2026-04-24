import { View, Text } from 'react-native';
import { typo } from '@/styles/typography';
import React from 'react';
import { SvgProps } from 'react-native-svg';

interface BingoCellProps {
  title: string;
  description: string;
  StampSvg?: React.ComponentType<SvgProps> | null;
}

function splitEmoji(text: string): { emoji: string; rest: string } {
  const match = text.match(/^([\p{Emoji_Presentation}\p{Extended_Pictographic}]+)\s*(.*)/su);
  return match ? { emoji: match[1], rest: match[2] } : { emoji: '', rest: text };
}

export default function BingoCell({ title, description, StampSvg }: BingoCellProps) {
  const { emoji, rest } = splitEmoji(title);
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        alignSelf: 'stretch',
        aspectRatio: 1,
        paddingVertical: 16,
        paddingHorizontal: 4,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4,
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
        position: 'relative',
      }}
    >
      <Text
        className={typo.B3_Eb}
        style={{ color: '#1A1A1A', textAlign: 'center', lineHeight: 18.2, letterSpacing: -0.14 }}
      >
        {emoji ? `${emoji}\n${rest}` : rest}
      </Text>

      <Text
        className={typo.B5_Rg}
        style={{ color: '#656565', textAlign: 'center', lineHeight: 13, letterSpacing: -0.1, opacity: 0.4 }}
      >
        {description}
      </Text>

      {StampSvg && (
        <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, overflow: 'hidden', borderRadius: 8 }}>
          <StampSvg width="101%" height="101%"  />
        </View>
      )}
    </View>
  );
}
