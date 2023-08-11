import { Text, View } from "@/components/Themed";
import { useAuthenticator } from "@aws-amplify/ui-react-native";
import { DataStore } from "aws-amplify";
import { Stack } from "expo-router";
import { Button } from "react-native";
import tw from 'twrnc'
import Toast from "react-native-root-toast";


function SignOutButton() {
  const { signOut } = useAuthenticator();
  return <Button title="Sign Out" onPress={signOut} />;
}

export default function Index() {
   async function clearDataStore() {
     await DataStore.clear();
     Toast.show("Storage cleared, pull to refresh", {
       duration: Toast.durations.LONG,
       position: Toast.positions.BOTTOM + 1,
       shadow: true,
       animation: true,
       hideOnPress: true,
       delay: 0,
     });
   }
  return (
    <View style={tw`flex-1 items-center justify-center`}>
      <Stack screenOptions={{headerShown: false}}/>
      <SignOutButton />
      <Button
        title="Clear datastore"
        onPress={() => clearDataStore()}
      />
    </View>
  );
}