import { TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { IconProps } from 'phosphor-react-native';
import { useTheme } from 'native-base';

interface ButtonIconProps extends TouchableOpacityProps {
  icon: React.FC<IconProps>;
}

export function ButtonIcon({icon: Icon, ...rest}: ButtonIconProps) {
  const { colors, sizes } = useTheme();

  return (
    <TouchableOpacity {...rest}>
      <Icon color={colors.gray[300]} size={sizes[6]} />
    </TouchableOpacity>
  );
}