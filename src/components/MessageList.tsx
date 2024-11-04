import {
  FlatList,
  FlatListProps,
  ListRenderItem,
  StyleSheet,
  View,
} from 'react-native';
import {Colors} from '../colors';
import {Message} from '../types';
import React from 'react';

type MessageListProps = Omit<FlatListProps<Message>, 'renderItem'> & {
  renderItem: ListRenderItem<Message>;
};

function MessageItem({children}: {children: React.ReactNode}) {
  return <View style={styles.messageItem}>{children}</View>;
}

export const MessageList = ({renderItem, ...rest}: MessageListProps) => {
  return (
    <View style={styles.container}>
      <FlatList
        {...rest}
        renderItem={props => <MessageItem>{renderItem(props)}</MessageItem>}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  messageItem: {
    marginVertical: 4,
    marginHorizontal: 8,
  },
  listContent: {
    paddingVertical: 12,
  },
});
