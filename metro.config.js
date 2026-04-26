const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

const { transformer, resolver } = config;

// 이미지 에셋으로 쓸 SVG는 .img.svg 확장자 사용
config.transformer = {
  ...transformer,
  babelTransformerPath: require.resolve('react-native-svg-transformer'),
};
config.resolver = {
  ...resolver,
  assetExts: [...resolver.assetExts.filter((ext) => ext !== 'svg'), 'img.svg'],
  sourceExts: [...resolver.sourceExts, 'svg'],
};

module.exports = withNativeWind(config, { input: './global.css' });
