import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Entypo, Feather, MaterialIcons, FontAwesome5 } from '@expo/vector-icons';

const friends = ['WJ', 'JC', 'KK', 'KK', 'AA', 'WC', 'TT', 'TC'];

const Leaderboard = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <Entypo name="chevron-left" size={28} />
        <Text style={styles.headerText}>Leaderboard</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Progress</Text>
        <View style={styles.progressRow}>
          <FontAwesome5 name="book-reader" size={28} />
          <Text style={styles.progressCount}>1982</Text>
          <View style={{ marginLeft: 10 }}>
            <Text>out of 2505 pages</Text>
            <Text style={{ fontWeight: 'bold' }}>#1 among friends</Text>
          </View>
        </View>
        <View style={styles.progressBarWrapper}>
          <View style={styles.progressBarFill} />
          <View style={styles.progressBarEmpty} />
        </View>
        <View style={styles.avatarRow}>
          <Text style={styles.avatar}>WJ</Text>
          <Text style={styles.avatar}>KK</Text>
          <Text style={styles.avatar}>JC</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
          <View style={styles.rowSpace}>
            <Text style={styles.cardTitle}>Badges</Text>
            <Feather name="upload" size={20} />
          </View>
          <View style={styles.badgesRow}>
            <Feather name="key" size={24} />
            <Feather name="smile" size={24} />
            <Feather name="thumbs-up" size={24} />
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Level</Text>
          <Text style={styles.level}>109</Text>
          <Text style={styles.levelSubtext}>Keep it up!</Text>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.moduleHighlight}>8</Text>
          <Text style={styles.moduleInfo}>modules cleared{'\n'}2 more to go!</Text>
          <Text style={{ fontWeight: 'bold', marginTop: 8 }}>
            Your projected{'\n'}graduation period{'\n'}is August 2025
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.moduleHighlight}>8</Text>
          <Text style={styles.moduleInfo}>friends</Text>
          <View style={styles.friendsGrid}>
            {friends.map((f, i) => (
              <Text key={i} style={styles.avatar}>
                {f}
              </Text>
            ))}
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.addFriendsButton}>
        <Feather name="plus" size={20} />
        <Text style={styles.addFriendsText}>Add friends</Text>
        <Feather name="upload" size={20} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 60,
    backgroundColor: '#FFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 20,
  },
  headerText: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: '#EAEAEA',
    borderRadius: 20,
    padding: 16,
    marginBottom: 20,
    flex: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 10,
  },
  progressRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 8,
  },
  progressCount: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  progressBarWrapper: {
    height: 10,
    backgroundColor: '#ccc',
    borderRadius: 6,
    overflow: 'hidden',
    flexDirection: 'row',
    marginTop: 8,
  },
  progressBarFill: {
    width: '75%',
    backgroundColor: '#3B6D4D',
  },
  progressBarEmpty: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  avatarRow: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  avatar: {
    backgroundColor: '#C1C1C1',
    color: '#000',
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 100,
    overflow: 'hidden',
    fontWeight: 'bold',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  rowSpace: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  badgesRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 10,
  },
  level: {
    fontSize: 28,
    fontWeight: 'bold',
    marginTop: 8,
  },
  levelSubtext: {
    marginTop: 4,
  },
  moduleHighlight: {
    fontSize: 28,
    fontWeight: 'bold',
  },
  moduleInfo: {
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 10,
  },
  friendsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  addFriendsButton: {
    backgroundColor: '#EAEAEA',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 30,
    marginTop: 10,
  },
  addFriendsText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
