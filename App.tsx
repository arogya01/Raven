import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BackgroundService from 'react-native-background-actions';
import SmsListener from 'react-native-android-sms-listener';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReadScreen from './modules/ReadScreen';
import HomeScreen from './modules/HomeScreen';
import {PermissionsAndroid} from 'react-native';
import {sendSmsToServer} from './services';

const backgroundService = async () => {
  console.log('running background service');

  await new Promise(async resolve => {
    console.log('running the prmise in background service');
    let subscription = SmsListener.addListener(
      async (message: {
        originatingAddress: string;
        body: string;
        timestamp: number;
      }) => {
        console.log('recieved message in background service', {
          message: message,
        });
        await sendSmsToServer(message);
      },
    );

    // Stop listening for SMS when the background service is stopped
    BackgroundService.on('expiration', () => {
      console.log('removed background service');
      subscription.remove();
      resolve();
    });
  });
};

const options = {
  taskName: 'SMS Background Service',
  taskTitle: 'SMS Background Service is running',
  taskDesc: 'Listening for incoming SMS and sending to server',
  taskIcon: {
    name: 'ic_launcher',
    type: 'mipmap',
  },
  notification: {
    channelId: 'sms-reader',
    channelName: 'SMS Reader Service',
    importance: 3, // HIGH
    title: 'SMS Reader Active',
    message: 'Reading SMS messages in background',
    // Required for Android 14
    foregroundServiceType: 'dataSync',
  },
};

const Stack = createNativeStackNavigator();

async function requestSmsPermissions() {
  try {
    const permissions = [
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    ];

    // Filter out any null/undefined permissions
    const validPermissions = permissions.filter(
      permission => permission != null,
    );

    if (validPermissions.length === 0) {
      console.error('No valid permissions to request');
      return false;
    }

    // Request permissions with error handling
    const results = await PermissionsAndroid.requestMultiple(validPermissions);

    // Log results for debugging
    console.log('Permission results:', results);

    // Check if all permissions were granted
    const allGranted = Object.values(results).every(
      result => result === PermissionsAndroid.RESULTS.GRANTED,
    );

    return allGranted;
  } catch (err) {
    console.warn(err);
    return false;
  }
}

function App(): React.JSX.Element {
  useEffect(() => {
    const checkPermits = async () => {
      const granted = await requestSmsPermissions();
      if (granted) {
        BackgroundService.start(backgroundService, options);
      }
    };

    checkPermits();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="ReadMessage" component={ReadScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
