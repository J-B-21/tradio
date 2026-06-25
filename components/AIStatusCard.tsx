import React from "react";
import {
  View,
  Text,
} from "react-native";

import { Colors } from "../constants/colors";

type Props = {
  signal: "BUY" | "SELL" | "HOLD";
  reason: string;
};

export default function AIStatusCard({
  signal,
  reason,
}: Props) {
  const signalColor =
    signal === "BUY"
      ? Colors.primary
      : signal === "SELL"
      ? Colors.danger
      : Colors.secondary;

  return (
    <View
      style={{
        backgroundColor: Colors.card,
        borderRadius: 18,
        padding: 16,
        marginBottom: 20,
      }}
    >
      <Text
        style={{
          color: Colors.muted,
          fontSize: 12,
          textTransform: "uppercase",
          marginBottom: 8,
        }}
      >
        AI Status
      </Text>

      <Text
        style={{
          color: signalColor,
          fontSize: 22,
          fontWeight: "700",
        }}
      >
        {signal}
      </Text>

      <Text
        style={{
          color: Colors.text,
          marginTop: 8,
        }}
      >
        {reason}
      </Text>
    </View>
  );
}
