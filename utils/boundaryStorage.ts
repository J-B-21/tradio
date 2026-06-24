import AsyncStorage from
  "@react-native-async-storage/async-storage";

export async function getBoundaries() {
  const sell =
    await AsyncStorage.getItem(
      "sellBoundary"
    );

  const buy =
    await AsyncStorage.getItem(
      "buyBoundary"
    );

  return {
    sellFrac: sell
      ? parseFloat(sell)
      : 0.2,

    buyFrac: buy
      ? parseFloat(buy)
      : 0.72,
  };
}

export async function saveBoundaries(
  sellFrac: number,
  buyFrac: number
) {
  await AsyncStorage.setItem(
    "sellBoundary",
    sellFrac.toString()
  );

  await AsyncStorage.setItem(
    "buyBoundary",
    buyFrac.toString()
  );
}
