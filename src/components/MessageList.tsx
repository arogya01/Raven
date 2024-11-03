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

type MessageListProps = FlatListProps<T> & {
  renderItem: ListRenderItem<T>;
};

function AnimatedItem({
  index,
  children,
}: {
  index: number;
  children: React.ReactNode;
}) {
  return <View index={index}>{children}</View>;
}

export const MessageList = ({renderItem, ...rest}: MessageListProps<T>) => {
  return (
    <View style={styles.container}>
      <FlatList
        {...rest}
        renderItem={props => {
          return (
            <AnimatedItem index={props.index}>{renderItem(props)}</AnimatedItem>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: Colors.black},
});
