import { Pressable, IPressableProps, Center, Text } from 'native-base';

interface OptionProps extends IPressableProps {
  title: string;
  isSelected: boolean;
}

export function Option({ title,  isSelected = false, ...rest}: OptionProps) {
  return(
    <Pressable flex={1} h={7} maxH={7} {...rest}>
      <Center h="full" w="full" bgColor={isSelected ? "gray.600" : "transparent"} rounded="sm">
        <Text color="gray.100" fontFamily="heading" fontSize="xs">
          {title}
        </Text>
      </Center>
    </Pressable>
  );
}