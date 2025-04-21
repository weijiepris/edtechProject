import { Entypo } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IStudentClass, UserRoles } from '../utils/constants';
import { fetchStudentClasses, fetchTeacherClasses } from '../services/Class.service';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import useAccount from '../hooks/useAccount';

interface ICourses {}

const Courses: React.FC<ICourses> = ({}) => {
  const router = useExpoRouter();
  const [classes, setClasses] = useState<IStudentClass[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useAccount();

  useEffect(() => {
    console.log(user);

    if (!user) return;

    const fn =
      user.role === UserRoles.STUDENT
        ? fetchStudentClasses
        : user.role === UserRoles.TEACHER
          ? fetchTeacherClasses
          : fetchStudentClasses;

    setLoading(true);
    fn()
      .then(data => {
        console.log(data);
        setClasses(Array.isArray(data) ? data : []);
      })
      .finally(() => setLoading(false));
  }, [user]);

  const onCourseTab = ({
    courseUuid,
    courseName,
    courseCode,
  }: {
    courseUuid: string;
    courseCode: string;
    courseName: string;
  }) => {
    router.push({
      pathname: '/courseDetail',
      params: {
        courseUuid,
        courseCode,
        courseName,
      },
    });
  };

  return (
    <View style={styles.coursesContainer}>
      <Text style={styles.title}>Courses</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.courseTabContainer}
      >
        {classes.map(cls => (
          <TouchableOpacity
            style={styles.courseTabs}
            key={cls.uuid}
            onPress={() =>
              onCourseTab({
                courseUuid: cls.class.uuid,
                courseCode: `${cls.class.courseType} ${cls.class.courseCode}`,
                courseName: `${cls.class.name}`,
              })
            }
          >
            <Text style={styles.courseTitle}>
              {`${cls.class.courseType} ${cls.class.courseCode}`}
              <Entypo name="chevron-right" size={24} color="black" />
            </Text>
            <Text style={styles.courseSubTitle}>{cls.class.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default Courses;
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
  courseTabContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 15,
    paddingHorizontal: 15,
  },
  courseTabs: {
    backgroundColor: '#D9D9D9',
    height: 71,
    width: 144,
    borderRadius: 15,
  },
  courseTitle: {
    fontWeight: 'bold',
    fontSize: 24,
    marginLeft: 11,
    marginTop: 4,
    marginBottom: 4,
  },
  courseSubTitle: {
    fontWeight: 'bold',
    fontSize: 11,
    marginLeft: 11,
  },
  coursesContainer: {
    backgroundColor: '#EAEAEA',
    height: 232,
    margin: 19,
    borderRadius: 15,
  },
  title: {
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 9,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
