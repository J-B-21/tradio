import { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  Clock3,
  PauseCircle,
} from "lucide-react-native";

import Logo from "../../components/Logo";
import StatusBadge from "../../components/StatusBadge";
import PortfolioChart from "../../components/PortfolioChart";
import PositionCard from "../../components/PositionCard";
import FreezeModal from "../../components/FreezeModal";

import { Colors } from "../../constants/colors";
import { positions } from "../../constants/mockData";
import { useCountdown } from "../../hooks/useCountdown";

export default function DashboardScreen() {
  const countdown = useCountdown(252);

  const [showModal, setShowModal] =
    useState(false);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
      }}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          padding: 20,
          paddingBottom: 40,
        }}
      >
        {/* Header */}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 28,
          }}
        >
          <Logo />
          <StatusBadge />
        </View>

        {/* Portfolio */}

        <View
          style={{
            marginBottom: 24,
          }}
        >
          <Text
            style={{
              color: Colors.muted,
              fontSize: 12,
              textTransform: "uppercase",
              marginBottom: 6,
            }}
          >
            Total Portfolio Value
          </Text>

          <Text
            style={{
              color: Colors.text,
              fontSize: 42,
              fontWeight: "300",
            }}
          >
            $14,250.80
          </Text>

          <Text
            style={{
              color: Colors.primary,
              marginTop: 4,
            }}
          >
            +$320.15 Today
          </Text>
        </View>

        {/* Chart */}

        <View
          style={{
            backgroundColor: Colors.card,
            borderRadius: 20,
            paddingVertical: 14,
            marginBottom: 20,
          }}
        >
          <PortfolioChart />
        </View>

        {/* Countdown */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 10,

            backgroundColor: Colors.card,
            borderRadius: 14,
            padding: 14,
            marginBottom: 24,
          }}
        >
          <Clock3
            size={16}
            color={Colors.muted}
          />

          <Text
            style={{
              color: Colors.secondary,
            }}
          >
            Next automated adjustment in {countdown}
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
          onPress={() => setShowModal(true)}
          style={{
            height: 56,
            marginTop: 24,

            borderRadius: 16,

            backgroundColor:
              "rgba(245,158,11,0.08)",

            borderWidth: 1.5,
            borderColor: Colors.warning,

            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <PauseCircle
            size={18}
            color={Colors.warning}
          />

          <Text
            style={{
              marginLeft: 8,
              color: Colors.warning,
              fontWeight: "600",
              fontSize: 15,
            }}
          >
            Pause Automation
          </Text>
        </Pressable>
      </ScrollView>

      <FreezeModal
        visible={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={() => {
          setShowModal(false);
          setTimeout(() => {
            router.replace("/freeze");
          }, 200);
        }}
      />
    </SafeAreaView>
  );
}
