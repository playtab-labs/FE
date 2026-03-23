import Svg, { Path } from 'react-native-svg';

interface MDIconProps {
  size?: number;
}

export function MDIcon({ size = 54 }: MDIconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 54 54" fill="none">
      <Path
        d="M18.9001 14.625H35.1001C42.7501 14.625 43.5151 18.2025 44.0326 22.5675L46.0576 39.4425C46.7101 44.9775 45.0001 49.5 37.1251 49.5H16.8976C9.00006 49.5 7.29005 44.9775 7.96505 39.4425L9.99007 22.5675C10.4851 18.2025 11.2501 14.625 18.9001 14.625Z"
        stroke="#1A1A1A"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M18 18V10.125C18 6.75 20.25 4.5 23.625 4.5H30.375C33.75 4.5 36 6.75 36 10.125V18"
        stroke="#1A1A1A"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M45.9225 38.3176H18"
        stroke="#1A1A1A"
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}
