import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert } from 'react-native';
import { gradeSubmission } from '@/app/services/Assignment.service';
import { format } from 'date-fns';
import { ISubmission } from '../utils/constants';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';

interface IGradingCards {
  submission: ISubmission;
}
const GradingCards: React.FC<IGradingCards> = ({ submission }) => {
  const router = useExpoRouter();
  const [grades, setGrades] = useState<string>('');

  const handleGradeSubmit = async (submissionId: string) => {
    try {
      await gradeSubmission(submissionId, grades);
      Alert.alert('Success', 'Grade submitted successfully');
      router.goBack();
    } catch (err) {
      Alert.alert('Error', 'Failed to submit grade');
    }
  };
  return (
    <View style={styles.card}>
      <Text style={styles.assignmentTitle}>{submission.assignment.title}</Text>
      <Text style={styles.studentName}>
        {submission.student.user.firstName} {submission.student.user.lastName}
      </Text>
      <Text numberOfLines={3} style={styles.preview}>
        {submission.content}
      </Text>
      <Text style={styles.timestamp}>
        Submitted: {format(new Date(submission.submittedAt), 'dd MMM yyyy, HH:mm')}
      </Text>
      <TextInput
        style={styles.input}
        placeholder="Enter grade"
        value={grades}
        onChangeText={text => setGrades(text)}
      />
      <TouchableOpacity
        style={styles.submitButton}
        onPress={() => handleGradeSubmit(submission.uuid)}
      >
        <Text style={styles.submitButtonText}>Submit Grade</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GradingCards;

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
