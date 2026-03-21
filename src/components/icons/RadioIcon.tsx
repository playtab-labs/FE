import Svg, { Circle } from 'react-native-svg';

interface RadioIconProps {
  active?: boolean;
}

export default function RadioIcon({ active = false }: RadioIconProps) {
  return (
    <Svg width="12" height="12" viewBox="0 0 12 12" fill="none">
      <Circle cx="6" cy="6" r="5.5" stroke="#BFBFBF" />
      {active && <Circle cx="6" cy="6" r="4" fill="#CF5363" />}
    </Svg>
  );
}
