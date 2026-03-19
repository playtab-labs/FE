import Svg, { Path, Rect, Circle } from 'react-native-svg';

interface IconProps {
  color?: string;
  size?: number;
}

// vuesax/bold/microphone-2 - ARTIST
export function MicrophoneIcon({ color = '#aaa', size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 2C10.07 2 8.5 3.57 8.5 5.5V12C8.5 13.93 10.07 15.5 12 15.5C13.93 15.5 15.5 13.93 15.5 12V5.5C15.5 3.57 13.93 2 12 2Z"
        fill={color}
      />
      <Path
        d="M18.35 10.65C17.94 10.65 17.6 10.99 17.6 11.4V12C17.6 15.19 15.09 17.77 11.93 17.79C8.75 17.81 6.2 15.26 6.2 12.08V11.4C6.2 10.99 5.86 10.65 5.45 10.65C5.04 10.65 4.7 10.99 4.7 11.4V12C4.7 15.89 7.56 19.1 11.25 19.67V21.25H9.25C8.84 21.25 8.5 21.59 8.5 22C8.5 22.41 8.84 22.75 9.25 22.75H14.75C15.16 22.75 15.5 22.41 15.5 22C15.5 21.59 15.16 21.25 14.75 21.25H12.75V19.67C16.44 19.1 19.3 15.89 19.3 12V11.4C19.3 10.99 18.96 10.65 18.35 10.65Z"
        fill={color}
      />
    </Svg>
  );
}

// vuesax/bold/level - PERSONAL
export function LevelIcon({ color = '#aaa', size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Rect x="2" y="14" width="4" height="7" rx="1.5" fill={color} />
      <Rect x="9" y="9" width="4" height="12" rx="1.5" fill={color} />
      <Rect x="16" y="3" width="4" height="18" rx="1.5" fill={color} />
    </Svg>
  );
}

// vuesax/bold/home - HOME
export function HomeIcon({ color = '#aaa', size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.04 6.82L14.28 2.79C12.71 1.69 10.3 1.75 8.79 2.92L3.78 6.83C2.78 7.62 1.99 9.21 1.99 10.47V17.37C1.99 19.92 4.06 22 6.61 22H17.39C19.94 22 22.01 19.93 22.01 17.38V10.6C22.01 9.25 21.14 7.6 20.04 6.82Z"
        fill={color}
      />
      <Path
        d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18C12.75 18.41 12.41 18.75 12 18.75Z"
        fill={color === '#aaa' ? '#fff' : 'white'}
      />
    </Svg>
  );
}

// vuesax/bold/map - MAP
export function MapIcon({ color = '#aaa', size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M22 7.545V16.935C22 18.175 21.14 18.715 20.09 18.105L16.94 16.285C16.54 16.055 15.89 16.035 15.47 16.245L9.52 19.225C9.1 19.435 8.45 19.415 8.05 19.185L3.22 16.385C2.79 16.135 2.44 15.515 2.44 15.015V5.625C2.44 4.385 3.3 3.845 4.35 4.455L8.05 6.615C8.45 6.845 9.1 6.865 9.52 6.655L15.47 3.675C15.89 3.465 16.54 3.485 16.94 3.715L20.67 5.895C21.13 6.145 21.99 6.775 22 7.545Z"
        fill={color}
      />
    </Svg>
  );
}

// vuesax/bold/menu - MORE
export function MenuIcon({ color = '#aaa', size = 24 }: IconProps) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M3 7C3 6.45 3.45 6 4 6H20C20.55 6 21 6.45 21 7C21 7.55 20.55 8 20 8H4C3.45 8 3 7.55 3 7Z"
        fill={color}
      />
      <Path
        d="M3 12C3 11.45 3.45 11 4 11H20C20.55 11 21 11.45 21 12C21 12.55 20.55 13 20 13H4C3.45 13 3 12.55 3 12Z"
        fill={color}
      />
      <Path
        d="M3 17C3 16.45 3.45 16 4 16H20C20.55 16 21 16.45 21 17C21 17.55 20.55 18 20 18H4C3.45 18 3 17.55 3 17Z"
        fill={color}
      />
    </Svg>
  );
}
