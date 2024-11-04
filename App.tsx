import {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import BackgroundService from 'react-native-background-actions';
import SmsListener from 'react-native-android-sms-listener';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ReadScreen from './modules/ReadScreen';
import HomeScreen from './modules/HomeScreen';
import {PermissionsAndroid, Platform} from 'react-native';
import {sendSmsToServer} from './src/services';
import {notificationOptions} from './src/utils';

if (__DEV__) {
  import('./reactotron.config.ts');
}

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
        await sendSmsToServer([message]);
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

const Stack = createNativeStackNavigator();

async function requestSmsPermissions() {
  try {
    // Separate SMS permissions from notification permission
    const smsPermissions = [
      PermissionsAndroid.PERMISSIONS.READ_SMS,
      PermissionsAndroid.PERMISSIONS.SEND_SMS,
      PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
    ];

    // Request SMS permissions first
    const smsResults = await PermissionsAndroid.requestMultiple(smsPermissions);

    // Check SMS permissions
    const smssGranted = Object.values(smsResults).every(
      result => result === PermissionsAndroid.RESULTS.GRANTED,
    );

    // Handle notification permission separately
    let notificationGranted = false;
    if (Platform.Version >= 33) {
      // Android 13 or higher
      const notificationStatus = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );

      if (notificationStatus === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN) {
        // Show alert to direct user to settings
        console.log('notification status', notificationStatus);
        // Alert.alert(
        //   'Notification Permission Required',
        //   'Please enable notifications in settings to receive updates.',
        //   [
        //     {
        //       text: 'Open Settings',
        //       onPress: () => {
        //         IntentLauncher.startActivity({
        //           action: 'android.settings.APP_NOTIFICATION_SETTINGS',
        //           data: `package`,
        //         });
        //       },
        //     },
        //     {
        //       text: 'Cancel',
        //       style: 'cancel',
        //     },
        //   ],
        // );
      }

      notificationGranted =
        notificationStatus === PermissionsAndroid.RESULTS.GRANTED;
    } else {
      // Notifications are automatically granted on older Android versions
      notificationGranted = true;
    }

    return smssGranted && notificationGranted;
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
        BackgroundService.start(backgroundService, notificationOptions);
        const isRunning = await BackgroundService.isRunning();
        console.log('Background service running status:', isRunning);
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
