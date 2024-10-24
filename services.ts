import DeviceInfo from "react-native-device-info";
const serverUrl = 'http://localhost:5200';

export const sendSmsToServer = async (message: {
    originatingAddress: string;
    body: string;
    timestamp: number;
  }) => {
    try {
      const deviceName = await DeviceInfo.getDeviceName();
      console.log('deviceName', deviceName);
      const response = await fetch(`${serverUrl}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          deviceName,
          message,
        }),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('SMS sent to server:', data);
      return data;
    } catch (error) {
      console.error('Error sending SMS to server:', error);
      // Implement retry logic or user notification here
    }
  };
  