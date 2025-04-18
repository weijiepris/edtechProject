import React, { useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchAssignmentGrades } from '../services/Assignment.service';
import { useLocalSearchParams } from 'expo-router';
import { AssignmentStatus, IAssignment, IClass } from '../utils/constants';
import { format } from 'date-fns';

const GradesContent = () => {
  const { courseUuid } = useLocalSearchParams<{ courseUuid: string }>();
  const [classObj, setClassObj] = useState<IClass>();
  const [displayAssignment, setDisplayAssignment] = useState<IAssignment[]>();

  useEffect(() => {
    if (!courseUuid) return;

    const fetchGrades = async () => {
      try {
        const res = await fetchAssignmentGrades(courseUuid);
        setClassObj(res);
        setDisplayAssignment(res.assignments);
      } catch (error) {
        Alert.alert('Error', 'Unable to fetch grades details');
      }
    };

    fetchGrades();
  }, [courseUuid]);

  const convertStatus = (status: AssignmentStatus) => {
    switch (status) {
      case AssignmentStatus.ACTIVE:
        return 'Not submitted yet';
      case AssignmentStatus.SUBMITTED:
        return 'Submitted';
      case AssignmentStatus.SUBMITTED_LATE:
        return 'Late submission';
      default:
        break;
    }
  };

  const filterAssignments = (filterBy: string) => {
    switch (filterBy) {
      case 'graded':
        const gradedAssignments = classObj?.assignments?.filter(assignment =>
          assignment.submissions.some(submission => submission.grade && submission.grade !== '-'),
        );
        setDisplayAssignment(gradedAssignments);
        break;
      case 'ungraded':
        const ungradedAssignments = classObj?.assignments?.filter(assignment =>
          assignment.submissions.some(submission => submission.grade && submission.grade === '-'),
        );
        setDisplayAssignment(ungradedAssignments);
        break;
      case 'all':
      default:
        setDisplayAssignment(classObj?.assignments);
        break;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdownWrapper}>
        <Text style={styles.heading}>{classObj?.name}</Text>
      </View>

      <View style={styles.toggleContainer}>
        <TouchableOpacity style={styles.toggleButton} onPress={() => filterAssignments('all')}>
          <Text style={styles.toggleText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={() => filterAssignments('graded')}>
          <Text style={styles.toggleText}>Graded</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton} onPress={() => filterAssignments('ungraded')}>
          <Text style={styles.toggleText}>Ungraded</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Name</Text>
          <Text style={styles.tableHeaderText}>Due</Text>
          <Text style={styles.tableHeaderText}>Submitted on</Text>
          <Text style={styles.tableHeaderText}>Status</Text>
          <Text style={styles.tableHeaderText}>Grade</Text>
        </View>

        {displayAssignment?.map((item, index) => {
          console.log(item);
          return (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.tableCell}>{item.title}</Text>
              <Text style={styles.tableCell}> {format(new Date(item.dueDate), 'dd/MM/yyyy')}</Text>
              <Text style={styles.tableCell}>
                {item.submissions.length > 0
                  ? format(new Date(item.submissions[0].submittedAt), 'dd/MM/yyyy')
                  : '-'}
              </Text>
              <Text style={styles.tableCell}>
                {item.submissions.length > 0 ? convertStatus(item.submissions[0].status) : '-'}
              </Text>
              <Text style={styles.tableCell}>
                {item.submissions.length > 0 ? item.submissions[0].grade : '-'}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
};

export default GradesContent;

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    height: 1000,
    backgroundColor: '#FFF',
  },
  dropdownWrapper: {
    alignSelf: 'center',
    marginTop: 10,
    zIndex: 10,
    position: 'relative',
  },

  courseDropdown: {
    height: 40,
    width: 320,
    backgroundColor: '#D9D9D9',
    borderRadius: 4,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  dropdownList: {
    position: 'absolute',
    top: 45,
    width: 320,
    backgroundColor: '#fff',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },

  dropdownItem: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },

  dropdownItemText: {
    fontSize: 14,
  },

  dropdownText: {
    fontWeight: 'bold',
  },
  toggleContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 13,
    alignSelf: 'center',
    marginTop: 28,
  },
  toggleButton: {
    height: 60,
    borderRadius: 30,
    backgroundColor: '#D9D9D9',
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  toggleText: {
    paddingHorizontal: 15,
    fontWeight: 'bold',
  },
  content: {
    marginTop: 20,
    paddingHorizontal: 12,
  },

  tableHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderColor: '#000',
    paddingVertical: 8,
  },

  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
  },

  tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#D9D9D9',
  },

  tableCell: {
    flex: 1,
    fontSize: 12,
  },
  heading: {
    fontSize: 20,
  },
});
