import { IUser, RoleDisplayMapping, UserRoles } from '@/app/utils/constants';
import { Feather, Fontisto } from '@expo/vector-icons';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface IHeader {
  user?: IUser;
}
const Header: React.FC<IHeader> = ({ user }) => {
  const router = useExpoRouter();

  const getStyles = () => {
    const role = user?.role ?? UserRoles.USER;

    switch (role) {
      case UserRoles.PARENT:
        return styles.searchBellParent;
      case UserRoles.STUDENT:
        return styles.searchBellStudent;
      case UserRoles.TEACHER:
        return styles.searchBellTeacher;
      default:
        return styles.searchBellDefault;
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <TouchableOpacity style={styles.userIcon} onPress={() => router.push('/profile')}>
          <Feather name="user" size={38} color="black" />
        </TouchableOpacity>
        <Text style={styles.userRole}>{RoleDisplayMapping.get(user?.role ?? UserRoles.USER)}</Text>
        <View style={getStyles()}>
          <Feather name="search" size={38} color="black" />
          <Fontisto name="bell" size={38} color="black" />
        </View>
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 100,
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 31,
    paddingLeft: 31,
  },
  userIcon: {
    height: 52,
    width: 52,
    backgroundColor: '#D9D9D9',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 35,
  },
  userRole: {
    fontWeight: 'bold',
    fontSize: 36,
  },
  searchBellDefault: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 3,
    justifyContent: 'space-between',
    paddingHorizontal: 70,
    gap: 35,
  },
  searchBellParent: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 3,
    justifyContent: 'space-between',
    gap: 30,
    marginLeft: 35,
  },
  searchBellStudent: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 3,
    justifyContent: 'space-between',
    gap: 25,
    marginLeft: 15,
  },
  searchBellTeacher: {
    display: 'flex',
    flexDirection: 'row',
    marginTop: 3,
    justifyContent: 'space-between',
    marginLeft: 5,
    gap: 20,
  },
});
