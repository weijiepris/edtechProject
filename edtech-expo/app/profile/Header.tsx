import { Entypo, Feather } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import InputText from '../components/InputText';
import { RouterStore } from 'expo-router/build/global-state/router-store';

interface IHeader {
  router: RouterStore;
}

const Header: React.FC<IHeader> = ({ router }) => {
  return (
    <View style={styles.container}>
      <Entypo name="chevron-left" size={48} color="black" onPress={() => router.goBack()} />
      <View style={styles.icon}></View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 110,
    display: 'flex',
    flexDirection: 'row',
    paddingVertical: 30,
    gap: 130,
    backgroundColor: '#FFF',
  },
  searchInput: {
    width: 250,
    borderRadius: 30,
  },
  icon: {
    height: 48,
    width: 48,
    borderRadius: 100,
    backgroundColor: '#E1E1E1',
  },
});
