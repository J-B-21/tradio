import { View, Text } from "react-native";
import { TrendingUp, TrendingDown } from "lucide-react-native";

import { Colors } from "../constants/colors";
import { Position } from "../types/portfolio";

interface PositionCardProps {
  position: Position;
}

export default function PositionCard({
  position,
}: PositionCardProps) {
  return (
    <View
      style={{
        backgroundColor: Colors.card,
        borderRadius: 14,
        padding: 14,
        marginBottom: 10,

        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      {/* Left */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          flex: 1,
        }}
      >
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            backgroundColor: "rgba(0,212,170,0.1)",
            justifyContent: "center",
            alignItems: "center",
            marginRight: 12,
          }}
        >
          <Text
            style={{
              color: Colors.primary,
              fontWeight: "700",
            }}
          >
            {position.ticker.slice(0, 2)}
          </Text>
        </View>

        <View style={{ flex: 1 }}>
          <Text
            style={{
              color: Colors.text,
              fontWeight: "700",
              fontSize: 14,
            }}
          >
            {position.ticker}
          </Text>

          <Text
            style={{
              color: Colors.muted,
              fontSize: 12,
              marginTop: 2,
            }}
            numberOfLines={1}
          >
            {position.name}
          </Text>
        </View>
      </View>

      {/* Right */}

      <View style={{ alignItems: "flex-end" }}>
        <Text
          style={{
            color: Colors.text,
            fontWeight: "600",
            fontSize: 14,
          }}
        >
          {position.value}
        </Text>

        <Text
          style={{
            color: Colors.muted,
            fontSize: 11,
            marginTop: 2,
          }}
        >
          {position.shares} shares
        </Text>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginTop: 3,
          }}
        >
          {position.up ? (
            <TrendingUp
              size={12}
              color={Colors.primary}
            />
          ) : (
            <TrendingDown
              size={12}
              color={Colors.danger}
            />
          )}

          <Text
            style={{
              marginLeft: 4,
              color: position.up
                ? Colors.primary
                : Colors.danger,
              fontWeight: "600",
              fontSize: 12,
            }}
          >
            {position.change}
          </Text>
        </View>
      </View>
    </View>
  );
}
