import { View, Text } from 'react-native';
import { typo } from '@/styles/typography';

interface QRInformCardProps {
  children: React.ReactNode;
}

export default function QRInformCard({ children }: QRInformCardProps) {
  return (
    <View
      style={{
        padding: 16,
        flexDirection: 'column',
        alignItems: 'flex-start',
        gap: 16,
        alignSelf: 'stretch',
        borderRadius: 8,
        backgroundColor: '#FFFFFF',
      }}
    >
      <Text
        className={typo.B3_Sb}
        style={{ alignSelf: 'stretch', color: '#656565', letterSpacing: -0.14 }}
      >
        {children}
      </Text>
    </View>
  );
}
