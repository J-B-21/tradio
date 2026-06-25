export type Signal =
  | "BUY"
  | "SELL"
  | "HOLD";

export function getSignal(
  currentFrac: number,
  buyFrac: number,
  sellFrac: number
): Signal {
  if (currentFrac >= buyFrac) {
    return "BUY";
  }

  if (currentFrac <= sellFrac) {
    return "SELL";
  }

  return "HOLD";
}

export function getSignalReason(
  signal: Signal
) {
  switch (signal) {
    case "BUY":
      return "Portfolio value entered the configured buy zone.";

    case "SELL":
      return "Portfolio value entered the configured sell zone.";

    default:
      return "Portfolio value remains between boundaries.";
  }
}

export function getCurrentFrac(
  currentPrice: number,
  lowestPrice: number,
  highestPrice: number
) {
  return (
    (currentPrice - lowestPrice) /
    (highestPrice - lowestPrice)
  );
}
