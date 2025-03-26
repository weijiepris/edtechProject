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
import { Feather, MaterialIcons, Entypo } from "@expo/vector-icons";

const Dashboard = () => {
  const { user, loading: userLoading } = useAccount();
  const { loading: authLoading, validateToken } = useAuth();
  console.log("[dashboard]", user);

  if (!userLoading && !user) {
    validateToken();
  }

  const Courses: React.FC = () => {
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

  const Badges: React.FC = () => {
    return (
      <View style={styles.badgesChatsContainer}>
        <View style={styles.badgesContainer}>
          <View style={styles.iconTitleContainer}>
            <Feather name="codesandbox" size={34} color="black" />
            <Text style={styles.iconTitle}>Badges</Text>
          </View>
        </View>
        <View style={styles.chatsContainer}>
          <View style={styles.iconTitleContainer}>
            <MaterialIcons name="chat-bubble-outline" size={34} color="black" />
            <Text style={styles.iconTitle}>Chats</Text>
          </View>
        </View>
      </View>
    );
  };

  const Discussions: React.FC = () => {
    return <View></View>;
  };

  const Announcements: React.FC = () => {
    return <View></View>;
  };

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
      <Courses />
      {/* Badge & Chat section */}
      <Badges />
      {/* Discussion section */}
      <Discussions />
      {/* Announcement section */}
      <Announcements />
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
    gap: 15,
    paddingHorizontal: 15,
  },
  courseTabs: {
    backgroundColor: "#D9D9D9",
    height: 71,
    width: 144,
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
  coursesContainer: {
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
  iconTitleContainer: {
    display: "flex",
    flexDirection: "row",
    marginTop: 15,
    marginLeft: 15,
  },
  iconTitle: {
    marginLeft: 7,
    marginTop: 7,
    marginBottom: 9,
    fontSize: 16,
    fontWeight: "bold",
  },
  badgesChatsContainer: { display: "flex", flexDirection: "row" },
  badgesContainer: {
    backgroundColor: "#EAEAEA",
    height: 132,
    width: 181,
    marginLeft: 19,
    borderRadius: 15,
    display: "flex",
    flexDirection: "column",
  },
  chatsContainer: {
    backgroundColor: "#EAEAEA",
    height: 132,
    width: 181,
    marginLeft: 11,
    borderRadius: 15,
  },
});
