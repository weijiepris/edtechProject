import { useNavigation, useRouter } from "expo-router";
import { Button, Text, View } from "react-native";
import { useEffect } from "react";

export default function Home() {
  const navigation = useNavigation();
  const router = useRouter();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <View>
      <Text>Welcome to the HOME Screen!</Text>
      <Button title="Go to landing" onPress={() => router.push("/")} />
    </View>
  );
}
