import { Link } from "expo-router";
import { MotiText, MotiView } from "moti";
import tw from 'twrnc'
export default function Product() {
  return (
    <MotiView style={tw`flex-1 items-center justify-center bg-white`}>
      <MotiText style={tw`text-[17px] font-medium text-[#000008]`}>
        Product Details
      </MotiText>
     
    </MotiView>
  );
}