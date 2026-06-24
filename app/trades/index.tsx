import React, {
  useEffect,
  useState,
} from "react";

import {
  View,
  Text,
  ScrollView,
  Pressable,
} from "react-native";

import { SafeAreaView }
  from "react-native-safe-area-context";

import { router } from "expo-router";

import {
  ArrowLeft,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react-native";

import TradeCard
  from "../../components/TradeCard";

import {
  TradeItem,
  getTradeQueue,
  saveTradeQueue,
  resetTradeQueue,
} from "../../utils/tradeQueue";

import { MOCK_TRADES }
  from "../../constants/mockTrades";

import { Colors }
  from "../../constants/colors";

export default function TradesScreen() {
  const [trades, setTrades] =
    useState<TradeItem[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [approved, setApproved] =
    useState(false);

  useEffect(() => {
    loadQueue();
  }, []);

  async function loadQueue() {
    try {
      let queue =
        await getTradeQueue();

      if (queue.length === 0) {
        await saveTradeQueue(
          MOCK_TRADES
        );

        queue = MOCK_TRADES;
      }

      setTrades(queue);
    } catch (error) {
      console.log(
        "Failed to load queue",
        error
      );
    } finally {
      setLoading(false);
    }
  }

  async function updateQueue(
    updated: TradeItem[]
  ) {
    setTrades(updated);

    await saveTradeQueue(
      updated
    );
  }

  async function handleSkip(
    id: string
  ) {
    const updated: TradeItem[] =
      trades.map((trade) =>
        trade.id === id
          ? {
              ...trade,
              status:
                "skipped",
            }
          : trade
      );

    await updateQueue(
      updated
    );
  }

  async function handleOverride(
    id: string
  ) {
    const updated: TradeItem[] =
      trades.map((trade) =>
        trade.id === id
          ? {
              ...trade,
              status:
                "overridden",
            }
          : trade
      );

    await updateQueue(
      updated
    );
  }

  async function handleApproveAll() {
    const updated: TradeItem[] =
      trades.map((trade) =>
        trade.status ===
        "pending"
          ? {
              ...trade,
              status:
                "approved",
            }
          : trade
      );

    await updateQueue(
      updated
    );

    setApproved(true);
  }

  async function handleRefresh() {
    await resetTradeQueue();

    const queue =
      await getTradeQueue();

    setTrades(queue);
    setApproved(false);
  }

  const pendingTrades =
    trades.filter(
      (trade) =>
        trade.status ===
        "pending"
    );

  const pendingCount =
    pendingTrades.length;

  const skippedCount =
    trades.filter(
      (trade) =>
        trade.status ===
          "skipped" ||
        trade.status ===
          "overridden"
    ).length;

  const totalValue =
    pendingTrades.reduce(
      (sum, trade) =>
        sum +
        trade.price *
          trade.shares,
      0
    );

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            Colors.background,
          justifyContent:
            "center",
          alignItems:
            "center",
        }}
      >
        <Text
          style={{
            color:
              Colors.text,
          }}
        >
          Loading...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor:
          Colors.background,
      }}
    >
      {/* HEADER */}

      <View
        style={{
          flexDirection:
            "row",

          alignItems:
            "center",

          justifyContent:
            "space-between",

          paddingHorizontal:
            16,

          paddingTop: 10,

          paddingBottom: 12,
        }}
      >
        <Pressable
          onPress={() =>
            router.back()
          }
          style={{
            width: 40,
            height: 40,

            borderRadius:
              20,

            justifyContent:
              "center",

            alignItems:
              "center",

            backgroundColor:
              Colors.card,
          }}
        >
          <ArrowLeft
            size={18}
            color={
              Colors.primary
            }
          />
        </Pressable>

        <Text
          style={{
            color:
              Colors.text,

            fontSize: 18,

            fontWeight:
              "700",
          }}
        >
          Pending AI Trades
        </Text>

        <Pressable
          onPress={handleRefresh}
          style={{
            width: 40,
            height: 40,

            borderRadius:
              20,

            justifyContent:
              "center",

            alignItems:
              "center",

            backgroundColor:
              Colors.card,
          }}
        >
          <RefreshCw
            size={16}
            color={
              Colors.primary
            }
          />
        </Pressable>
      </View>

      <ScrollView
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        {/* SUMMARY */}

        <View
          style={{
            backgroundColor:
              Colors.card,

            marginHorizontal:
              16,

            borderRadius:
              18,

            padding: 16,

            flexDirection:
              "row",

            justifyContent:
              "space-between",
          }}
        >
          <View>
            <Text
              style={{
                color:
                  Colors.muted,
              }}
            >
              Queue
            </Text>

            <Text
              style={{
                color:
                  Colors.text,

                fontWeight:
                  "700",

                marginTop: 4,
              }}
            >
              {pendingCount}
              {" "}
              pending
            </Text>
          </View>

          <View>
            <Text
              style={{
                color:
                  Colors.muted,
              }}
            >
              Skipped
            </Text>

            <Text
              style={{
                color:
                  Colors.text,

                fontWeight:
                  "700",

                marginTop: 4,
              }}
            >
              {skippedCount}
            </Text>
          </View>

          <View>
            <Text
              style={{
                color:
                  Colors.muted,
              }}
            >
              Value
            </Text>

            <Text
              style={{
                color:
                  Colors.primary,

                fontWeight:
                  "700",

                marginTop: 4,
              }}
            >
              $
              {totalValue.toFixed(
                2
              )}
            </Text>
          </View>
        </View>

        {/* TRADE LIST */}

        <View
          style={{
            padding: 16,
            gap: 12,
          }}
        >
          {trades.map(
            (trade) => (
              <TradeCard
                key={
                  trade.id
                }
                trade={
                  trade
                }
                onSkip={() =>
                  handleSkip(
                    trade.id
                  )
                }
                onOverride={() =>
                  handleOverride(
                    trade.id
                  )
                }
              />
            )
          )}

          {pendingCount ===
            0 && (
              <View
                style={{
                  alignItems:
                    "center",

                  paddingVertical:
                    40,
                }}
              >
                <CheckCircle2
                  size={36}
                  color={
                    Colors.primary
                  }
                />

                <Text
                  style={{
                    color:
                      Colors.text,

                    marginTop:
                      10,

                    fontWeight:
                      "700",
                  }}
                >
                  All trades
                  handled
                </Text>
              </View>
            )}
        </View>
      </ScrollView>

      {/* FOOTER */}

      <View
        style={{
          padding: 16,
        }}
      >
        <View
          style={{
            flexDirection:
              "row",

            marginBottom:
              12,
          }}
        >
          <AlertTriangle
            size={14}
            color="#f59e0b"
          />

          <Text
            style={{
              color:
                Colors.muted,

              marginLeft:
                8,

              flex: 1,

              fontSize: 12,
            }}
          >
            Approving
            executes all
            pending trades.
          </Text>
        </View>

        <Pressable
          disabled={
            pendingCount ===
            0
          }
          onPress={
            handleApproveAll
          }
          style={{
            backgroundColor:
              pendingCount >
              0
                ? "#f59e0b"
                : Colors.card,

            paddingVertical:
              16,

            borderRadius:
              18,

            alignItems:
              "center",
          }}
        >
          <Text
            style={{
              color:
                pendingCount >
                0
                  ? "#000"
                  : Colors.muted,

              fontWeight:
                "700",
            }}
          >
            {approved
              ? "Queue Approved"
              : pendingCount >
                0
              ? `Approve Remaining Queue (${pendingCount})`
              : "No Pending Trades"}
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
