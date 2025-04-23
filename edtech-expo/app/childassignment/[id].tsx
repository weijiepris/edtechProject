import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import Header from '../components/Header';
import { fetchAssignmentDetails, submitAssignment } from '../services/Assignment.service';
import { IAssignment, UserRoles } from '../utils/constants';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import useAccount from '../hooks/useAccount';

const AssignmentDetails = () => {
  const { id: assignmentId } = useLocalSearchParams<{ id: string }>();
  const [assignment, setAssignment] = useState<IAssignment>();
  const [submissionText, setSubmissionText] = useState('');
  const router = useExpoRouter();
  const { user } = useAccount();

  useEffect(() => {
    if (!user) return;

    if (user.role === UserRoles.STUDENT) {
      const fetchDetails = async () => {
        try {
          const res = await fetchAssignmentDetails(assignmentId);
          setAssignment(res);
        } catch (error) {
          Alert.alert('Error', 'Unable to fetch assignment details');
        }
      };
      fetchDetails();
    }
  }, [assignmentId, user]);

  const handleSubmit = async () => {
    try {
      await submitAssignment(assignmentId, submissionText);
      Alert.alert('Success', 'Assignment submitted successfully');
      router.goBack();
    } catch (error: any) {
      const message =
        error?.response?.data?.message || error?.message || 'Failed to submit assignment';

      Alert.alert('Error', message);
    }
  };

  if (!assignment) return null;

  const isSubmitted =
    assignment.submissions.length > 0 && assignment.submissions[0].status !== 'active';

  return (
    <View style={styles.container}>
      <Header showBackButton={true} renderMiddleSection={assignment.title} />
      <View style={styles.card}>
        <Text style={styles.title}>{assignment.title}</Text>
        <Text style={styles.subject}>{assignment.class.name}</Text>
        <Text style={styles.description}>{assignment.description}</Text>
        <Text style={styles.dueDate}>Due: {new Date(assignment.dueDate).toDateString()}</Text>
      </View>

      <View style={styles.submissionSection}>
        <Text style={styles.submissionLabel}>Your Submission</Text>

        {isSubmitted ? (
          <Text style={styles.submittedText}>You have submitted this assignment for grading.</Text>
        ) : (
          <>
            <TextInput
              multiline
              numberOfLines={5}
              style={styles.input}
              value={submissionText}
              onChangeText={setSubmissionText}
              placeholder="Paste your answer here..."
            />
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.submitText}>Submit</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

export default AssignmentDetails;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    flex: 1,
  },
  card: {
    backgroundColor: '#eee',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subject: {
    color: '#666',
    marginTop: 4,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
  },
  dueDate: {
    marginTop: 10,
    fontWeight: 'bold',
    color: '#B08752',
  },
  submissionSection: {
    flex: 1,
  },
  submissionLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
  },
  submittedText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    paddingVertical: 20,
  },
  input: {
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 12,
    fontSize: 16,
    height: 140,
    marginBottom: 20,
  },
  submitButton: {
    backgroundColor: '#0068FF',
    borderRadius: 10,
    paddingVertical: 12,
  },
  submitText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
});
