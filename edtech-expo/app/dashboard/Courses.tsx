import { Entypo } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Courses: React.FC = () => {
  return (
    <View style={styles.coursesContainer}>
      <Text style={styles.title}>Courses</Text>
      {/* Courses tab section*/}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false} // Hide scrollbar
        contentContainerStyle={styles.courseTabContainer}
      >
        <TouchableOpacity style={styles.courseTabs}>
          <Text style={styles.courseTitle}>
            CS6460
            <Entypo name="chevron-right" size={24} color="black" />
          </Text>
          <Text style={styles.courseSubTitle}>Educational Technology</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.courseTabs}>
          <Text style={styles.courseTitle}>
            CS6460
            <Entypo name="chevron-right" size={24} color="black" />
          </Text>
          <Text style={styles.courseSubTitle}>Educational Technology</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.courseTabs}>
          <Text style={styles.courseTitle}>
            CS6460
            <Entypo name="chevron-right" size={24} color="black" />
          </Text>
          <Text style={styles.courseSubTitle}>Educational Technology</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF'
  },
  courseTabContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    paddingHorizontal: 15
  },
  courseTabs: {
    backgroundColor: '#D9D9D9',
    height: 71,
    width: 144,
    borderRadius: 15
  },
  courseTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 11,
    marginTop: 4,
    marginBottom: 4
  },
  courseSubTitle: {
    fontWeight: 'bold',
    fontSize: 11,
    marginLeft: 11
  },
  coursesContainer: {
    backgroundColor: '#EAEAEA',
    height: 232,
    margin: 19,
    borderRadius: 15
  },
  title: {
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 9,
    fontSize: 16,
    fontWeight: 'bold'
  }
});
