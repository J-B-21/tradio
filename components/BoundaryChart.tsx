import React from "react";

import {
  View,
  PanResponder,
} from "react-native";
import Svg, {
  Line,
  Rect,
  Text,
  G,
} from "react-native-svg";

import { CANDLES } from "../constants/boundaryData";
import { Colors } from "../constants/colors";

type Props = {
  sellFrac: number;
  buyFrac: number;
  setSellFrac: (value: number) => void;
  setBuyFrac: (value: number) => void;
};

export default function BoundaryChart({
  sellFrac,
  buyFrac,
  setSellFrac,
  setBuyFrac,
}: Props) {
  const WIDTH = 360;
  const HEIGHT = 320;

  const CHART_HEIGHT = 240;
  const TOP_PADDING = 20;

  const CHART_LEFT = 10;
  const CHART_RIGHT = 330;
  const CHART_WIDTH = CHART_RIGHT - CHART_LEFT;

  const HANDLE_X = 335;

  const LEFT_PADDING = 15;
  const RIGHT_PADDING = 40;

  const P_MAX =
    Math.max(...CANDLES.map((c) => c.high)) + 4;

  const P_MIN =
    Math.min(...CANDLES.map((c) => c.low)) - 4;

  const P_RANGE = P_MAX - P_MIN;

  function priceToY(
    price: number,
    chartHeight: number,
    topPadding: number
  ) {
    return (
      topPadding +
      ((P_MAX - price) / P_RANGE) *
        chartHeight
    );
  }

  const chartWidth =
    WIDTH - LEFT_PADDING - RIGHT_PADDING;

  const candleSpacing =
    chartWidth / CANDLES.length;

  const sellPrice =
    P_MAX - P_RANGE * sellFrac;

  const buyPrice =
    P_MAX - P_RANGE * buyFrac;

  const sellY = priceToY(
    sellPrice,
    CHART_HEIGHT,
    TOP_PADDING
  );

  const buyY = priceToY(
    buyPrice,
    CHART_HEIGHT,
    TOP_PADDING
  );

  const sellPanResponder =
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gesture) => {
        const newY =
          sellY + gesture.dy;

        const newFrac =
          (newY - TOP_PADDING) /
          CHART_HEIGHT;

        const clamped =
          Math.max(
            0.05,
            Math.min(
              newFrac,
              buyFrac - 0.05
            )
          );

        setSellFrac(clamped);
      },
    });

  const buyPanResponder =
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,

      onPanResponderMove: (_, gesture) => {
        const newY =
          buyY + gesture.dy;

        const newFrac =
          (newY - TOP_PADDING) /
          CHART_HEIGHT;

        const clamped =
          Math.max(
            sellFrac + 0.05,
            Math.min(
              newFrac,
              0.95
            )
          );

        setBuyFrac(clamped);
      },
    });

  return (
    <View>
      <Svg
        width="100%"
        height={HEIGHT}
        viewBox={`0 0 ${WIDTH} ${HEIGHT}`}
      >
        {/* BACKGROUND */}
        <Rect
          x={0}
          y={0}
          width={WIDTH}
          height={HEIGHT}
          fill={Colors.card}
        />

        {/* SELL ZONE */}
        <Rect
          x={CHART_LEFT}
          y={0}
          width={CHART_WIDTH}
          height={sellY}
          fill="rgba(239,68,68,0.05)"
        />

        {/* BUY ZONE */}
        <Rect
          x={CHART_LEFT}
          y={buyY}
          width={CHART_WIDTH}
          height={HEIGHT - buyY}
          fill="rgba(0,212,170,0.05)"
        />

        {/* GRID */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y =
            TOP_PADDING +
            (CHART_HEIGHT / 4) * i;

          return (
            <Line
              key={i}
              x1={CHART_LEFT}
              y1={y}
              x2={CHART_RIGHT + 10}
              y2={y}
              stroke="#1a2332"
              strokeWidth={1}
            />
          );
        })}

        {/* PRICE SCALE */}
        {[0, 1, 2, 3, 4].map((i) => {
          const price =
            P_MAX - (P_RANGE / 4) * i;

          const y =
            TOP_PADDING +
            (CHART_HEIGHT / 4) * i;

          return (
            <Text
              key={`label-${i}`}
              x={320}
              y={y + 4}
              fill={Colors.muted}
              fontSize="10"
            >
              {price.toFixed(0)}
            </Text>
          );
        })}

        {/* CANDLES */}
        {CANDLES.map((candle, index) => {
          const x =
            LEFT_PADDING +
            index * candleSpacing;

          const openY = priceToY(
            candle.open,
            CHART_HEIGHT,
            TOP_PADDING
          );

          const closeY = priceToY(
            candle.close,
            CHART_HEIGHT,
            TOP_PADDING
          );

          const highY = priceToY(
            candle.high,
            CHART_HEIGHT,
            TOP_PADDING
          );

          const lowY = priceToY(
            candle.low,
            CHART_HEIGHT,
            TOP_PADDING
          );

          const isUp =
            candle.close >= candle.open;

          return (
            <G key={index}>
              <Line
                x1={x}
                y1={highY}
                x2={x}
                y2={lowY}
                stroke={
                  isUp
                    ? Colors.primary
                    : Colors.danger
                }
                strokeWidth="1"
              />

              <Rect
                x={x - 3}
                y={Math.min(openY, closeY)}
                width={6}
                height={Math.max(
                  Math.abs(closeY - openY),
                  2
                )}
                fill={
                  isUp
                    ? Colors.primary
                    : Colors.danger
                }
              />
            </G>
          );
        })}

        {/* BOUNDARY LINES */}
        <Line
          x1={CHART_LEFT}
          y1={sellY}
          x2={CHART_RIGHT}
          y2={sellY}
          stroke={Colors.danger}
          strokeDasharray="5,5"
          strokeWidth="2"
        />

        <Line
          x1={CHART_LEFT}
          y1={buyY}
          x2={CHART_RIGHT}
          y2={buyY}
          stroke={Colors.primary}
          strokeDasharray="5,5"
          strokeWidth="2"
        />

        {/* HANDLES */}
        <Rect
          {...sellPanResponder.panHandlers}
          x={HANDLE_X}
          y={sellY - 15}
          width={18}
          height={30}
          rx={4}
          fill="rgba(239,68,68,0.25)"
        />

        <Rect
          {...buyPanResponder.panHandlers}
          x={HANDLE_X}
          y={buyY - 15}
          width={18}
          height={30}
          rx={4}
          fill="rgba(0,212,170,0.25)"
        />

        {/* HANDLE MARKINGS */}
        {[-5, 0, 5].map((offset) => (
          <Line
            key={`sell-${offset}`}
            x1={339}
            y1={sellY + offset}
            x2={347}
            y2={sellY + offset}
            stroke={Colors.danger}
          />
        ))}

        {[-5, 0, 5].map((offset) => (
          <Line
            key={`buy-${offset}`}
            x1={339}
            y1={buyY + offset}
            x2={347}
            y2={buyY + offset}
            stroke={Colors.primary}
          />
        ))}

        {/* PRICE BUBBLES */}
        <Rect
          x={285}
          y={sellY - 10}
          width={45}
          height={18}
          rx={6}
          fill={Colors.danger}
        />

        <Text
          x={307}
          y={sellY + 3}
          fill="#fff"
          fontSize="10"
          textAnchor="middle"
        >
          ${sellPrice.toFixed(0)}
        </Text>

        <Rect
          x={285}
          y={buyY - 10}
          width={45}
          height={18}
          rx={6}
          fill={Colors.primary}
        />

        <Text
          x={307}
          y={buyY + 3}
          fill="#fff"
          fontSize="10"
          textAnchor="middle"
        >
          ${buyPrice.toFixed(0)}
        </Text>

        {/* LABELS */}
        <Rect
          x={12}
          y={sellY - 18}
          width={70}
          height={14}
          rx={4}
          fill="rgba(239,68,68,0.15)"
        />

        <Text
          x={15}
          y={sellY - 6}
          fill={Colors.danger}
          fontSize="10"
        >
          SELL LIMIT
        </Text>

        <Rect
          x={12}
          y={buyY - 18}
          width={70}
          height={14}
          rx={4}
          fill="rgba(0,212,170,0.15)"
        />

        <Text
          x={15}
          y={buyY - 6}
          fill={Colors.primary}
          fontSize="10"
        >
          BUY LIMIT
        </Text>
      </Svg>
    </View>
  );
}
