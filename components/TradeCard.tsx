import React from "react";

import {
  View,
  Text,
  Pressable,
} from "react-native";

import {
  TradeItem,
} from "../utils/tradeQueue";

import { Colors } from "../constants/colors";

type Props = {
  trade: TradeItem;
  onSkip: () => void;
  onOverride: () => void;
};

export default function TradeCard({
  trade,
  onSkip,
  onOverride,
}: Props) {
  const isSell =
    trade.action === "sell";

  const isPending =
    trade.status === "pending";

  const actionColor =
    isSell
      ? Colors.danger
      : Colors.primary;

  const actionBorder =
    isSell
      ? "rgba(239,68,68,0.25)"
      : "rgba(0,212,170,0.25)";

  const totalValue =
    trade.shares * trade.price;

  return (
    <View
      style={{
        backgroundColor:
          Colors.card,

        borderRadius: 18,

        borderWidth: 1,

        borderColor: actionBorder,

        overflow: "hidden",

        opacity:
          isPending
            ? 1
            : 0.6,
      }}
    >
      {/* TOP */}
      <View
        style={{
          padding: 16,
        }}
      >
        <View
          style={{
            flexDirection: "row",

            justifyContent:
              "space-between",

            alignItems:
              "flex-start",
          }}
        >
          <View
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                color:
                  Colors.text,

                fontSize: 16,

                fontWeight:
                  "700",
              }}
            >
              {trade.ticker}
            </Text>

            <Text
              style={{
                color:
                  actionColor,

                marginTop: 2,

                fontWeight:
                  "700",
              }}
            >
              {trade.action.toUpperCase()}
            </Text>

            <Text
              style={{
                color:
                  Colors.muted,

                marginTop: 6,

                fontSize: 12,
              }}
            >
              {trade.reason}
            </Text>
          </View>

          {trade.status !==
            "pending" && (
            <View
              style={{
                backgroundColor:
                  actionBorder,

                paddingHorizontal: 10,

                paddingVertical: 4,

                borderRadius: 999,
              }}
            >
              <Text
                style={{
                  color:
                    actionColor,

                  fontSize: 10,

                  fontWeight:
                    "700",
                }}
              >
                {trade.status.toUpperCase()}
              </Text>
            </View>
          )}
        </View>

        {/* DETAILS */}
        <View
          style={{
            marginTop: 14,

            backgroundColor:
              "#0b1218",

            borderRadius: 12,

            padding: 12,

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

                fontSize: 11,
              }}
            >
              Shares
            </Text>

            <Text
              style={{
                color:
                  Colors.text,

                fontWeight:
                  "700",
              }}
            >
              {trade.shares}
            </Text>
          </View>

          <View>
            <Text
              style={{
                color:
                  Colors.muted,

                fontSize: 11,
              }}
            >
              Price
            </Text>

            <Text
              style={{
                color:
                  actionColor,

                fontWeight:
                  "700",
              }}
            >
              $
              {trade.price.toFixed(
                2
              )}
            </Text>
          </View>

          <View>
            <Text
              style={{
                color:
                  Colors.muted,

                fontSize: 11,
              }}
            >
              Total
            </Text>

            <Text
              style={{
                color:
                  Colors.text,

                fontWeight:
                  "700",
              }}
            >
              $
              {totalValue.toFixed(
                2
              )}
            </Text>
          </View>
        </View>
      </View>

      {/* ACTIONS */}
      {isPending && (
        <View
          style={{
            flexDirection:
              "row",

            borderTopWidth: 1,

            borderTopColor:
              "#18212c",
          }}
        >
          <Pressable
            onPress={onSkip}
            style={{
              flex: 1,

              paddingVertical: 14,

              alignItems:
                "center",

              borderRightWidth: 1,

              borderRightColor:
                "#18212c",
            }}
          >
            <Text
              style={{
                color:
                  Colors.muted,

                fontWeight:
                  "600",
              }}
            >
              Skip
            </Text>
          </Pressable>

          <Pressable
            onPress={onOverride}
            style={{
              flex: 1,

              paddingVertical: 14,

              alignItems:
                "center",
            }}
          >
            <Text
              style={{
                color:
                  Colors.danger,

                fontWeight:
                  "700",
              }}
            >
              Override
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
