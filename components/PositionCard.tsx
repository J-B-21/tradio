import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Position } from "../types/portfolio";
import { Colors } from "../constants/colors";

interface PositionCardProps {
  position: Position;
}

export default function PositionCard({
  position,
}: PositionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.leftSection}>
        <View style={styles.iconContainer}>
          <Text style={styles.iconText}>
            {position.ticker.slice(0, 2)}
          </Text>
        </View>

        <View>
          <Text style={styles.ticker}>
            {position.ticker}
          </Text>

          <Text style={styles.shares}>
            {position.shares} shares
          </Text>
        </View>
      </View>

      <View style={styles.rightSection}>
        <Text style={styles.value}>
          {position.value}
        </Text>

        <Text
          style={[
            styles.change,
            {
              color: position.up
                ? Colors.primary
                : Colors.danger,
            },
          ]}
        >
          {position.change}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.05)",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,

    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginBottom: 8,
  },

  leftSection: {
    flexDirection: "row",
    alignItems: "center",
  },

  iconContainer: {
    width: 34,
    height: 34,

    borderRadius: 10,

    backgroundColor: "rgba(0,212,170,0.1)",

    justifyContent: "center",
    alignItems: "center",

    marginRight: 12,
  },

  iconText: {
    color: Colors.primary,
    fontWeight: "700",
    fontSize: 10,
  },

  ticker: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: "600",
  },

  shares: {
    color: Colors.muted,
    fontSize: 11,
    marginTop: 2,
  },

  rightSection: {
    alignItems: "flex-end",
  },

  value: {
    color: Colors.text,
    fontSize: 13,
    fontWeight: "600",
  },

  change: {
    fontSize: 11,
    marginTop: 2,
    fontWeight: "600",
  },
});
