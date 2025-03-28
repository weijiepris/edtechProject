import useAccount from '@/app/hooks/useAccount';
import { useAuth } from '@/app/hooks/useAuth';
import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Courses } from './Courses';
import { Badges } from './BadgesChats';
import { Discussions } from './DiscussionsGroups';
import { Announcements } from './Announcements';
import Header from './Header';

const Dashboard = () => {
  const { user, loading: userLoading } = useAccount();
  const { loading: authLoading, validateToken } = useAuth();
  console.log('[dashboard]', user);

  if (!userLoading && !user) {
    validateToken();
  }

  return (
    <View style={styles.container}>
      <Header />
      <Courses />
      <Badges />
      <Discussions />
      <Announcements />
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  }
});
