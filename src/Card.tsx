import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CardProps {
  item: {
    body: string;
    date: number;
    _id: number;
  };
}

const Card: React.FC<CardProps> = ({ item }) => {
  const formattedDate = new Date(item.date).toLocaleDateString();

  return (
    <View style={styles.card}>
      <Text style={styles.body}>{item.body}</Text>
      <Text style={styles.date}>{formattedDate}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  body: {
    fontSize: 16,
    marginBottom: 8,
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
});

export default Card;
