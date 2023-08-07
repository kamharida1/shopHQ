import { Pressable, StyleSheet, useColorScheme } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text, View } from "@/components/Themed";
import { Link } from "expo-router";
import Colors from "@/constants/Colors";

export default function Products() {
  const colorScheme = useColorScheme();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Products</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <EditScreenInfo path="app/(tabs)/index.tsx" />
      <Link href="/" asChild>
        <Pressable>
          {({ pressed }) => (
            <Text
              style={{
                color: "blue",
              }}
            >
              To Home
            </Text>
          )}
        </Pressable>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
