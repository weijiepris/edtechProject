import React from 'react';
import { StyleSheet, View } from 'react-native';

export const Discussions: React.FC = () => {
  return (
    <View style={styles.discussionsGroupContainer}>
      <View style={styles.discussionsContainer}></View>
      <View style={styles.groupsContainer}></View>
    </View>
  );
};

const styles = StyleSheet.create({
  discussionsGroupContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 19,
  },
  discussionsContainer: {
    backgroundColor: '#EAEAEA',
    height: 174,
    width: 205.5,
    borderStyle: 'solid',
    borderLeftColor: '#EAEAEA',
    borderTopColor: '#EAEAEA',
    borderBottomColor: '#EAEAEA',
    borderRightColor: '#000',
    borderWidth: 0.5,
  },
  groupsContainer: {
    backgroundColor: '#EAEAEA',
    height: 174,
    width: 205.5,
    borderStyle: 'solid',
    borderLeftColor: '#000',
    borderTopColor: '#EAEAEA',
    borderBottomColor: '#EAEAEA',
    borderRightColor: '#EAEAEA',
    borderWidth: 0.5,
  },
});
