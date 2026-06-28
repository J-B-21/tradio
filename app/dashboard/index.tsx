import { useState, useCallback } from "react";
import {
  ScrollView,
  View,
  Text,
  Pressable,
} from "react-native";
import { router } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  Clock3,
  PauseCircle,
  Bot,
  ChevronRight,
  Settings2,
} from "lucide-react-native";

import Logo from "../../components/Logo";
import StatusBadge from "../../components/StatusBadge";
import PortfolioChart from "../../components/PortfolioChart";
import PositionCard from "../../components/PositionCard";
import FreezeModal from "../../components/FreezeModal";
import AIStatusCard from "../../components/AIStatusCard";

import { Colors } from "../../constants/colors";
import { positions, portfolioChartData } from "../../constants/mockData";
import { useCountdown } from "../../hooks/useCountdown";

import {
  getSignal,
  getSignalReason,
  getCurrentFrac,
} from "../../utils/boundaryEngine";
import {
  getBoundaries,
} from "../../utils/boundaryStorage";
import {
  getTradeQueue,
} from "../../utils/tradeQueue";


export default function DashboardScreen() {
  const countdown = useCountdown(252);

  const [signal, setSignal] =
    useState<
      "BUY" | "SELL" | "HOLD"
    >("HOLD");

  const [reason, setReason] =
    useState("");

  async function loadAIStatus() {
    const {
      buyFrac,
      sellFrac,
    } =
      await getBoundaries();

    const values =
      portfolioChartData.map(
        (point) => point.v
      );

    const currentPrice =
      values[values.length - 1];

    const highestPrice =
      Math.max(...values);

    const lowestPrice =
      Math.min(...values);

    const currentFrac =
      getCurrentFrac(
        currentPrice,
        lowestPrice,
        highestPrice
      );

    const newSignal =
      getSignal(
        currentFrac,
        buyFrac,
        sellFrac
      );

    setSignal(newSignal);

    setReason(
      getSignalReason(
        newSignal
      )
    );
  }

  const [pendingCount, setPendingCount] =
    useState(0);

  async function loadPendingTrades() {
    try {
      const queue =
        await getTradeQueue();

      const pending =
        queue.filter(
          (trade) =>
            trade.status ===
            "pending"
        ).length;

      setPendingCount(
        pending
      );
    } catch (error) {
      console.log(
        "Failed to load trade count",
        error
      );
    }
  }

  useFocusEffect(
    useCallback(() => {
      loadAIStatus();
      loadPendingTrades();
    }, [])
  );

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

        {/* Demo Mode */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",

            backgroundColor: "rgba(59,130,246,0.08)",
            borderWidth: 1,
            borderColor: "rgba(59,130,246,0.25)",

            borderRadius: 14,
            paddingHorizontal: 14,
            paddingVertical: 12,

            marginBottom: 24,
          }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: "#3b82f6",
              marginRight: 10,
            }}
          />

          <View style={{ flex: 1 }}>
            <Text
              style={{
                color: "#93c5fd",
                fontWeight: "700",
                marginBottom: 2,
              }}
            >
              Demo Mode
            </Text>

            <Text
              style={{
                color: Colors.secondary,
                fontSize: 13,
                lineHeight: 18,
              }}
            >
              Portfolio values, market prices and AI decisions are simulated for demonstration purposes.
            </Text>
          </View>
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

        <AIStatusCard
          signal={signal}
          reason={reason}
        />

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
            Next AI evaluation in {countdown}
          </Text>
        </View>

        {/* AI CONTROL PANEL */}

        <View
          style={{
            backgroundColor: Colors.card,
            borderRadius: 18,
            padding: 16,
            marginBottom: 24,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 14,
            }}
          >
            <Bot
              size={18}
              color={Colors.primary}
            />

            <Text
              style={{
                color: Colors.text,
                fontSize: 16,
                fontWeight: "700",
                marginLeft: 8,
              }}
            >
              AI Automation
            </Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <View>
              <Text
                style={{
                  color: Colors.muted,
                  fontSize: 12,
                }}
              >
                Signal
              </Text>

              <Text
                style={{
                  color:
                    signal === "BUY"
                      ? Colors.primary
                      : signal === "SELL"
                      ? Colors.danger
                      : Colors.warning,

                  fontWeight: "700",
                  fontSize: 16,
                }}
              >
                {signal}
              </Text>
            </View>

            <View>
              <Text
                style={{
                  color: Colors.muted,
                  fontSize: 12,
                }}
              >
                Pending Trades
              </Text>

              <Text
                style={{
                  color: Colors.warning,
                  fontWeight: "700",
                  fontSize: 16,
                }}
              >
                {pendingCount}
              </Text>
            </View>
          </View>

          <Pressable
            onPress={() =>
              router.push("/trades")
            }
            style={{
              height: 48,
              borderRadius: 14,
              backgroundColor:
                "rgba(245,158,11,0.12)",

              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",

              paddingHorizontal: 14,
              marginBottom: 10,
            }}
          >
            <Text
              style={{
                color: Colors.text,
                fontWeight: "600",
              }}
            >
              Review Pending Trades
            </Text>

            <ChevronRight
              size={18}
              color={Colors.warning}
            />
          </Pressable>

          <Pressable
            onPress={() =>
              router.push("/boundary")
            }
            style={{
              height: 48,
              borderRadius: 14,
              backgroundColor:
                "rgba(0,212,170,0.08)",

              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",

              paddingHorizontal: 14,
            }}
          >
            <Text
              style={{
                color: Colors.text,
                fontWeight: "600",
              }}
            >
              Edit AI Boundaries
            </Text>

            <Settings2
              size={18}
              color={Colors.primary}
            />
          </Pressable>
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
