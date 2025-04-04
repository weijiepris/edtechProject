import useAccount from '@/app/hooks/useAccount';
import { useAuth } from '@/app/hooks/useAuth';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Courses from './Courses';
import Badges from './BadgesChats';
import Discussions from './DiscussionsGroups';
import Announcements from './Announcements';
import Header from '../components/Header';
import { Feather, Fontisto } from '@expo/vector-icons';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import { IClass, RoleDisplayMapping, UserRoles } from '../utils/constants';
import { fetchStudentClasses } from '../services/Class.service';

const Dashboard = () => {
  const router = useExpoRouter();
  const { user, loading: userLoading } = useAccount();
  const { loading: authLoading, validateToken } = useAuth();

  if (!userLoading && !user) {
    validateToken();
  }
  return (
    <View style={styles.container}>
      <Header
        showBackButton={false}
        renderLeftSection={() => (
          <TouchableOpacity style={styles.userIcon} onPress={() => router.push('/profile')}>
            <Feather name="user" size={38} color="black" />
          </TouchableOpacity>
        )}
        renderMiddleSection={() => (
          <Text style={styles.userRole}>
            {RoleDisplayMapping.get(user?.role ?? UserRoles.USER)}
          </Text>
        )}
        renderRightSection={() => (
          <View style={styles.searchBellIcon}>
            <Feather name="search" size={38} color="black" />
            <Fontisto name="bell" size={38} color="black" />
          </View>
        )}
      />
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
    backgroundColor: '#FFF',
  },
  userIcon: {
    height: 52,
    width: 52,
    backgroundColor: '#D9D9D9',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 35,
  },
  userRole: {
    fontWeight: 'bold',
    fontSize: 36,
  },
  searchBellIcon: {
    flexDirection: 'row',
    gap: 10,
    left: 190,
  },
});
