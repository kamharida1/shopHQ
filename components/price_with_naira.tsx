import React from "react";
import { View, Text, StyleSheet, StyleProp, TextStyle } from "react-native";

const PriceWithNairaSymbol = ({ price, style }: { price: number; style: StyleProp<TextStyle>}) => {
  const formattedPrice = price.toLocaleString("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 0,
  });

  return (
    <View>
      <Text style={style}>{formattedPrice}</Text>
    </View>
  );
};


export default PriceWithNairaSymbol;
