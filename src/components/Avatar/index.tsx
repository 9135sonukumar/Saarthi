import {
  Text,
  Image,
  Pressable,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import React from 'react';
import {styles} from './styles';
import {vw} from '../../constants/dimensions';

interface AvatarProps {
  url?: string | null;
  size?: number | undefined;
  userName: string;
  titleStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  onImagePress?: () => void;
}

const Avatar = (props: AvatarProps) => {
  const {
    url,
    size: avatar_size = 100,
    userName,
    titleStyle,
    style,
    onImagePress,
  } = props;

  const avatarSize = {
    height: vw(avatar_size),
    width: vw(avatar_size),
    borderRadius: vw(avatar_size / 2),
  };

  return (
    <Pressable
      onPress={() => {
        onImagePress && onImagePress();
      }}
      style={[styles.AvatarBox, avatarSize, style]}>
      {url ? (
        <Image source={{uri: url}} style={[styles.avatar, avatarSize]} />
      ) : (
        <Text numberOfLines={1} style={[styles.userName, titleStyle]}>
          {userName
            ?.trim()
            ?.match(/\b(\w)/g)
            ?.join('')
            ?.substring(0, 4)}
        </Text>
      )}
    </Pressable>
  );
};

export default Avatar;
