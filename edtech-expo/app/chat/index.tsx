import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import Messages from './Messages';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

export default function () {
  const router = useExpoRouter();

  const onSearch = (value: string) => {
    console.log('searching', value);
  };

  return (
    <View style={styles.container}>
      <Header showBackButton={true} renderMiddleSection={() => <SearchBar onSearch={onSearch} />} />
      <Messages />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
});
