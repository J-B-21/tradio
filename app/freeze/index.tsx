import { router } from "expo-router";
import { Pressable, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { PlayCircle, ShieldCheck, TriangleAlert } from "lucide-react-native";

import Logo from "../../components/Logo";

import { Colors } from "../../constants/colors";

export default function FreezeScreen() {
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: Colors.background,
        padding: 20,
      }}
    >
      {/* Header */}

      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 40,
        }}
      >
        <Logo />

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            backgroundColor: "#1a0a0a",
            borderWidth: 1,
            borderColor: Colors.danger,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 50,
          }}
        >
          <View
            style={{
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: Colors.danger,
              marginRight: 8,
            }}
          />

          <Text
            style={{
              color: Colors.danger,
              fontSize: 12,
              fontWeight: "600",
            }}
          >
            Frozen
          </Text>
        </View>
      </View>

      {/* Center Content */}

      <View
        style={{
          flex: 1,
          justifyContent: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "#140c0c",
            borderRadius: 24,
            borderWidth: 1,
            borderColor: "#3d1515",
            padding: 24,
            alignItems: "center",
          }}
        >
          <View
            style={{
              width: 90,
              height: 90,
              borderRadius: 45,
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "rgba(239,68,68,0.12)",
              marginBottom: 24,
            }}
          >
            <TriangleAlert size={40} color={Colors.danger} />
          </View>

          <Text
            style={{
              color: Colors.text,
              fontSize: 22,
              fontWeight: "700",
              marginBottom: 12,
            }}
          >
            Automation Paused
          </Text>

          <Text
            style={{
              color: Colors.secondary,
              textAlign: "center",
              lineHeight: 22,
            }}
          >
            All automated trading operations have been completely paused. Your
            active funds are securely locked in place.
          </Text>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginTop: 24,
              backgroundColor: "rgba(0,212,170,0.08)",
              borderWidth: 1,
              borderColor: "rgba(0,212,170,0.2)",
              borderRadius: 30,
              paddingHorizontal: 14,
              paddingVertical: 8,
            }}
          >
            <ShieldCheck size={16} color={Colors.primary} />

            <Text
              style={{
                color: Colors.primary,
                marginLeft: 8,
                fontSize: 12,
                fontWeight: "600",
              }}
            >
              Funds secured · No active orders
            </Text>
          </View>
        </View>
      </View>

      {/* Buttons */}

      <View>
        <Pressable
          onPress={() => router.replace("/dashboard")}
          style={{
            height: 56,
            borderRadius: 16,
            backgroundColor: Colors.primary,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 8,
            marginBottom: 12,
          }}
        >
          <PlayCircle size={18} color="white" />

          <Text
            style={{
              color: "white",
              fontWeight: "700",
              fontSize: 15,
            }}
          >
            Resume Automation
          </Text>
        </Pressable>

        <Pressable
          onPress={() => router.push("/boundary")}
          style={{
            borderWidth: 1,
            borderColor: "#2a3540",
            borderRadius: 16,
            paddingVertical: 16,
            alignItems: "center",
          }}
        >
          <Text
            style={{
              color: Colors.secondary,
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Adjust AI Rules Manually
          </Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
