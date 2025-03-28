import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const Announcements: React.FC = () => {
  return (
    <View style={styles.announcementsContainer}>
      <Text style={styles.title}>Announcements</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 9,
    fontSize: 16,
    fontWeight: 'bold'
  },
  announcementsContainer: {
    backgroundColor: '#EAEAEA',
    height: 300
  }
});
