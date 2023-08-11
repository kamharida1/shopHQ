import { useRouter } from "expo-router";
import * as ImagePicker from "expo-image-picker";
import { Button as NButton}from 'react-native'
import { MotiView, ScrollView } from "moti";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  KeyboardAvoidingView,
  Platform,
  Alert,
  View,
  StyleSheet,
  Dimensions,
  Image,
  ActivityIndicator,
  Text,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import tw from "../../../lib/tailwind";
import { Storage, DataStore, Auth } from "aws-amplify";

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
  avgRating: number;
  ratings: number;
  brand: string;
  price: number;
  oldPrice: number;
};

export default function Compose() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState<string[]>([]);
  const [image, setImage] = useState("");
  const [category, setCategory] = useState("");
  const [avgRating, setAvgRating] = useState(0);
  const [ratings, setRatings] = useState(0);
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState(0);
  const [oldPrice, setOldPrice] = useState(0);

  const [prog, setProg] = useState(0);


  const options = [
    "red",
    "blue",
    "green",
    "silver",
    "platinum silver",
    "black",
    "white",
    "yellow"
  ]

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
    "Maxi",
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

  const { isLoading, error, createProduct } = useProductStore();

  const s3BucketUrl = `https://shophq-storage-b216272734926-dev.s3.us-east-2.amazonaws.com/public/`;

  const router = useRouter();

  const handleCreateProduct = async () => {
    const product = {
      title,
      description,
      images,
      options,
      image,
      ratings,
      category,
      avgRating,
      brand,
      price,
      oldPrice,
    };
    await createProduct(product);
    router.back();
  };

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      quality: 1,
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
    });

    if (!result.canceled) {
      setImages(result.assets.map(({ uri }) => uri));
    } else {
      alert("You did not select any image.");
    }
  };

  const uploadButtonClick = async () => {
    // let promises = [];
    // images.map((image, i) => {
    //   promises.push(uploadImageToS3(image));
    // });

    let uploadedImageURIs: string[] = []; // Temporary array to store uploaded image URIs
    try {
      await Promise.all(
        images.map(async (image) => {
          const uploadedImageKey = await uploadImageToS3(image);
          if (uploadedImageKey) {
            const imageURL = `${s3BucketUrl}${uploadedImageKey}`; // Construct complete image URL
            uploadedImageURIs.push(imageURL);
          }
        })
      );
      // Update the images array in the form's state
      setImages([...images, ...uploadedImageURIs]);
    } catch (e) {
      console.error("Error uploading images:", e);
    }
  };

   const generateRandomId = () => {
     const timestamp = new Date().getTime();
     const randomNum = Math.floor(Math.random() * 10000);
     return `${timestamp}_${randomNum}`;
   };
  
  const uploadImageToS3 = async (image: string) => {
    try {
      const response = await fetch(image);
      const blob = await response.blob();
      const randomId = generateRandomId();
      const fileKey = `${randomId}.jpg`;
      await Storage.put(fileKey, blob, {
        progressCallback(progress) {
          console.log(progress);
          setProg(progress.loaded / progress.total)
        },
      });
      return fileKey;
    } catch (err) {
      console.log("Error uploading file:", err);
      return null;
    }
  }
 
  const handleInputNumberChange = (text: any, setValue: any) => {
    const parsedValue = parseFloat(text);
    if (!isNaN(parsedValue)) {
      setValue(parsedValue);
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
        {isLoading && (
          <View style={tw`z-10 flex-1 items-center justify-center`}>
            <ActivityIndicator />
          </View>
        )}
        {error && (
          <View style={tw` z-11 flex-1 items-center justify-center`}>
            <Text style={tw`text-[17px] font-bold`}>{error.message}</Text>
          </View>
        )}
        <MotiView style={tw.style("flex-1 pt-3")}>
          <FlyInput
            value={title}
            label="Title"
            onChangeText={(text) => setTitle(text)}
            placeholder="Title"
          />
          <FlyInput
            value={description}
            label="Description"
            onChangeText={(text) => setDescription(text)}
            placeholder="Description"
            multiline
            numberOfLines={4}
          />
          <FlyInput
            value={price.toString()}
            label="Price"
            onChangeText={(text) => handleInputNumberChange(+text, setPrice)}
            placeholder="Enter Price"
            keyboardType="decimal-pad"
          />
          <FlyInput
            value={ratings.toString()}
            label="Ratings"
            onChangeText={(text) => handleInputNumberChange(+text, setRatings)}
            placeholder="Enter Ratings"
            keyboardType="decimal-pad"
          />
          <FlyInput
            value={avgRating.toString()}
            label="AvgRating"
            onChangeText={(text) =>
              handleInputNumberChange(+text, setAvgRating)
            }
            placeholder="Enter Average Rating"
            keyboardType="decimal-pad"
          />
          <FlyInput
            value={oldPrice.toString()}
            label="Old Price"
            onChangeText={(text) => handleInputNumberChange(+text, setOldPrice)}
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

            <View
              style={tw`p-4 px-2 flex-row flex-wrap bg-white border border-slate-200 `}
            >
              {images
                ? images.map((image) => (
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
            <NButton title="Upload Images" onPress={uploadButtonClick} />
            <View
              style={{
                width: `${prog * 100}%`,
                height: 3,
                backgroundColor: "blue",
                marginVertical: 12
              }}
            />
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
                onValueChange={(text) => setCategory(text)}
                placeholder={{ label: "Category", value: "" }}
                value={category}
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
                onValueChange={(text) => setBrand(text)}
                placeholder={{ label: "Brand", value: "" }}
                items={brands.map((i) => {
                  return {
                    label: i,
                    value: i,
                  };
                })}
                value={brand}
                style={pickerSelectStyles}
              />
            </View>
            {showIconPlatform}
          </View>
          <Space height={10} />
          <Button
            style={tw.style("bg-[#1877F2] p-2 rounded-md")}
            onPress={handleCreateProduct}
          >
            {isLoading ? "Submitting..." : "Submit"}
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

// export default function Compose() {
//   const { isLoading, setError, setIsLoading, error, createProduct } = useProductStore();
//   const [formData, setFormData] = useState<ProductData>({
//     title: "",
//     description: "",
//     image: "",
//     images: [],
//     options: ["red", "blue", "orange", "yellow", "green", "silver", "gold"],
//     category: "",
//     avgRating: 0,
//     ratings: 0,
//     brand: "",
//     price: 0,
//     oldPrice: 0,
//   });

//   const newFormData = _.cloneDeep(formData);

//   const categories = [
//     "Freezer",
//     "Fridge",
//     "Gas Cooker",
//     "Television",
//     "Generator",
//     "Air Conditioner",
//     "Washing Machine"
//   ];
//   const brands = [
//     "Beko",
//     "LG",
//     "Hisense",
//     "Samsung",
//     "Firman",
//     "Nexus",
//     "Whirlpool",
//     "Thermofrost",
//     "Senci",
//     "Kenstar",
//     "Scanfrost"
//   ];

//   const router = useRouter();
 
//   const handleAddProduct = async () => {
//     try {
//       setIsLoading(true);

//       await createProduct(formData);
//       alert("Product saved.")
//       setIsLoading(false);
//       router.back();
//     } catch (err) {
//       setIsLoading(false);
//       setError({
//         message: "An error occurred while creating the product.",
//         code: "UPLOAD_ERROR"
//       });
//     }
//     setFormData({
//       title: '',
//       description: '',
//       image: '',
//       images: [],
//       options: [],
//       category: '',
//       avgRating: 0,
//       ratings: 0,
//       brand: '',
//       price: 0,
//       oldPrice: 0,
//     });
//   };

//    const pickImages = async () => {
//      const result = await ImagePicker.launchImageLibraryAsync({
//        allowsMultipleSelection: true,
//        mediaTypes: ImagePicker.MediaTypeOptions.Images,
//        aspect: [4, 3],
//        quality: 1,
//      });

//      if (result.canceled) {
//        return;
//      }

//      const uris = result.assets.map((asset) => asset.uri);

//      newFormData.images.concat(uris);
//      setFormData(newFormData);
//    };

//    const uploadImages = async () => {
//      const promises = formData.images.map((uri) => {
//        return Storage.put(uri, {
//          contentType: "image/jpeg",
//        });
//      });
//      const results = await Promise.all(promises);

//      for (const result of results) {
//        const image = result.key;
//        newFormData.images.push(image);
//      }

//      setFormData(newFormData);
//    };
  
//   const handleInputChange = (field: keyof ProductData, value: any) => {
//     if (field === "price" || field === "avgRating" || field === "oldPrice") {
//       const parsedValue = parseFloat(value);
//       if (!isNaN(parsedValue)) {
//         setFormData({ ...formData, [field]: parsedValue });
//       } else {
//         setFormData({ ...formData });
//       }
//     } else {
//       setFormData({ ...formData, [field]: value });
//     }
//   };

//   const showIconPlatform =
//     Platform.OS === "android" ? (
//       <></>
//     ) : (
//       <MaterialIcons
//         style={styles.icon}
//         name="keyboard-arrow-down"
//         size={25}
//         color="black"
//       />
//     );

//   return (
//     <KeyboardAvoidingView
//       style={tw.style("flex-1 pt-3")}
//       behavior={Platform.OS === "ios" ? "padding" : undefined}
//     >
//       <ScrollView contentContainerStyle={tw.style("flex-grow p-3 pb-12")}>
//         {isLoading && (
//           <View style={tw`z-10 flex-1 items-center justify-center`}>
//             <ActivityIndicator />
//           </View>
//         )}
//         {error && (
//           <View style={tw` z-11 flex-1 items-center justify-center`}>
//             <Text style={tw`text-[17px] font-bold`}>{error.message}</Text>
//           </View>
//         )}
//         <MotiView style={tw.style("flex-1 pt-3")}>
//           <FlyInput
//             value={formData.title}
//             label="Title"
//             onChangeText={(value) => handleInputChange("title", value)}
//             placeholder="Title"
//           />
//           <FlyInput
//             value={formData.description}
//             label="Description"
//             onChangeText={(value) => handleInputChange("description", value)}
//             placeholder="Description"
//             multiline
//             numberOfLines={4}
//           />
//           <FlyInput
//             value={formData.price.toString()}
//             label="Price"
//             onChangeText={(value) => handleInputChange("price", +value)}
//             placeholder="Enter Price"
//             keyboardType="decimal-pad"
//           />
//           <FlyInput
//             value={formData.ratings.toString()}
//             label="Ratings"
//             onChangeText={(value) => handleInputChange("ratings", +value)}
//             placeholder="Enter Ratings"
//             keyboardType="decimal-pad"
//           />
//           <FlyInput
//             value={formData.avgRating.toString()}
//             label="AvgRating"
//             onChangeText={(value) => handleInputChange("avgRating", +value)}
//             placeholder="Enter Average Rating"
//             keyboardType="decimal-pad"
//           />
//           <FlyInput
//             value={formData.oldPrice.toString()}
//             label="Old Price"
//             onChangeText={(value) => handleInputChange("oldPrice", +value)}
//             placeholder="Enter Old Price"
//             keyboardType="decimal-pad"
//           />
//           {/* <RoundIconButton
//             name="feather"
//             size={40}
//             color="#FF0214"
//             backgroundColor="rgba(255,255,255,0.5)"
//             iconRatio={0.6}
//             onPress={()=>console.warn('icon pressed!!')}
//           /> */}
//           <View style={tw`mt-2 mb-2 justify-around`}>
//             <Button
//               onPress={pickImages}
//               textStyle={{
//                 color: "#222",
//                 fontWeight: "500",
//                 textShadowColor: "#000077",
//                 textShadowRadius: 0.4,
//                 textShadowOffset: { width: 0.5, height: 0.2 },
//               }}
//             >
//               Select up to 3 images
//             </Button>

//             <View
//               style={tw`p-4 px-2 flex-row flex-wrap bg-white border border-slate-200 `}
//             >
//               {formData.images
//                 ? formData.images.map((image) => (
//                     <View key={image}>
//                       <Image
//                         key={image}
//                         source={{ uri: image ?? PlaceholderImageSource }}
//                         style={{
//                           width: 80,
//                           height: 80,
//                           margin: 6,
//                         }}
//                       />
//                     </View>
//                   ))
//                 : null}
//             </View>
//             <NButton title="Upload Images" onPress={uploadImages} />
//           </View>
//           {/* <Button
//             onPress={pickImages}
//             style={tw.style(
//               "bg-white rounded  w-full p-1 items-center justify-center"
//             )}
//             textStyle={tw`text-[17px] text-[#1877F2] font-medium`}
//           >
//             Pick Images(up to 4)
//           </Button> */}
//           <Space height={14} />
//           <View
//             style={tw` flex-row  bg-neutral-50 border-[1.5px] rounded-md h-13 justify-between px-2 border-neutral-300 items-center relative`}
//           >
//             <View>
//               <RNPickerSelect
//                 onValueChange={(value) => handleInputChange("category", value)}
//                 placeholder={{ label: "Category", value: "" }}
//                 value={formData.category}
//                 items={categories.map((i) => {
//                   return {
//                     label: i,
//                     value: i,
//                   };
//                 })}
//                 style={pickerSelectStyles}
//               />
//             </View>
//             {showIconPlatform}
//           </View>
//           <View
//             style={tw` flex-row mt-4 bg-neutral-50 border-[1.5px] rounded-md h-13 justify-between mb-4 px-2 border-neutral-300 items-center relative`}
//           >
//             <View>
//               <RNPickerSelect
//                 onValueChange={(value) => handleInputChange("brand", value)}
//                 placeholder={{ label: "Brand", value: "" }}
//                 items={brands.map((i) => {
//                   return {
//                     label: i,
//                     value: i,
//                   };
//                 })}
//                 value={formData.brand}
//                 style={pickerSelectStyles}
//               />
//             </View>
//             {showIconPlatform}
//           </View>
//           <Space height={10} />
//           <Button
//             style={tw.style("bg-[#1877F2] p-2 rounded-md")}
//             onPress={handleAddProduct}
//           >
//             {isLoading ? "Submitting..." : "Submit"}
//           </Button>
//         </MotiView>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// }

// const styles = StyleSheet.create({
//   icon: {
//     position: "absolute",
//     right: 10,
//   },
// });

// const pickerSelectStyles = StyleSheet.create({
//   inputIOS: {
//     fontSize: 15,
//     color: "black",
//     paddingVertical: 10,
//     width: width,
//   },
//   inputAndroid: {
//     fontSize: 15,
//     color: "black",
//     paddingVertical: 10,
//     paddingRight: width - 30,
//   },
// });
