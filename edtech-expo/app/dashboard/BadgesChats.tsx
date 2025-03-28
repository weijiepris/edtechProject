import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export const Badges: React.FC = () => {
  const router = useRouter();

  const goTo = (page: string) => {
    router.push(page);
  };

  return (
    <View style={styles.badgesChatsContainer}>
      <View style={styles.badgesContainer}>
        <View style={styles.iconTitleContainer}>
          <Feather name="codesandbox" size={34} color="black" />
          <Text style={styles.iconTitle}>Badges</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.chatsContainer} onPress={() => goTo('/chat')}>
        <View style={styles.iconTitleContainer}>
          <MaterialIcons name="chat-bubble-outline" size={34} color="black" />
          <Text style={styles.iconTitle}>Chats</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  iconTitleContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 15,
    marginLeft: 15,
  },
  iconTitle: {
    marginLeft: 7,
    marginTop: 7,
    marginBottom: 9,
    fontSize: 16,
    fontWeight: 'bold',
  },
  badgesChatsContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginBottom: 19,
  },
  badgesContainer: {
    backgroundColor: '#EAEAEA',
    height: 132,
    width: 181,
    marginLeft: 19,
    borderRadius: 15,
    display: 'flex',
    flexDirection: 'column',
  },
  chatsContainer: {
    backgroundColor: '#EAEAEA',
    height: 132,
    width: 181,
    marginLeft: 11,
    borderRadius: 15,
  },
});
