import React, { ReactNode } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, ViewStyle } from 'react-native';
import { Entypo, Ionicons, Feather } from '@expo/vector-icons';
import { useExpoRouter } from 'expo-router/build/global-state/router-store';

interface HeaderPropsFirstVariation extends HeaderProps {
  showBackButton: false;
  renderLeftSection: () => ReactNode;
  renderMiddleSection: (() => ReactNode) | string;
  renderRightSection?: () => ReactNode;
}

interface HeaderPropsSecondVariation extends HeaderProps {
  showBackButton: true;
  renderLeftSection?: never;
  renderMiddleSection: (() => ReactNode) | string;
  renderRightSection?: () => ReactNode;
}

interface HeaderProps {}

const Header: React.FC<HeaderPropsFirstVariation | HeaderPropsSecondVariation> = ({
  showBackButton,
  renderMiddleSection,
  renderLeftSection,
  renderRightSection,
  ...props
}) => {
  const router = useExpoRouter();
  return (
    <View style={styles.container}>
      <View>
        {showBackButton ? (
          <TouchableOpacity onPress={() => router.goBack()}>
            <Entypo name="chevron-left" size={40} />
          </TouchableOpacity>
        ) : (
          renderLeftSection?.()
        )}
      </View>
      <View style={styles.middleSection}>
        {typeof renderMiddleSection === 'string' ? (
          <>
            <Text style={styles.headerText}>{renderMiddleSection}</Text>
          </>
        ) : (
          renderMiddleSection()
        )}
      </View>
      <View>{renderRightSection?.()}</View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 60,
    position: 'relative',
    backgroundColor: '#FFF',
    margin: 24,
  },
  middleSection: {
    position: 'absolute',
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerText: {
    fontSize: 30,
    fontWeight: 'bold',
  },
});
