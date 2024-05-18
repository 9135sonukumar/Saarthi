import React, {useEffect} from 'react';
import {SafeAreaView, StyleSheet, Text} from 'react-native';
import {
  StreamCall,
  Call,
  useStreamVideoClient,
  CallContent,
} from '@stream-io/video-react-native-sdk';
import {NavigationType} from '../../../Types';
import {colors, fonts, screens, size, strings} from '../../../constants';
import {SCREEN_HEIGHT} from '../../../constants/dimensions';

interface Props {
  navigation: NavigationType;
}

const CallScreen = (props: Props) => {
  const [call, setCall] = React.useState<Call | null>(null);
  const client = useStreamVideoClient();

  const callId = 'rcDGdTaqCKhP';

  useEffect(() => {
    const call = client.call('default', callId);
    call
      .join({create: true})
      .then(() => setCall(call))
      .catch(err => console.error('Call Error===>>', err));
  }, [client]);

  if (!call) {
    return <Text style={styles.text}>{strings.joining_call}</Text>;
  }

  return (
    <StreamCall call={call}>
      <SafeAreaView style={styles.container}>
        <CallContent
          onHangupCallHandler={() => props.navigation.navigate(screens.Home)}
        />
      </SafeAreaView>
    </StreamCall>
  );
};

export default CallScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: 'center',
  },
  text: {
    fontSize: size.S_14,
    color: colors.black,
    fontFamily: fonts.openSansMedium,
    textAlign: 'center',
    marginTop: SCREEN_HEIGHT * 0.5,
  },
});
