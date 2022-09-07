import React, {useEffect, useState} from 'react';
import type {Node} from 'react';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import Smartconfig from 'react-native-smartconfig';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState();
  const [filter, setFilter] = useState(false);
  const [limit, setLimit] = useState(10);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const wifi = () => {
    Smartconfig.start({
      type: 'esptouch', //or airkiss, now doesn't not effect
      ssid: 'wifi-network-ssid',
      bssid: 'filter-device', //"" if not need to filter (don't use null)
      password: 'wifi-password',
      timeout: 50000, //now doesn't not effect
    })
      .then(function (results) {
        //Array of device success do smartconfig
        console.log(results);
        /*[
        {
          'bssid': 'device-bssi1', //device bssid
          'ipv4': '192.168.1.11' //local ip address
        },
        {
          'bssid': 'device-bssi2', //device bssid
          'ipv4': '192.168.1.12' //local ip address
        },
        ...
      ]*/
      })
      .catch(function (error) {});

    Smartconfig.stop(); //interrupt task
  };
  useEffect(() => {
    wifi();
  }, [filter, limit]);

  const Header = () => {
    return (
      <TouchableOpacity
        onPress={() => {
          setFilter(!filter);
        }}
        style={[
          styles.innerView,
          {backgroundColor: filter ? 'green' : 'grey'},
        ]}>
        <Text style={styles.headerFont}>
          {filter ? 'Filtered Data' : 'Filter'}
        </Text>
      </TouchableOpacity>
    );
  };
  const ListComponent = ({item}) => {
    return (
      <View style={styles.innerView}>
        <Text style={styles.textStyle}>{item._data.value}</Text>
      </View>
    );
  };
  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  headerStyle: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  innerView: {
    paddingVertical: 20,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 5,
  },
  headerFont: {
    fontSize: 22,
    color: 'white',
  },
  textStyle: {
    fontSize: 22,
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

export default App;
