import { LinearGradient } from "expo-linear-gradient";
import { TrendingUp } from "lucide-react-native";
import { Text, View } from "react-native";

export default function Logo() {
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
      }}
    >
      <LinearGradient
        colors={["#00d4aa", "#0099ff"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={{
          width: 34,
          height: 34,
          borderRadius: 10,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TrendingUp size={18} color="white" strokeWidth={2.5} />
      </LinearGradient>

      <Text
        style={{
          color: "#e8edf5",
          fontSize: 18,
          fontWeight: "700",
        }}
      >
        Trad
        <Text style={{ color: "#00d4aa" }}>io</Text>
      </Text>
    </View>
  );
}
