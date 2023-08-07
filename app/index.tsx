import { Text, View } from "@/components/Themed";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { Stack } from "expo-router";
import { Button } from "react-native";
import tw from 'twrnc'

function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

export default function Index() {
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Stack screenOptions={{headerShown: false}}/>
      <SignOutButton />
    </View>
  );
}