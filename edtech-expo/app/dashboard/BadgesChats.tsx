import { Feather, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { fetchChatPartners } from '../services/Chat.service';
interface ChatPartner {
  chatId: string;
  partner: {
    uuid: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  lastMessage: {
    content: string;
    createdAt: string;
  } | null;
}
const Badges: React.FC = () => {
  const router = useRouter();

  const goTo = (page: string) => {
    router.push(page);
  };
  const [partners, setPartners] = useState<ChatPartner[]>([]);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchChatPartners();
        setPartners(data);
      } catch (err) {
        console.error('Failed to fetch chat partners:', err);
      }
    };
    load();
  }, []);

  return (
    <View style={styles.badgesChatsContainer}>
      <View style={styles.badgesContainer}>
        <View style={styles.iconTitleContainer}>
          <Feather name="codesandbox" size={34} color="black" />
          <Text style={styles.iconTitle}>Badges</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.chatsContainer} onPress={() => goTo('/chat')}>
        <View style={styles.chatHeader}>
          <MaterialIcons name="chat-bubble-outline" size={34} color="black" />
          <Text style={styles.iconTitle}>Chats</Text>
        </View>

        <View style={styles.initialsRow}>
          {partners.map((item, index) => {
            const initials =
              `${item.partner.firstName[0] ?? ''}${item.partner.lastName[0] ?? ''}`.toUpperCase();
            return (
              <View
                key={index}
                style={partners.length < 4 ? styles.initialsIcon : styles.initialsIconSmall}
              >
                <Text style={styles.initialsText}>{initials}</Text>
              </View>
            );
          })}
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default Badges;

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
  chatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
    marginLeft: 15,
  },
  initialsRow: {
    marginLeft: 15,
    marginTop: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  initialsIcon: {
    backgroundColor: '#D9D9D9',
    height: 36,
    width: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsIconSmall: {
    backgroundColor: '#D9D9D9',
    height: 30,
    width: 30,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsText: {
    fontWeight: 'bold',
    fontSize: 14,
  },
});
