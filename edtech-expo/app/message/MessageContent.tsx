import React from 'react';
import { FlatList, Text, View, StyleSheet } from 'react-native';
import { IChatMessage } from '../utils/constants';
import useAccount from '../hooks/useAccount';

interface MessageContentProps {
  messages: IChatMessage[];
}

const MessageContent: React.FC<MessageContentProps> = ({ messages }) => {
  const { user } = useAccount();

  if (!user) return <></>;

  const renderItem = ({ item }: { item: IChatMessage }) => {
    const isMe = user.uuid === item.sender.uuid;

    return (
      <View style={[styles.messageRow, isMe ? styles.myMessageRow : styles.theirMessageRow]}>
        {!isMe && (
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>
              {item.sender.firstName[0]}
              {item.sender.lastName[0]}
            </Text>
          </View>
        )}
        <View style={[styles.messageBubble, isMe ? styles.myBubble : styles.theirBubble]}>
          <Text style={styles.messageText}>{item.content}</Text>
          <Text style={styles.timestamp}>
            {new Date(item.createdAt).toLocaleTimeString([], {
              hour: '2-digit',
              minute: '2-digit',
            })}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        renderItem={renderItem}
        keyExtractor={item => item.uuid}
        contentContainerStyle={styles.list}
      />
    </View>
  );
};

export default MessageContent;
const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    display: 'flex',
    height: 500,
    backgroundColor: '#FFF',
  },
  list: {
    padding: 12,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 6,
    alignItems: 'flex-end',
  },
  myMessageRow: {
    justifyContent: 'flex-end',
  },
  theirMessageRow: {
    justifyContent: 'flex-start',
  },
  avatar: {
    height: 40,
    width: 40,
    backgroundColor: '#E1E1E1',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatarText: {
    fontWeight: 'bold',
  },
  messageBubble: {
    maxWidth: '75%',
    borderRadius: 12,
    padding: 10,
  },
  myBubble: {
    backgroundColor: '#D9D9D9',
    alignSelf: 'flex-end',
  },
  theirBubble: {
    backgroundColor: '#E5E5E5',
  },
  messageText: {
    fontSize: 16,
    fontWeight: '500',
  },
  timestamp: {
    marginTop: 6,
    fontSize: 12,
    textAlign: 'right',
    fontWeight: '500',
  },
});
