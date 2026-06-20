import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";
import { router } from "expo-router";

import PortfolioChart from "../../components/PortfolioChart";
import PositionCard from "../../components/PositionCard";
import StatusBadge from "../../components/StatusBadge";

import { positions } from "../../constants/mockData";
import { Colors } from "../../constants/colors";
import { useCountdown } from "../../hooks/useCountdown";

export default function DashboardScreen() {
  const countdown = useCountdown(252);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      <ScrollView
        contentContainerStyle={{
          padding: 20,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <View>
            <Text
              style={{
                color: Colors.text,
                fontSize: 22,
                fontWeight: "700",
              }}
            >
              Tradio
            </Text>

            <Text
              style={{
                color: Colors.muted,
                marginTop: 4,
              }}
            >
              Algorithmic Investment Platform
            </Text>
          </View>

          <StatusBadge active />
        </View>

        {/* Portfolio */}

        <Text
          style={{
            color: Colors.muted,
            fontSize: 12,
            textTransform: "uppercase",
            marginBottom: 8,
          }}
        >
          Total Portfolio Value
        </Text>

        <Text
          style={{
            color: Colors.text,
            fontSize: 42,
            fontWeight: "300",
            marginBottom: 8,
          }}
        >
          $14,250.80
        </Text>

        <Text
          style={{
            color: Colors.primary,
            marginBottom: 24,
          }}
        >
          +$320.15 Today
        </Text>

        {/* Chart */}

        <View
          style={{
            marginBottom: 24,
          }}
        >
          <PortfolioChart />
        </View>

        {/* Countdown */}

        <View
          style={{
            backgroundColor: Colors.card,
            borderRadius: 12,
            padding: 14,
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              color: Colors.secondary,
            }}
          >
            Next automated adjustment in{" "}
            <Text
              style={{
                color: Colors.text,
                fontWeight: "600",
              }}
            >
              {countdown}
            </Text>
          </Text>
        </View>

        {/* Positions */}

        <Text
          style={{
            color: Colors.muted,
            fontSize: 12,
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Active Positions
        </Text>

        {positions.map((position) => (
          <PositionCard
            key={position.ticker}
            position={position}
          />
        ))}

        {/* Freeze Button */}
        <Pressable
          onPress={() => router.push("./freeze")}
          style={{
            marginTop: 24,
            backgroundColor: "rgba(245,158,11,0.08)",
            borderWidth: 1.5,
            borderColor: Colors.warning,
            borderRadius: 16,
            paddingVertical: 16,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: Colors.warning,
              fontWeight: "700",
              fontSize: 16,
            }}
          >
            Freeze All Trading
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
