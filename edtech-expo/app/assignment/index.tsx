import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import Header from '../components/Header';
import { fetchAssignmentsByClass } from '../services/Class.service';
import { useLocalSearchParams } from 'expo-router';
import { format, differenceInDays } from 'date-fns';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import { AssignmentStatus } from '../utils/constants';

const Assignment = () => {
  const router = useExpoRouter();
  const { courseUuid } = useLocalSearchParams<{ courseUuid: string }>();
  const [assignments, setAssignments] = useState<
    {
      id: any;
      title: any;
      subject: any;
      dueDate: string;
      daysLeft: number;
      status: AssignmentStatus;
    }[]
  >([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetchAssignmentsByClass(courseUuid);

        const processed = res.assignments.map(item => {
          const dueDate = new Date(item.dueDate);
          const status =
            item.submissions.length > 0 ? item.submissions[0].status : AssignmentStatus.ACTIVE;
          return {
            id: item.uuid,
            title: item.title,
            subject: res.name ?? 'Unknown Subject',
            dueDate: format(dueDate, 'dd MMM'),
            daysLeft: differenceInDays(dueDate, new Date()),
            status,
          };
        });
        setAssignments(processed);
      } catch (err) {
        console.error('Failed to fetch assignments:', err);
      }
    };

    fetchData();
  }, [courseUuid]);

  const determineAssignmentTitle = (text: string) => {
    if (text.length > 30) return styles.assignmentTitleSmaller;
    if (text.length > 20) return styles.assignmentTitleSmall;
    return styles.assignmentTitle;
  };

  return (
    <View style={styles.container}>
      <Header showBackButton={true} renderMiddleSection={'Assignments'} />
      {assignments.length === 0 && (
        <View>
          <Text>You currently do not have any assignments</Text>
        </View>
      )}
      <FlatList
        data={assignments}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={{ paddingHorizontal: 20 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.topRow}>
              <View>
                <Text style={determineAssignmentTitle(item.title)}>{item.title}</Text>
                <Text style={styles.assignmentSubject}>{item.subject}</Text>
              </View>
              <Text style={styles.dueDate}>{item.dueDate}</Text>
            </View>

            <View style={styles.bottomRow}>
              {item.status === AssignmentStatus.SUBMITTED && (
                <View style={styles.statusRow}>
                  <Feather name="check-circle" size={16} color="#666" />
                  <Text style={styles.statusText}>Submitted</Text>
                </View>
              )}
              {item.status === AssignmentStatus.SUBMITTED_LATE && (
                <View style={styles.statusRow}>
                  <Feather name="check-circle" size={16} color="#666" />
                  <Text style={styles.statusText}>Late submission</Text>
                </View>
              )}
              {item.status === AssignmentStatus.ACTIVE && (
                <Text
                  style={[
                    styles.dueLabel,
                    item.daysLeft <= 1 ? styles.dueUrgent : styles.dueWarning,
                  ]}
                >
                  {item.daysLeft < 0
                    ? 'Submission overdue'
                    : `${item.daysLeft} day${item.daysLeft > 1 ? 's' : ''} left`}
                </Text>
              )}

              <TouchableOpacity onPress={() => router.push(`/assignment/${item.id}`)}>
                <Text style={styles.readMore}>View more</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default Assignment;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  card: {
    backgroundColor: '#eee',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  assignmentTitle: {
    fontWeight: 'bold',
    fontSize: 16,
  },
  assignmentTitleSmall: {
    fontWeight: 'bold',
    fontSize: 15,
  },
  assignmentTitleSmaller: {
    fontWeight: 'bold',
    fontSize: 13,
  },
  assignmentSubject: {
    color: '#888',
    fontSize: 14,
  },
  dueDate: {
    fontWeight: '600',
    fontSize: 14,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statusText: {
    fontSize: 14,
    color: '#777',
    marginLeft: 6,
    fontWeight: '600',
  },
  dueLabel: {
    fontWeight: 'bold',
    fontSize: 14,
  },
  dueUrgent: {
    color: 'red',
  },
  dueWarning: {
    color: '#B08752',
  },
  readMore: {
    color: '#777',
    fontWeight: '600',
  },
});
