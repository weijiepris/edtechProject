import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { IUser } from '../utils/constants';

interface IChildCard {
  child: IUser;
  handleOnPress: (pathName: string, childId: string) => void;
}

const ChildCard: React.FC<IChildCard> = ({ child, handleOnPress }) => {
  return (
    <View key={child.uuid} style={styles.childCard}>
      <View style={styles.childHeader}>
        <Text style={styles.childName}>
          👧 {child.firstName} {child.lastName}
        </Text>
      </View>
      <View style={styles.childActions}>
        <TouchableOpacity
          style={styles.childActionButton}
          onPress={() => handleOnPress('/childassignment', child.uuid)}
        >
          <Text style={styles.childActionText}>📚 View Assignments</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.childActionButton}
          onPress={() => handleOnPress(`/childgrade`, child.uuid)}
        >
          <Text style={styles.childActionText}>📊 View Gradings</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChildCard;

const styles = StyleSheet.create({
  childCard: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },

  childHeader: {
    backgroundColor: '#E0E0E0',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  childName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },

  childActions: {
    padding: 16,
    backgroundColor: '#F9F9F9',
  },

  childActionButton: {
    backgroundColor: '#EAEAEA',
    padding: 12,
    borderRadius: 10,
    marginBottom: 10,
  },

  childActionText: {
    fontWeight: '600',
    fontSize: 15,
  },
});
