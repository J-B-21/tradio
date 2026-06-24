import { Candle } from "../types/boundary";

const SEQ = [
  0.42, 0.61, 0.35, 0.72, 0.51,
  0.83, 0.28, 0.64, 0.47, 0.69,
  0.38, 0.75, 0.55, 0.31, 0.68,
  0.44, 0.78, 0.52, 0.29, 0.66,
  0.41, 0.73, 0.57, 0.33, 0.71,
  0.48, 0.62, 0.36, 0.79, 0.53,
];

export const CANDLES: Candle[] = (() => {
  const data: Candle[] = [];

  let price = 186.5;

  for (let i = 0; i < 30; i++) {
    const open = price;

    const change = (SEQ[i] - 0.48) * 11;

    const close = open + change;

    const high =
      Math.max(open, close) +
      SEQ[(i + 7) % 30] * 6;

    const low =
      Math.min(open, close) -
      SEQ[(i + 13) % 30] * 5;

    data.push({
      open,
      close,
      high,
      low,
    });

    price =
      close +
      (SEQ[(i + 17) % 30] - 0.5) * 1.5;
  }

  return data;
})();
