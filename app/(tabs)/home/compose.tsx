import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { MotiView, ScrollView } from "moti";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Alert,
  View,
  StyleSheet,
  Dimensions,
  Image,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import tw from "../../../lib/tailwind";

import FlyInput from "@/components/forms/fly_input";
import { RoundIconButton } from "@/components/icons";
import { Button } from "@/components/forms/button";
import { Space } from "@/components/space/re_space";
import { MaterialIcons } from "@expo/vector-icons";
import { useProductStore } from "@/contexts/useProductStore";


const { width } = Dimensions.get("window");
const PlaceholderImageSource = "https://picsum.photos/200/300";

interface ProductData {
  id?: string;
  title: string;
  description: string;
  image: string;
  images: string[];
  options: string[];
  category: string;
  avgRating:  number;
  ratings:  number;
  brand: string;
  price: number;
  oldPrice: number;
}

export default function Compose() {
  const { isLoading, error, createProduct } = useProductStore();
  const [formData, setFormData] = useState<ProductData>({
    title: "",
    description: "",
    image: "",
    images: [],
    options: ["red", "blue", "orange", "yellow", "green", "silver", "gold"],
    category: "",
    avgRating: 0,
    ratings: 0,
    brand: "",
    price: 0,
    oldPrice: 0,
  });

  const categories = [
    "Freezer",
    "Fridge",
    "Gas Cooker",
    "Television",
    "Generator",
    "Air Conditioner",
    "Washing Machine"
  ];
  const brands = [
    "Beko",
    "LG",
    "Hisense",
    "Samsung",
    "Firman",
    "Nexus",
    "Whirlpool",
    "Thermofrost",
    "Senci",
    "Kenstar",
    "Scanfrost"
  ];

  const router = useRouter();
 
  const handleAddProduct = () => {
    createProduct(formData);
    router.back();
    setFormData({
      title: '',
      description: '',
      image: '',
      images: [],
      options: [],
      category: '',
      avgRating: 0,
      ratings: 0,
      brand: '',
      price: 0,
      oldPrice: 0,
    });
  };

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      // setImages(result.assets.map(({ uri }) => uri));
      // ImagePicker result contains an array of selected image URIs
      const selectedUris =
        result?.assets?.map((selectedItem) => selectedItem.uri) || [];
      // Update the images field in the form data with the array of selected image URIs
              setFormData({
                ...formData,
                images: [...formData.images, ...selectedUris],
                image: selectedUris[0]
              });

    } else {
      Alert.alert("You did not select any image.");
    }
  };

  // const handleInputNumberChange = (field: keyof ProductData, value: string) => {
  //   const parsedValue = parseFloat(value.replace(/,/g, ''));
  //   if (!isNaN(parsedValue)) {
  //     setFormData({ ...formData, [field]: parsedValue });
  //   } else {
  //     setFormData({...formData, [field]: 0 })
  //   }
  // };

  const handleInputChange = (field: keyof ProductData, value: any) => {
    if (field === "price" || field === "avgRating" || field === "oldPrice") {
      const parsedValue = parseFloat(value);
      if (!isNaN(parsedValue)) {
        setFormData({ ...formData, [field]: parsedValue });
      } else {
        setFormData({ ...formData });
      }
    } else {
      setFormData({ ...formData, [field]: value });
    }
  };

  const showIconPlatform =
    Platform.OS === "android" ? (
      <></>
    ) : (
      <MaterialIcons
        style={styles.icon}
        name="keyboard-arrow-down"
        size={25}
        color="black"
      />
    );

  return (
    <KeyboardAvoidingView
      style={tw.style("flex-1 pt-3")}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView contentContainerStyle={tw.style("flex-grow p-3 pb-12")}>
        <MotiView style={tw.style("flex-1 pt-3")}>
          <FlyInput
            value={formData.title}
            label="Title"
            onChangeText={(value) => handleInputChange("title", value)}
            placeholder="Title"
          />
          <FlyInput
            value={formData.description}
            label="Description"
            onChangeText={(value) => handleInputChange("description", value)}
            placeholder="Description"
            multiline
            numberOfLines={4}
          />
          <FlyInput
            value={formData.price.toString()}
            label="Price"
            onChangeText={(value) => handleInputChange("price", +value)}
            placeholder="Enter Price"
            keyboardType="decimal-pad"
          />
          <FlyInput
            value={formData.ratings.toString()}
            label="Ratings"
            onChangeText={(value) => handleInputChange("ratings", +value)}
            placeholder="Enter Ratings"
            keyboardType="decimal-pad"
          />
          <FlyInput
            value={formData.avgRating.toString()}
            label="AvgRating"
            onChangeText={(value) => handleInputChange("avgRating", +value)}
            placeholder="Enter Average Rating"
            keyboardType="decimal-pad"
          />
          <FlyInput
            value={formData.oldPrice.toString()}
            label="Old Price"
            onChangeText={(value) => handleInputChange("oldPrice", +value)}
            placeholder="Enter Old Price"
            keyboardType="decimal-pad"
          />
          {/* <RoundIconButton
            name="feather"
            size={40}
            color="#FF0214"
            backgroundColor="rgba(255,255,255,0.5)"
            iconRatio={0.6}
            onPress={()=>console.warn('icon pressed!!')}
          /> */}
          <View style={tw`mt-2 mb-2 justify-around`}>
            <Button
              onPress={pickImages}
              textStyle={{
                color: "#222",
                fontWeight: "500",
                textShadowColor: "#000077",
                textShadowRadius: 0.4,
                textShadowOffset: { width: 0.5, height: 0.2 },
              }}
            >
              Select up to 3 images
            </Button>

            <View style={tw`p-4 px-2 flex-row flex-wrap bg-white border border-slate-200 `}>
              {formData.images
                ? formData.images.map((image) => (
                    <View key={image}>
                      <Image
                        key={image}
                        source={{ uri: image ?? PlaceholderImageSource }}
                        style={{
                          width: 80,
                          height: 80,
                          margin: 6,
                        }}
                      />
                    </View>
                  ))
                : null}
            </View>
          </View>
          {/* <Button
            onPress={pickImages}
            style={tw.style(
              "bg-white rounded  w-full p-1 items-center justify-center"
            )}
            textStyle={tw`text-[17px] text-[#1877F2] font-medium`}
          >
            Pick Images(up to 4)
          </Button> */}
          <Space height={14} />
          <View
            style={tw` flex-row  bg-neutral-50 border-[1.5px] rounded-md h-13 justify-between px-2 border-neutral-300 items-center relative`}
          >
            <View>
              <RNPickerSelect
                onValueChange={(value) => handleInputChange("category", value)}
                placeholder={{ label: "Category", value: "" }}
                value={formData.category}
                items={categories.map((i) => {
                  return {
                    label: i,
                    value: i,
                  };
                })}
                style={pickerSelectStyles}
              />
            </View>
            {showIconPlatform}
          </View>
          <View
            style={tw` flex-row mt-4 bg-neutral-50 border-[1.5px] rounded-md h-13 justify-between mb-4 px-2 border-neutral-300 items-center relative`}
          >
            <View>
              <RNPickerSelect
                onValueChange={(value) => handleInputChange("brand", value)}
                placeholder={{ label: "Brand", value: "" }}
                items={brands.map((i) => {
                  return {
                    label: i,
                    value: i,
                  };
                })}
                value={formData.brand}
                style={pickerSelectStyles}
              />
            </View>
            {showIconPlatform}
          </View>
          <Space height={10} />
          <Button
            style={tw.style("bg-[#1877F2] p-2 rounded-md")}
            onPress={handleAddProduct}
          >
            Submit
          </Button>
        </MotiView>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  icon: {
    position: "absolute",
    right: 10,
  },
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 15,
    color: "black",
    paddingVertical: 10,
    width: width,
  },
  inputAndroid: {
    fontSize: 15,
    color: "black",
    paddingVertical: 10,
    paddingRight: width - 30,
  },
});
