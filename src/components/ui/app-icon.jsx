import { MaterialIcons } from '@expo/vector-icons';

export function AppIcon({ name, size = 24, tintColor, color, style }) {
  const raw = typeof name === 'string' ? name : name?.android || name?.web || name?.ios || 'help-outline';
  const iconName = String(raw).replaceAll('_', '-').replaceAll('.', '-');

  return (
    <MaterialIcons name={iconName} size={size} color={tintColor || color || '#1A2B4C'} style={style} />
  );
}
