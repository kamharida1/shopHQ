import { Text } from "@/components/Themed";
import { Link, Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Platform, Pressable } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { ProductsProvider } from "@/contexts/products/products";

export default function HomeLayout() {
  const router = useRouter();

  return (
    <ProductsProvider>
      <StatusBar style="auto" />

      <Stack
        screenOptions={
          {
            //headerRight: SignOutButton,
          }
        }
      >
        <Stack.Screen
          name="index"
          options={{
            title: "Products",
            headerRight: ComposeButton,
            headerLargeTitle: true,
            headerSearchBarOptions: {
              onChangeText: (event) => {
                // Update the query params to match the search query.
                router.setParams({
                  q: event.nativeEvent.text,
                });
              },
            },
          }}
        />
        <Stack.Screen
          name="compose"
          options={{
            title: "Create a new product",
            presentation: "modal",
            headerRight: Platform.select({
              ios: DismissComposeButton,
            }),
          }}
        />
      </Stack>
    </ProductsProvider>
  );
}

function ComposeButton() {
  const router = useRouter();

  return (
    <Link
      href="/(tabs)/home/compose"
      onPress={(ev) => {
        ev.preventDefault();
        router.push("/(tabs)/home/compose");
      }}
      asChild
    >
      <Pressable
        style={{
          flexDirection: "row",
          display: "flex",
          alignItems: "center",
          paddingRight: 8,
        }}
      >
        <Text
          style={{
            fontWeight: "normal",
            paddingHorizontal: 8,
            fontSize: 16,
          }}
        >
          Add Product
        </Text>
        <FontAwesome5 name="arrow-circle-right" size={24} color="black" />
      </Pressable>
    </Link>
  );
}

function DismissComposeButton() {
  return (
    <Link href="..">
      <Text
        style={{
          fontWeight: "normal",
          paddingHorizontal: 8,
          fontSize: 16,
        }}
      >
        Back
      </Text>
    </Link>
  );
}
