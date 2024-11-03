import {Text, View, ActivityIndicator} from 'react-native';
import {useState, useEffect} from 'react';
import {getMessagesFromServer} from '../src/services';

function ReadScreen() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const data = await getMessagesFromServer();
        setMessages(data);
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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color: 'red'}}>{error}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text>Read Screen</Text>
      {/* You can map through messages here to display them */}
    </View>
  );
}

export default ReadScreen;
