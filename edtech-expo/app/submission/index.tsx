import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert, TouchableOpacity } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '../components/Header';
import { format } from 'date-fns';
import { fetchSubmissionsByCourse } from '../services/Class.service';
import { ISubmission } from '../utils/constants';

const SubmissionScreen = () => {
  const { courseUuid } = useLocalSearchParams<{ courseUuid: string }>();
  const [submissions, setSubmissions] = useState<ISubmission[]>([]);
  const [selectedAssignment, setSelectedAssignment] = useState<string | null>(null);

  useEffect(() => {
    const loadSubmissions = async () => {
      try {
        const res = await fetchSubmissionsByCourse(courseUuid);
        setSubmissions(res);
      } catch (error) {
        Alert.alert('Error', 'Failed to load submissions');
      }
    };

    loadSubmissions();
  }, [courseUuid]);

  const assignments = Array.from(new Set(submissions.map(s => s.assignment.title)));
  const filtered = selectedAssignment
    ? submissions.filter(s => s.assignment.title === selectedAssignment)
    : submissions;

  return (
    <View style={styles.container}>
      <Header showBackButton={true} renderMiddleSection="View Submissions" />
      <View>
        <ScrollView horizontal style={styles.filterTabs} showsHorizontalScrollIndicator={false}>
          <TouchableOpacity
            style={[styles.filterTab, selectedAssignment === null && styles.activeFilterTab]}
            onPress={() => setSelectedAssignment(null)}
          >
            <Text style={styles.filterText}>All</Text>
          </TouchableOpacity>
          {assignments.map((title, idx) => (
            <TouchableOpacity
              key={idx}
              style={[styles.filterTab, selectedAssignment === title && styles.activeFilterTab]}
              onPress={() => setSelectedAssignment(title)}
            >
              <Text style={styles.filterText}>{title.trim()}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {filtered.map((submission, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.assignmentTitle}>{submission.assignment.title}</Text>
            <Text style={styles.studentName}>
              {submission.student.user.firstName} {submission.student.user.lastName}
            </Text>
            <Text numberOfLines={2} style={styles.preview}>
              {submission.content ? `Answer: ${submission.content}` : ''}
            </Text>
            <Text style={styles.timestamp}>
              Submitted:
              {submission.submittedAt
                ? format(new Date(submission.submittedAt), 'dd MMM yyyy, HH:mm')
                : 'Not submitted yet'}
            </Text>
            <Text
              style={[styles.grade, submission.grade !== '-' ? styles.graded : styles.notGraded]}
            >
              Grade: {submission.grade}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

export default SubmissionScreen;

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
  grade: {
    marginTop: 6,
    fontWeight: 'bold',
  },
  graded: {
    color: '#2E8B57',
  },
  notGraded: {
    color: '#B22222',
  },
  filterTabs: {
    flexDirection: 'row',
    marginBottom: 16,
  },
  filterTab: {
    backgroundColor: '#DDD',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
  },
  activeFilterTab: {
    backgroundColor: '#0068FF',
  },
  filterText: {
    fontWeight: 'bold',
    color: '#000',
  },
});
