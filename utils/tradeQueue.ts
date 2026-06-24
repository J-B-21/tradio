import AsyncStorage from
  "@react-native-async-storage/async-storage";
import { MOCK_TRADES } from "../constants/mockTrades";

export type TradeAction =
  | "buy"
  | "sell";

export type ItemStatus =
  | "pending"
  | "skipped"
  | "overridden"
  | "approved";

export interface TradeItem {
  id: string;
  action: TradeAction;
  shares: number;
  ticker: string;
  price: number;
  reason: string;
  status: ItemStatus;
}

const STORAGE_KEY =
  "tradeQueue";

export async function getTradeQueue() {
  try {
    const stored =
      await AsyncStorage.getItem(
        STORAGE_KEY
      );

    if (!stored) {
      return [];
    }

    return JSON.parse(stored) as TradeItem[];
  } catch (error) {
    console.log(
      "Failed to load trade queue",
      error
    );

    return [];
  }
}

export async function saveTradeQueue(
  queue: TradeItem[]
) {
  try {
    await AsyncStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(queue)
    );
  } catch (error) {
    console.log(
      "Failed to save trade queue",
      error
    );
  }
}

export async function addTrade(
  trade: TradeItem
) {
  const queue =
    await getTradeQueue();

  queue.push(trade);

  await saveTradeQueue(queue);
}

export async function clearTradeQueue() {
  await AsyncStorage.removeItem(
    STORAGE_KEY
  );
}

export async function resetTradeQueue() {
  await saveTradeQueue(
    MOCK_TRADES.map((trade) => ({
      ...trade,
      status: "pending",
    }))
  );
}
