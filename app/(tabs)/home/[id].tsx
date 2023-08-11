import { useProductStore } from "@/contexts/useProductStore";
import { Product, CartProduct } from "../../../src/models";
import { Button, StyleSheet, Text, View } from "react-native";
import { Auth, DataStore } from "aws-amplify";
import { Link, Stack, useLocalSearchParams, useRouter } from "expo-router";
import { MotiText, MotiView } from "moti";
import { useEffect, useState } from "react";
import { Pressable } from "react-native";
import tw from 'twrnc'
import QuantitySelector from "@/components/misc/quantity_selector";
import ImageModal from "@/components/modals/image_modal";
import { SafeAreaView } from "react-native-safe-area-context";
import { Screen } from "@/components/views/screen";
import ImageCarousel from "@/components/cards/image_carousel";
import { formatNairaPrice } from "@/constants/FormatPrice";

export default function ProductDetail() {
  const [isLoading, setIsLoading] = useState(true);
  const [cartProducts, setCartProducts] = useState<CartProduct[]>([]);

  const [product, setProduct] = useState<Product | undefined>(undefined);
  const [quantity, setQuantity] = useState(1);

  let [isImageModalVisible, setIsImageModalVisible] = useState(false);
  let [activeIndex, setActiveIndex] = useState(0);

  const { id } = useLocalSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (!id) return;
    DataStore.query(Product, id).then(setProduct);
    setIsLoading(false);
  }, [id]);

  const fetchCartProducts = async () => {
    try {
      const userData = await Auth.currentAuthenticatedUser();
      DataStore.query(CartProduct, (cp) =>
        cp.userSub.eq(userData.attributes.sub)
      ).then(setCartProducts);
    } catch (error) {
      console.warn("Error fetching cart products:", error);
    }
  };

  useEffect(() => {
    fetchCartProducts();
  }, []);

  const handleImagePress = (index: number): void => {
    setIsImageModalVisible(!isImageModalVisible);
    setActiveIndex(index);
  };

  const onAddToCart = async () => {
    const userData = await Auth.currentAuthenticatedUser();

    if (!product || !userData) {
      return;
    }

    // Check if the product already exists in the cart
    const existingCartProduct = cartProducts.find(
      (cp) => cp.productID === product.id
    );

    if (existingCartProduct) {
      // If the product already exists, update the quantity
      const updatedQuantity = existingCartProduct.quantity + 1;

      // Create a new instace of BagProduct with the updated quantity
      const updatedCartProduct = CartProduct.copyOf(
        existingCartProduct,
        (updated) => {
          (updated.userSub = userData.attributes.sub),
            (updated.quantity = updatedQuantity),
            (updated.productID = product.id);
        }
      );

      await DataStore.save(updatedCartProduct);
    } else {
      const newCartProduct = new CartProduct({
        userSub: userData.attributes.sub,
        quantity,
        productID: product.id,
      });

      await DataStore.save(newCartProduct);
    }

    router.push("/(tabs)/cart");
  };

  if (isLoading && !product) {
    return <Text>Loading...</Text>;
  }
  typeof(product?.price)

   return (
     <View style={{ flex: 1 }}>
       <Stack.Screen
         options={{
           title: `${product?.title}`,
         }}
       />
       <Screen style={tw`flex-1 bg-transparent`} scroll>
         <ImageCarousel onImagePress={handleImagePress} product={product} />
         <View style={tw`flex-1 bg-transparent p-4`}>
           <View
             style={{
               flexDirection: 'row',
               justifyContent: 'space-between',
               padding: 1
             }}
           >
             <Text style={tw`text-2xl font-bold text-slate-800`}>
               {product?.title}
             </Text>
             <Text style={tw`font-medium text-2xl text-slate-700`}>
               {product?.price}
             </Text>
           </View>
           <Text
             style={{
               marginTop: 16,
               lineHeight: 24,
             }}
           >
             {product?.about}
           </Text>
           <Button title="Add to Cart" onPress={onAddToCart} />
           <Button
             title="Go to Cart"
             onPress={() => router.push("/(tabs)/cart")}
           />
           <View style={tw`self-center`}>
             <QuantitySelector quantity={quantity} setQuantity={setQuantity} />
           </View>
         </View>
         <ImageModal
           activeIndex={activeIndex}
           images={product?.images}
           isVisible={isImageModalVisible}
           setVisible={setIsImageModalVisible}
         />
       </Screen>
     </View>
   );
}