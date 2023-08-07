import { MotiText, MotiView } from "moti";
import tw from "twrnc";

export default function Cart() {
  return (
    <MotiView style={tw`flex-1 items-center justify-center`}>
      <MotiText style={tw`text-[17px] text-[#000008]`}>Cart</MotiText>
    </MotiView>
  );
}
