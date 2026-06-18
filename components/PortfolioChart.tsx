import { View } from "react-native";
import Svg, {
  Defs,
  LinearGradient,
  Stop,
  Path,
} from "react-native-svg";
import { Colors } from "../constants/colors";

export default function PortfolioChart() {
  return (
    <View
      style={{
        height: 180,
        backgroundColor: Colors.card,
        borderRadius: 16,
        padding: 16,
      }}
    >
      <Svg width="100%" height="140" viewBox="0 0 300 140">
        <Defs>
          <LinearGradient
            id="gainGrad"
            x1="0"
            y1="0"
            x2="0"
            y2="1"
          >
            <Stop
              offset="0%"
              stopColor="#00d4aa"
              stopOpacity="0.25"
            />
            <Stop
              offset="100%"
              stopColor="#00d4aa"
              stopOpacity="0"
            />
          </LinearGradient>
        </Defs>

        <Path
          d="M0 110
             C30 100,50 115,70 95
             C90 75,110 85,130 70
             C150 60,170 65,190 50
             C210 35,230 45,260 20
             C280 12,295 8,300 5"
          fill="none"
          stroke="#00d4aa"
          strokeWidth="3"
        />

        <Path
          d="M0 110
             C30 100,50 115,70 95
             C90 75,110 85,130 70
             C150 60,170 65,190 50
             C210 35,230 45,260 20
             C280 12,295 8,300 5
             L300 140
             L0 140 Z"
          fill="url(#gainGrad)"
        />
      </Svg>
    </View>
  );
}
