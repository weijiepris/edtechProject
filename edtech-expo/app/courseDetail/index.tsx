import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Entypo } from '@expo/vector-icons';
import Header from '../components/Header';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';

const CourseDetails = () => {
  const { courseUuid, courseName, courseCode } = useLocalSearchParams<{
    courseUuid: string;
    courseName: string;
    courseCode: string;
  }>();
  const router = useExpoRouter();

  const handleOnPress = (pathName: string) => {
    router.push({
      pathname: '/assignment',
      params: {
        courseUuid,
      },
    });
  };

  return (
    <View style={styles.container}>
      <Header
        showBackButton={true}
        renderMiddleSection={() => (
          <>
            <Text style={styles.title}>{courseCode}</Text>
            <Text style={styles.subtitle}>{courseName}</Text>
          </>
        )}
      />

      <ScrollView style={styles.sectionList}>
        <TouchableOpacity style={styles.card} onPress={() => handleOnPress('/assignment')}>
          <Text style={styles.cardText}>📚 View Assignments</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/grades')}>
          <Text style={styles.cardText}>📊 View Gradings</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.card} onPress={() => router.push('/announcements')}>
          <Text style={styles.cardText}>📢 View Announcements</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default CourseDetails;

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#FFF',
    flex: 1,
  },
  backButton: {
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    color: '#444',
  },
  sectionList: {
    gap: 20,
  },
  card: {
    backgroundColor: '#EAEAEA',
    padding: 20,
    borderRadius: 12,
    marginBottom: 16,
  },
  cardText: {
    fontWeight: 'bold',
    fontSize: 16,
  },
});
