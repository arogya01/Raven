import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Card from './Card';

interface CardListProps {
  data: Array<{
    body: string;
    date: number;
    dateSent: number;
    type: number;
    _id: number;
  }>;
}

const CardList: React.FC<CardListProps> = ({ data }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={item => item._id.toString()}
        renderItem={({ item }) => <Card item={item} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
});

export default CardList;
