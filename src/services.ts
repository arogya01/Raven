import DeviceInfo from 'react-native-device-info';
const serverUrl =
  'https://lkk-bxacgpdsbjgedyfz.centralindia-01.azurewebsites.net';

export const sendSmsToServer = async (
  messages: {
    originatingAddress: string;
    body: string;
    timestamp: number;
  }[],
) => {
  try {
    const deviceName = await DeviceInfo.getDeviceName();
    console.log('deviceName', deviceName);
    console.log(
      JSON.stringify({
        deviceName,
        messages: messages,
      }),
    );
    const response = await fetch(`${serverUrl}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        deviceName,
        messages: messages,
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('SMS sent to server:', data);
    return data;
  } catch (error) {
    console.dir('Error sending SMS to server:', error);
    // Implement retry logic or user notification here
  }
};

export const getMessagesFromServer = async () => {
  try {
    const response = await fetch(`${serverUrl}/messages`, {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching messages:', error);
    throw error; // Re-throw to handle in the component
  }
};
