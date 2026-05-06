import Layout from '@/components/Layout';
import BingoCell from '@/components/stamptour/BingoCell';
import BingoCount from '@/components/stamptour/BingoCount';
import HowToParticipate from '@/components/stamptour/HowToParticipate';
import ProductInfo from '@/components/stamptour/ProductInfo';
import StampToast from '@/components/stamptour/StampToast';
import TipInfo from '@/components/stamptour/TipInfo'
import PrizeInfo from '@/components/stamptour/PrizeInfo'
import { getMyStamps, MyStampsResult } from '@/api/stamp';
import { useNavigation, useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect, useRef, useState } from 'react';
import { Image, View } from 'react-native';
import stamp2 from '@/assets/pngs/stamp2.png';
import BingoTitle from '@/assets/svgs/stamptour/bingotitle.svg';
import StampComplete1 from '@/assets/svgs/stamptour/stamp-complete1.svg';
import StampComplete2 from '@/assets/svgs/stamptour/stamp-complete2.svg';
import StampComplete3 from '@/assets/svgs/stamptour/stamp-complete3.svg';
import StampComplete4 from '@/assets/svgs/stamptour/stamp-complete4.svg';
import StampComplete5 from '@/assets/svgs/stamptour/stamp-complete5.svg';
import StampComplete6 from '@/assets/svgs/stamptour/stamp-complete6.svg';
import StampComplete7 from '@/assets/svgs/stamptour/stamp-complete7.svg';
import StampComplete8 from '@/assets/svgs/stamptour/stamp-complete8.svg';
import StampComplete9 from '@/assets/svgs/stamptour/stamp-complete9.svg';
import { SvgProps } from 'react-native-svg';
import { useTranslation } from 'react-i18next';

const STAMP_SVGS: (React.ComponentType<SvgProps> | null)[] = [
  StampComplete1,
  StampComplete2,
  StampComplete3,
  StampComplete4,
  StampComplete5,
  StampComplete6,
  StampComplete7,
  StampComplete8,
  StampComplete9,
];

export default function StampTour() {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();
  const route = useRoute<any>();
  const [stamps, setStamps] = useState<MyStampsResult | null>(null);
  const [stampToast, setStampToast] = useState<{ title: string; isBingo: boolean } | null>(null);
  const stampToastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const BINGO_CELL_INFO = [
    { title: t('stampTour.spot1Title'), description: t('stampTour.spot1Desc') },
    { title: t('stampTour.spot2Title'), description: t('stampTour.spot2Desc') },
    { title: t('stampTour.spot3Title'), description: t('stampTour.spot3Desc') },
    { title: t('stampTour.spot4Title'), description: t('stampTour.spot4Desc') },
    { title: t('stampTour.spot5Title'), description: t('stampTour.spot5Desc') },
    { title: t('stampTour.spot6Title'), description: t('stampTour.spot6Desc') },
    { title: t('stampTour.spot7Title'), description: t('stampTour.spot7Desc') },
    { title: t('stampTour.spot8Title'), description: t('stampTour.spot8Desc') },
    { title: t('stampTour.spot9Title'), description: t('stampTour.spot9Desc') },
  ];

  useEffect(() => {
    getMyStamps().then(setStamps).catch(() => {});
  }, []);

  const bingoCells = BINGO_CELL_INFO.map((info, index) => {
    const spot = stamps?.spots.find(s => Number(s.spotId) === index + 1);
    return { ...info, cleared: spot?.visited ?? false };
  });

  const visitedCount = stamps?.visitedCount ?? 0;

  useEffect(() => {
    const spotId = route.params?.newSpotId;
    if (!spotId) return;
    getMyStamps().then((data) => {
      setStamps(data);
      const isBingo = data.visitedCount >= 6;
      setStampToast({ title: t(`stampTour.spot${spotId}Title`), isBingo });
      if (stampToastTimer.current) clearTimeout(stampToastTimer.current);
      stampToastTimer.current = setTimeout(() => setStampToast(null), 3000);
    }).catch(() => {});
    return () => {
      if (stampToastTimer.current) clearTimeout(stampToastTimer.current);
    };
  }, [route.params?.newSpotId]);

  return (
    <LinearGradient
      colors={['rgba(255, 94, 55, 0.20)', 'rgba(255, 255, 255, 0.20)']}
      style={{ flex: 1, backgroundColor: '#FFF' }}
    >
      <Image
        source={stamp2}
        style={{ position: 'absolute', top: 0, right: 0, width: 330, height: 310 }}
        resizeMode="cover"
      />
    <Layout title={t('stampTour.appBar')} showBack showCamera onCameraPress={() => navigation.navigate('QrScan')} scrollable showBottomBar bgTransparent>
      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <BingoTitle />
      </View>

      <View style={{ marginTop: 32, gap: 8 }}>
        {[0, 1, 2].map((row) => (
          <View key={row} style={{ flexDirection: 'row', gap: 8 }}>
            {[0, 1, 2].map((col) => {
              const index = row * 3 + col;
              const cell = bingoCells[index];
              return (
                <BingoCell
                  key={col}
                  title={cell.title}
                  description={cell.description}
                  StampSvg={cell.cleared ? STAMP_SVGS[index] : null}
                />
              );
            })}
          </View>
        ))}
      </View>

      <View style={{ marginTop: 16, alignItems: 'center' }}>
        <BingoCount bingoCount={visitedCount} remainingCells={6 - visitedCount} />
      </View>

      <HowToParticipate />

      <ProductInfo />

      <PrizeInfo />

      <TipInfo />
      <View style={{ height: 80 }} />
    </Layout>
      {stampToast && (
        <View
          style={{
            position: 'absolute',
            bottom: 100,
            left: 0,
            right: 0,
            alignItems: 'center',
          }}
        >
          <StampToast title={stampToast.title} isBingo={stampToast.isBingo} />
        </View>
      )}
    </LinearGradient>
  );
}
