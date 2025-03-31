import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const GradesContent = () => {
  const courses = [
    { code: 'CS6460', name: 'Educational technology' },
    { code: 'CS6230', name: 'Machine learning for trading' },
    { code: 'CS4243', name: 'Cognitive science' },
  ];
  const [selectedCourse, setSelectedCourse] = useState(courses[0]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.dropdownWrapper}>
        <TouchableOpacity
          style={styles.courseDropdown}
          onPress={() => setDropdownOpen(prev => !prev)}
        >
          <Text style={styles.dropdownText}>
            {selectedCourse.code} {selectedCourse.name}
          </Text>
          <MaterialIcons name="arrow-drop-down" size={24} color="black" />
        </TouchableOpacity>

        {dropdownOpen && (
          <View style={styles.dropdownList}>
            {courses.map((course, idx) => (
              <TouchableOpacity
                key={idx}
                style={styles.dropdownItem}
                onPress={() => {
                  setSelectedCourse(course);
                  setDropdownOpen(false);
                }}
              >
                <Text style={styles.dropdownItemText}>
                  {course.code} {course.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>
      <View style={styles.toggleContainer}>
        <TouchableOpacity style={styles.toggleButton}>
          <Text style={styles.toggleText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton}>
          <Text style={styles.toggleText}>Graded</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.toggleButton}>
          <Text style={styles.toggleText}>Ungraded</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.content}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Name</Text>
          <Text style={styles.tableHeaderText}>Due</Text>
          <Text style={styles.tableHeaderText}>Status</Text>
          <Text style={styles.tableHeaderText}>Grade</Text>
        </View>
        {[
          { name: 'Assignment 1', due: '20 April 25', status: 'Graded', grade: '10/10' },
          { name: 'Assignment 2', due: '20 Jun 25', status: 'Graded', grade: '7/10' },
          { name: 'Assignment 3', due: '20 July 25', status: 'Graded', grade: '10/10' },
          { name: 'Final exam', due: '20 Dec 25', status: 'Graded', grade: '70/100' },
        ].map((row, index) => (
          <View key={index} style={styles.tableRow}>
            <Text style={styles.tableCell}>{row.name}</Text>
            <Text style={styles.tableCell}>{row.due}</Text>
            <Text style={styles.tableCell}>{row.status}</Text>
            <Text style={styles.tableCell}>{row.grade}</Text>
          </View>
        ))}
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
  },
});
