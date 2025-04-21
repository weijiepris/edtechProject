import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { fetchSubmissionsByCourse } from '@/app/services/Class.service';
import Header from '@/app/components/Header';
import { ISubmission } from '../utils/constants';
import GradingCards from './GradingCards';

const GradingScreen = () => {
  const { courseUuid } = useLocalSearchParams<{ courseUuid: string }>();
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const res = await fetchSubmissionsByCourse(courseUuid);
        setSubmissions(
          res.filter(submission => submission.grade === '-' && submission.submittedAt !== null),
        );
      } catch (err) {
        Alert.alert('Error', 'Failed to load submissions');
      }
    };

    loadSubmissions();
  }, [courseUuid]);

  return (
    <View style={styles.container}>
      <Header showBackButton={true} renderMiddleSection="Grade Submissions" />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {submissions.length === 0 && <Text>There are no submissions to grade</Text>}
        {submissions.map((submission, idx) => (
          <GradingCards key={idx} submission={submission} />
        ))}
      </ScrollView>
    </View>
  );
};

export default GradingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
    padding: 16,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#EFEFEF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  assignmentTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 4,
  },
  studentName: {
    fontSize: 14,
    color: '#444',
  },
  preview: {
    fontSize: 14,
    color: '#555',
    marginVertical: 6,
  },
  timestamp: {
    fontSize: 12,
    color: '#777',
  },
  input: {
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#CCC',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 10,
    marginBottom: 12,
  },
  submitButton: {
    backgroundColor: '#0068FF',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});
