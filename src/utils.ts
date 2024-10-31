export const notificationOptions = {
  taskName: 'SMS Background Service',
  taskTitle: 'Monitoring messages',
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
