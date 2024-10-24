import React from 'react';
import {ScrollView, StatusBar, StyleSheet, useColorScheme} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import SmsSection from '../src/SmsSection';
import SyncButton from '../src/SyncButton';
import {Colors} from '../colors';

function HomeScreen({navigation}) {
  const isDarkMode = useColorScheme() === 'dark';
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={[backgroundStyle, styles.container]}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={[backgroundStyle, styles.scrollView]}
        contentContainerStyle={styles.scrollViewContent}>
        <SmsSection title="Sms Sync Engine">
          <SyncButton title="Sync Messages to the server" />
          <SyncButton
            onPress={() => navigation.navigate('ReadMessage')}
            title="Read Messages from the Server"
          />
        </SmsSection>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
  },
  smsSection: {
    flex: 1,
  },
});

export default HomeScreen;
