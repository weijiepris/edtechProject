import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import GradesContent from './GradesContent';
import Header from '../components/Header';

const Grades = () => {
  const router = useExpoRouter();
  return (
    <View style={styles.container}>
      <Header showBackButton={true} renderMiddleSection={'Grades'} />
      <GradesContent />
    </View>
  );
};

export default Grades;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
});
