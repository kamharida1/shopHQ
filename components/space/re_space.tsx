import { StyleSheet, } from "react-native";
import React, { memo } from "react";
import { View } from "react-native";


interface SpaceT {
  height?: number;
  width?: number;
}

const Space = memo<SpaceT>(({ height, width }) => {
  return (
    <View
      style={{
        height: height || 30,
        width: width || 20,
      }}
    />
  );
});

export { Space };
