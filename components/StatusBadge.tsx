import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Colors } from "../constants/colors";

interface StatusBadgeProps {
  active?: boolean;
}

export default function StatusBadge({
  active = true,
}: StatusBadgeProps) {
  return (
    <View
      style={[
        styles.container,
        active
          ? styles.activeContainer
          : styles.frozenContainer,
      ]}
    >
      <View
        style={[
          styles.dot,
          {
            backgroundColor: active
              ? Colors.primary
              : Colors.danger,
          },
        ]}
      />

      <Text
        style={[
          styles.text,
          {
            color: active
              ? Colors.primary
              : Colors.danger,
          },
        ]}
      >
        AI Automation: {active ? "Active" : "Frozen"}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",

    paddingHorizontal: 12,
    paddingVertical: 6,

    borderRadius: 999,
    borderWidth: 1,
  },

  activeContainer: {
    backgroundColor: "rgba(0,212,170,0.1)",
    borderColor: "rgba(0,212,170,0.3)",
  },

  frozenContainer: {
    backgroundColor: "rgba(239,68,68,0.1)",
    borderColor: "rgba(239,68,68,0.3)",
  },

  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },

  text: {
    fontSize: 11,
    fontWeight: "600",
  },
});
