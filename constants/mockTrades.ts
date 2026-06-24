import {
  TradeItem,
} from "../utils/tradeQueue";

export const MOCK_TRADES: TradeItem[] =
[
  {
    id: "1",
    action: "sell",
    shares: 5,
    ticker: "AAPL",
    price: 180.2,
    reason:
      "Upper sell limit breached",
    status: "pending",
  },

  {
    id: "2",
    action: "buy",
    shares: 3,
    ticker: "NVDA",
    price: 187.42,
    reason:
      "Momentum signal triggered",
    status: "pending",
  },

  {
    id: "3",
    action: "sell",
    shares: 10,
    ticker: "SPY",
    price: 530.5,
    reason:
      "Rebalance: over-allocated",
    status: "pending",
  },
];
