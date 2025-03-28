import React from 'react';
import { StyleSheet, View } from 'react-native';
import InputText from '../components/InputText';
import { EvilIcons, Feather, FontAwesome, Ionicons } from '@expo/vector-icons';

const SendMessage = () => {
  return (
    <View style={styles.container}>
      <InputText
        style={styles.textbox}
        showIcon={true}
        placeholder="Write message here..."
        renderIcon={() => <Ionicons name="attach" size={24} color="black" />}
      />
      <View style={styles.icons}>
        <FontAwesome name="microphone" size={32} color="black" />
        <EvilIcons name="sc-telegram" size={32} color="black" />
      </View>
    </View>
  );
};

export default SendMessage;

const styles = StyleSheet.create({
  container: {
    marginTop: 6,
    display: 'flex',
    flexDirection: 'row',
    height: 300,
    backgroundColor: '#FFF',
    paddingHorizontal: 30,
    paddingTop: 50,
  },
  textbox: { height: 100, width: 300 },
  icons: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: 30,
    marginLeft: 10,
  },
});
