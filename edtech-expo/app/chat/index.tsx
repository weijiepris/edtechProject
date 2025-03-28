import { useExpoRouter } from "expo-router/build/global-state/router-store";
import React, { useState } from "react";
import { Text, View } from "react-native";
import Header from "./Header";
import Messages from "./Messages";

export default function () {
  const router = useExpoRouter();

  const onSearch = (value: string) => {
    console.log("searching", value);
  };
  return (
    <View>
      <Header onSearch={onSearch} router={router} />
      <Messages />
    </View>
  );
}
