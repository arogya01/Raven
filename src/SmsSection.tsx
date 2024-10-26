import {PropsWithChildren, useEffect, useState} from 'react';
import React from 'react';
import {StyleSheet, Text, useColorScheme, View} from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import {SmsMessageType} from '../types';
import {Colors} from '../colors';
import SyncButton from './SyncButton';
import {sendSmsToServer} from '../services';

/* List SMS messages matching the filter */
var filter = {
  box: 'inbox', // 'inbox' (default), 'sent', 'draft', 'outbox', 'failed', 'queued', and '' for all
  /** the next 2 filters can be used for pagination **/
  indexFrom: 0, // start from index 0
  maxCount: 10, // count of SMS to return each time
};

type SectionProps = PropsWithChildren<{
  title: string;
  navigation: any;
}>;

function SmsSection({navigation, title}: SectionProps): React.JSX.Element {
  const [smsList, setSmsList] = useState([]);
  useEffect(() => {
    console.log('requesting sms permission');
    SmsAndroid.list(
      JSON.stringify(filter),
      fail => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        console.log('Count: ', count);
        var arr = JSON.parse(smsList);
        const newArr = arr.map(function (object: SmsMessageType) {
          return {
            _id: object._id,
            body: object.body,
            date: object.date,
            dateSent: object.date_sent,
            type: object.type,
          };
        });
        setSmsList(newArr);
      },
    );
  }, []);

  console.log('smsList: ', smsList);

  const isDarkMode = useColorScheme() === 'dark';

  const syncMessages = async () => {
    console.log('syncing messages');
    await sendSmsToServer(smsList);
  };

  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <View style={styles.sectionChildCtn}>
        <SyncButton
          onPress={syncMessages}
          title="Sync Messages to the server"
        />
        <SyncButton
          onPress={() => navigation.navigate('ReadMessage')}
          title="Read Messages from the Server"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    height: '100%',
    marginTop: 32,
    paddingHorizontal: 36,
    display: 'flex',
    alignItems: 'center',
    gap: 32,
  },
  sectionChildCtn: {
    display: 'flex',
    gap: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default SmsSection;
