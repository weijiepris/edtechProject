import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ProfileContent from './ProfileContent';
import Header from '../components/Header';
import { getProfile } from '../services/User.service';
import { IUser } from '../utils/constants';

const Profile = () => {
  const [profile, setProfile] = useState<IUser | undefined>(undefined);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        console.log(data);
        setProfile(data);
      } catch (err) {
        console.error('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <View style={styles.container}>
      <Header showBackButton={true} renderMiddleSection={'My Profile'} />
      <ProfileContent profile={profile} />
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
  },
});
