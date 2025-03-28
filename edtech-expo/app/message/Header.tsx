import { Entypo, Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import InputText from "../components/InputText";
import { RouterStore } from "expo-router/build/global-state/router-store";

interface IHeader {
  router: RouterStore;
}

const Header: React.FC<IHeader> = ({ router }) => {
  const [search, setSearch] = useState<string>("");

  return (
    <View style={styles.container}>
      <Entypo
        name="chevron-left"
        size={48}
        color="black"
        onPress={() => router.goBack()}
      />
      <InputText
        placeholder="Search"
        showIcon={true}
        value={search}
        onChangeText={setSearch}
        style={styles.searchInput}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    height: 130,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 30,
    gap: 40,
    backgroundColor: "#FFF",
  },
  searchInput: {
    width: 250,
    borderRadius: 30,
  },
});
