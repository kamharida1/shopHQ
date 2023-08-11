import { Text, View } from '@/components/Themed';
import { useAuthenticator } from '@aws-amplify/ui-react-native';
import { Link, Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { MotiText, MotiView } from 'moti';
import { ActivityIndicator, Button, ImageBackground, Pressable, useWindowDimensions } from 'react-native';
import tw from 'twrnc';
import { FontAwesome5 } from '@expo/vector-icons';
import { useProductStore } from '@/contexts/useProductStore';
import { useMemo } from 'react';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import { BlurView } from 'expo-blur';
import { Space } from '@/components/space/re_space';
import PriceWithNairaSymbol from '@/components/price_with_naira';
import Animated from 'react-native-reanimated';

const AnimatedImagebackground =
  Animated.createAnimatedComponent(ImageBackground);
const AnimatedPressable = Animated.createAnimatedComponent(Pressable)


const ProductItem = ({ item }: { item: any }) => (
  <Link href={`/(tabs)/home/${item.id}`} asChild>
    <AnimatedPressable
      style={{
        width: "45%",
        aspectRatio: 1,
        margin: "2.5%",
        borderRadius: 10,
        overflow: "hidden",
      }}
      sharedTransitionTag={`container_${item.id}`}
    >
      {({ hovered, pressed }) => (
        <AnimatedImagebackground
          source={{ uri: item.images[0] }}
          style={{ flex: 1, justifyContent: "flex-end" }}
          sharedTransitionTag={`image_${item.id}`}
        >
          <BlurView style={tw.style(`p-2`)} intensity={50} tint="dark">
            <Text style={tw`text-white font-semibold`}>{item.title}</Text>
            <Space height={5} />
            <PriceWithNairaSymbol
              style={tw`text-white font-light text-base `}
              price={item.price}
            />
          </BlurView>
        </AnimatedImagebackground>
      )}
    </AnimatedPressable>
  </Link>
);

export default function Home() {
  const { products } = useProductStore();

  if (!products) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <>
      <ProductsList />
    </>
  );
};

function useQueriedProducts() {
  const { products } = useProductStore();
  const { q } = useLocalSearchParams<{ q: string }>();

  return useMemo(
    () =>
      products.filter((item) => {
        if (!q) {
          return true;
        }
        return item.title.toLowerCase().includes(q?.toLowerCase());
      }),
    [q, products]
  );
};

function ProductsList() {
  const products = useQueriedProducts();
  const { width } = useWindowDimensions();
  const innerWindow = width - 48;
  const insets = useSafeAreaInsets();

  return (
    <FlatList
      contentInsetAdjustmentBehavior="automatic"
      scrollEventThrottle={16}
      data={products}
      renderItem={({ item }) => <ProductItem item={item} />}
      keyExtractor={(item) => item.title}
      numColumns={2}
      ListEmptyComponent={ListEmptyComponent}
    />
  );
};

function ListEmptyComponent() {
  const { q } = useLocalSearchParams<{ q?: string }>();

  const message = useMemo(() => {
    return q != null ? "No items found: " + q : "Create an item to get started";
  }, [q]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 16, textAlign: "center" }}>{message}</Text>
    </View>
  );
}
