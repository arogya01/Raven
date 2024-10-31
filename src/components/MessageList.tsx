import {StyleSheet, View} from 'react-native';
import {Colors} from '../colors';
import {Message} from '../types';

type MessageListProps = {
  messages: Message[];
};
export const MessageList = ({messages}: MessageListProps) => {
  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.black},
});
