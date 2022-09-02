/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

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

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import firestore from '@react-native-firebase/firestore';
import RNFS from 'react-native-fs';

const App: () => Node = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const [data, setData] = useState();
  const [filter, setFilter] = useState(false);
  const [limit, setLimit] = useState(10);
  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  const dataTwo = {
    name: 'My name',
    age: '20',
  };
  const path = RNFS.DocumentDirectoryPath + '/test.json';

  const handlePress = async () => {
    try {
      await RNFS.writeFile(path, dataTwo, 'utf8');
      console.log('Success!');
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData(filter, limit);
  }, [filter, limit]);

  const getData = (filter, limit) => {
    if (filter) {
      firestore()
        .collection('test')
        .where('filter', '==', true)
        .limit(limit)
        .get()
        .then(({_docs}) => {
          setData(_docs);
        });
    } else {
      firestore()
        .collection('test')
        .limit(limit)
        .get()
        .then(({_docs}) => {
          setData(_docs);
        });
    }
  };
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
      <FlatList
        data={data}
        ListHeaderComponent={() => <Header />}
        onEndReached={() => setLimit(limit + 10)}
        renderItem={({item}) => <ListComponent item={item} />}
      />
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
});

export default App;
