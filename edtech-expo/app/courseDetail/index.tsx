import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '../components/Header';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import useAccount from '../hooks/useAccount';
import { UserRoles } from '../utils/constants';

const CourseDetails = () => {
  const { courseUuid, courseName, courseCode } = useLocalSearchParams<{
    courseUuid: string;
    courseName: string;
    courseCode: string;
  }>();
  const router = useExpoRouter();
  const { user } = useAccount();

  const handleOnPress = (pathName: string) => {
    router.push({
      pathname: pathName,
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
        {user?.role === UserRoles.STUDENT && (
          <>
            <TouchableOpacity style={styles.card} onPress={() => handleOnPress('/assignment')}>
              <Text style={styles.cardText}>📚 View Assignments</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.card} onPress={() => handleOnPress(`/grades`)}>
              <Text style={styles.cardText}>📊 View Gradings</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => router.push('/announcements')}>
              <Text style={styles.cardText}>📢 View Announcements</Text>
            </TouchableOpacity>
          </>
        )}

        {user?.role === UserRoles.TEACHER && (
          <>
            <TouchableOpacity style={styles.card} onPress={() => handleOnPress(`/submission`)}>
              <Text style={styles.cardText}>📝 View Submissions</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.card} onPress={() => handleOnPress(`/grading`)}>
              <Text style={styles.cardText}>🧮 Grade Submissions</Text>
            </TouchableOpacity>
          </>
        )}
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
