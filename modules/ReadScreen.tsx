import {
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {getMessagesFromServer} from '../src/services';
import {MessageList} from '../src/components/MessageList';
import type {Device, Message} from '../src/types';
import {Colors} from '../src/colors';

function ReadScreen() {
  const [devices, setDevices] = useState<Device[]>([]);
  const [selectedDevice, setSelectedDevice] = useState<Device | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessagesFromServer();
        setDevices(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'Failed to fetch messages',
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchMessages();
  }, []);

  if (isLoading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!selectedDevice) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Select a Device</Text>
        {devices.map(device => (
          <TouchableOpacity
            key={device._id}
            style={styles.deviceItem}
            onPress={() => setSelectedDevice(device)}>
            <Text style={styles.deviceName}>{device.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => setSelectedDevice(null)}
          style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.deviceTitle}>{selectedDevice.name}</Text>
      </View>
      <MessageList
        data={selectedDevice.messages}
        renderItem={({item}: {item: Message}) => (
          <View style={styles.messageContainer}>
            <Text style={styles.messageText}>{item.body}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: Colors.white,
    padding: 16,
  },
  deviceItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  deviceName: {
    fontSize: 18,
    color: Colors.white,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.gray,
  },
  backButton: {
    marginRight: 16,
  },
  backButtonText: {
    fontSize: 18,
    color: Colors.primary,
  },
  deviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: Colors.white,
  },
  messageContainer: {
    backgroundColor: Colors.gray,
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 16,
    marginVertical: 4,
  },
  messageText: {
    color: Colors.white,
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});

export default ReadScreen;
