import useAccount from "@/app/hooks/useAccount";
import { useAuth } from "@/app/hooks/useAuth";
import { RoleDisplayMapping, UserRoles } from "@/app/utils/constants";
import React from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const Dashboard = () => {
  const { user, loading: userLoading } = useAccount();
  const { loading: authLoading, validateToken } = useAuth();
  console.log("[dashboard]", user);

  if (!userLoading && !user) {
    validateToken();
  }

  return (
    <View style={styles.container}>
      {/* Top section */}
      <View>
        <Text>
          Welcome {user?.firstName?.toUpperCase()} -{" "}
          {RoleDisplayMapping.get(user?.role ?? UserRoles.USER)}
        </Text>
      </View>
      {/* Courses section */}
      <View style={styles.courses}>
        <Text style={styles.title}>Courses</Text>
        {/* Courses tab section*/}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false} // Hide scrollbar
          contentContainerStyle={styles.courseTabContainer}
        >
          <TouchableOpacity style={styles.courseTabs}>
            <Text style={styles.courseTitle}>CS6460</Text>
            <Text style={styles.courseSubTitle}>Educational Technology</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.courseTabs}>
            <Text style={styles.courseTitle}>CS6460</Text>
            <Text style={styles.courseSubTitle}>Educational Technology</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.courseTabs}>
            <Text style={styles.courseTitle}>CS6460</Text>
            <Text style={styles.courseSubTitle}>Educational Technology</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
      {/* Badge & Chat section */}
      <View></View>
      {/* Discussion section */}
      <View></View>
      {/* Announcement section */}
      <View></View>
    </View>
  );
};

export default Dashboard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFF",
  },
  courseTabContainer: {
    display: "flex",
    flexDirection: "row",
  },
  courses: {
    backgroundColor: "#EAEAEA",
    height: 232,
    margin: 19,
    borderRadius: 15,
  },
  title: {
    marginLeft: 15,
    marginTop: 15,
    marginBottom: 9,
    fontSize: 16,
    fontWeight: "bold",
  },
  courseTabs: {
    backgroundColor: "#D9D9D9",
    height: 71,
    width: 144,
    marginLeft: 15,
    borderRadius: 15,
  },
  courseTitle: {
    fontWeight: "bold",
    fontSize: 24,
    marginLeft: 11,
    marginTop: 4,
    marginBottom: 4,
  },
  courseSubTitle: {
    fontWeight: "bold",
    fontSize: 11,
    marginLeft: 11,
  },
});
