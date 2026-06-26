import React, {
  useState,
  useEffect,
} from "react";
import {
  View,
  Text,
  Pressable,
  Switch,
  ScrollView,
  Alert,
} from "react-native";
import { router } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import {
  getBoundaries,
  saveBoundaries,
} from "../../utils/boundaryStorage";
import BoundaryChart from "../../components/BoundaryChart";
import { Colors } from "../../constants/colors";

export default function BoundaryScreen() {
  const [alertsEnabled, setAlertsEnabled] =
    useState(true);

  const [sellFrac, setSellFrac] =
    useState(0.2);

  const [buyFrac, setBuyFrac] =
    useState(0.72);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    const loadBoundaries = async () => {
      try {
        const {
          sellFrac,
          buyFrac,
        } = await getBoundaries();

        setSellFrac(sellFrac);
        setBuyFrac(buyFrac);
      } catch (error) {
        console.log(
          "Failed to load boundaries",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    loadBoundaries();
  }, []);

  const handleSaveBoundaries =
    async () => {
      try {
        await saveBoundaries(
          sellFrac,
          buyFrac
        );

        console.log(
          "AI boundaries saved"
        );

        Alert.alert(
          "Saved",
          "AI boundaries updated.",
          [
            {
              text: "OK",
              onPress: () =>
                router.back(),
            },
          ]
        );
      } catch (error) {
          Alert.alert(
            "Error",
            "Unable to save changes."
          );
          console.log(
            "Failed to save boundaries",
            error
          );
        }
    };

  const resetDefaults = () => {
    setSellFrac(0.2);
    setBuyFrac(0.72);
  };

  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor:
            Colors.background,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: Colors.text,
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
      <ScrollView
        contentContainerStyle={{
          paddingBottom: 40,
        }}
      >
        {/* HEADER */}

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 20,
            paddingTop: 20,
            marginBottom: 20,
          }}
        >
          <Pressable
            onPress={() => router.back()}
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              backgroundColor: Colors.card,
              justifyContent: "center",
              alignItems: "center",
              marginRight: 12,
            }}
          >
            <ArrowLeft
              size={20}
              color={Colors.text}
            />
          </Pressable>

          <View>
            <Text
              style={{
                color: Colors.text,
                fontSize: 24,
                fontWeight: "700",
              }}
            >
              Manual AI Rules
            </Text>

            <Text
              style={{
                color: Colors.muted,
                marginTop: 4,
              }}
            >
              Adjust buy and sell boundaries manually.
            </Text>
          </View>
        </View>

        {/* CHART */}

        <BoundaryChart
          sellFrac={sellFrac}
          buyFrac={buyFrac}
          setSellFrac={setSellFrac}
          setBuyFrac={setBuyFrac}
        />

        <View
          style={{
            paddingHorizontal: 16,
            marginTop: 16,
            gap: 12,
          }}
        >

          <Text
            style={{
              color: Colors.muted,
              fontSize: 12,
              marginTop: 8,
            }}
          >
            The AI buys when the price
            reaches the Buy Fraction and
            sells when it reaches the Sell
            Fraction.
          </Text>
          
          {/* SELL CARD */}
          <View
            style={{
              backgroundColor: Colors.card,
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: "rgba(239,68,68,0.25)",
            }}
          >
            <Text
              style={{
                color: Colors.danger,
                fontWeight: "700",
                fontSize: 16,
                marginBottom: 8,
              }}
            >
              SELL LIMIT
            </Text>

            <Text
              style={{
                color: Colors.text,
                marginBottom: 4,
              }}
            >
              Upper {(sellFrac * 100).toFixed(0)}% zone
            </Text>

            <Text
              style={{
                color: Colors.muted,
              }}
            >
              Trigger sell alerts when price enters this region.
            </Text>
          </View>

          {/* BUY CARD */}
          <View
            style={{
              backgroundColor: Colors.card,
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: "rgba(0,212,170,0.25)",
            }}
          >
            <Text
              style={{
                color: Colors.primary,
                fontWeight: "700",
                fontSize: 16,
                marginBottom: 8,
              }}
            >
              BUY LIMIT
            </Text>

            <Text
              style={{
                color: Colors.text,
                marginBottom: 4,
              }}
            >
              Lower {((1 - buyFrac) * 100).toFixed(0)}% zone
            </Text>

            <Text
              style={{
                color: Colors.muted,
              }}
            >
              Trigger buy alerts when price enters this region.
            </Text>
          </View>

          {/* SPREAD CARD */}
          <View
            style={{
              backgroundColor: Colors.card,
              borderRadius: 16,
              padding: 16,
              borderWidth: 1,
              borderColor: "#1a2332",
            }}
          >
            <Text
              style={{
                color: Colors.text,
                fontWeight: "700",
                fontSize: 16,
                marginBottom: 8,
              }}
            >
              MARKET SPREAD
            </Text>

            <Text
              style={{
                color: Colors.text,
                fontSize: 20,
                fontWeight: "700",
              }}
            >
              {Math.abs(
                (buyFrac - sellFrac) * 100
              ).toFixed(0)}
              %
            </Text>

            <Text
              style={{
                color: Colors.muted,
                marginTop: 4,
              }}
            >
              Distance between buy and sell boundaries.
            </Text>
          </View>
        </View>

        {/* ALERTS */}

        <View
          style={{
            backgroundColor:
              Colors.card,
            marginHorizontal: 16,
            marginTop: 16,
            borderRadius: 16,
            padding: 16,
            flexDirection: "row",
            justifyContent:
              "space-between",
            alignItems: "center",
          }}
        >
          <View>
            <Text
              style={{
                color: Colors.text,
                fontWeight: "600",
              }}
            >
              Boundary Alerts
            </Text>

            <Text
              style={{
                color: Colors.muted,
                marginTop: 4,
              }}
            >
              Notify when AI reaches
              limits.
            </Text>
          </View>

          <Switch
            value={alertsEnabled}
            onValueChange={
              setAlertsEnabled
            }
          />
        </View>

        {/* SAVE */}

        <Pressable
          onPress={handleSaveBoundaries}
          style={{
            backgroundColor:
              Colors.primary,
            marginHorizontal: 16,
            marginTop: 20,
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: "#000",
              fontWeight: "700",
            }}
          >
            Save AI Rules
          </Text>
        </Pressable>

        {/* RESET */}

        <Pressable
          onPress={resetDefaults}
          style={{
            borderWidth: 1,
            borderColor: "#2a3540",
            marginHorizontal: 16,
            marginTop: 12,
            paddingVertical: 16,
            borderRadius: 16,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: Colors.text,
              fontWeight: "600",
            }}
          >
            Reset Defaults
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}
