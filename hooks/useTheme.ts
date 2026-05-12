import { Colors } from '@/constants/colors';
import { useColorScheme } from 'react-native';

export function useTheme() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const colors = isDark ? Colors.dark : Colors.light;

  return {
    colors,
    isDark,
  };
}
