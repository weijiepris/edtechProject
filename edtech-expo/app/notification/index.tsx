import React from 'react';
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import Header from '../components/Header';

const notifications = {
  new: [{ text: 'Jovia Cheng has commented on your discussion', time: '30 mins ago' }],
  today: [
    { text: 'Your CS6560 lecturer posted a new topic', time: '3 hours ago' },
    { text: 'Your CS6560 assignment has been graded', time: '4 hours ago' },
  ],
  yesterday: [
    { text: 'Jovia Cheng has started a thread on your discussion', time: '13:10 PM' },
    { text: 'Kendrick Kee has comment on your discussion', time: '11:10 AM' },
    { text: 'Kendrick Kee has joined your group', time: '10:10 AM' },
  ],
};

const Notification = () => {
  const renderSection = (title: string, items: { text: string; time: string }[]) => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {items.map((item, index) => (
        <View key={index} style={styles.notificationRow}>
          <Text style={styles.notificationText}>{item.text}</Text>
          <Text style={styles.notificationTime}>{item.time}</Text>
        </View>
      ))}
      <View style={styles.sectionDivider} />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Header showBackButton={true} renderMiddleSection={'Notification'} />

        {renderSection('New', notifications.new)}
        {renderSection('Earlier today', notifications.today)}
        {renderSection('Yesterday', notifications.yesterday)}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  scrollContainer: {
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 28,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  notificationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  notificationText: {
    flex: 1,
    fontWeight: '500',
  },
  notificationTime: {
    marginLeft: 12,
    color: '#555',
  },
  sectionDivider: {
    height: 1,
    backgroundColor: '#000',
    marginTop: 16,
  },
});
