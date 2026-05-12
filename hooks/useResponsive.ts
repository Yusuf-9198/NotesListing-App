import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width, height } = useWindowDimensions();

  const isTablet = width > 768;
  const isSmallScreen = width < 375;
  const isLandscape = width > height;

  const spacing = isSmallScreen ? 12 : 16;
  const containerPadding = isTablet ? 24 : 16;

  return {
    width,
    height,
    isTablet,
    isSmallScreen,
    isLandscape,
    spacing,
    containerPadding,
  };
}
