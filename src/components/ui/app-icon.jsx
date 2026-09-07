import { MaterialIcons } from '@expo/vector-icons';

export function AppIcon({ name, size = 24, tintColor, color, style }) {
  const raw = typeof name === 'string' ? name : name?.android || name?.web || name?.ios || 'help-outline';
  const iconName = String(raw).replaceAll('_', '-').replaceAll('.', '-');

  return (
    <MaterialIcons name={iconName} size={size} color={tintColor || color || '#9AA3AF'} style={style} />
  );
}
