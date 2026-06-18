import React from "react";
import {
  Modal,
  View,
  Text,
  Pressable,
} from "react-native";

import { Colors } from "../constants/colors";

interface FreezeModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function FreezeModal({
  visible,
  onClose,
}: FreezeModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >
      <View
        style={{
          flex: 1,
          backgroundColor: "rgba(8,12,20,0.8)",
          justifyContent: "flex-end",
          padding: 16,
          paddingBottom: 32,
        }}
      >
        <View
          style={{
            backgroundColor: Colors.card,
            borderRadius: 24,
            padding: 24,
            borderWidth: 1,
            borderColor: "rgba(245,158,11,0.4)",
          }}
        >
          <Text
            style={{
              color: Colors.warning,
              fontSize: 18,
              fontWeight: "700",
              marginBottom: 12,
            }}
          >
            ⚠️ Freeze All Trading?
          </Text>

          <Text
            style={{
              color: Colors.muted,
              fontSize: 14,
              lineHeight: 22,
              marginBottom: 24,
            }}
          >
            This will immediately halt all algorithmic activity,
            cancel pending orders, and prevent new positions
            from being opened. You can resume at any time.
          </Text>

          <View
            style={{
              flexDirection: "row",
              gap: 12,
            }}
          >
            <Pressable
              onPress={onClose}
              style={{
                flex: 1,
                backgroundColor: "#131c2e",
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.text,
                  fontWeight: "600",
                }}
              >
                Cancel
              </Text>
            </Pressable>

            <Pressable
              onPress={onClose}
              style={{
                flex: 1,
                backgroundColor: "rgba(245,158,11,0.15)",
                borderWidth: 1,
                borderColor: Colors.warning,
                paddingVertical: 14,
                borderRadius: 12,
                alignItems: "center",
              }}
            >
              <Text
                style={{
                  color: Colors.warning,
                  fontWeight: "700",
                }}
              >
                Confirm Freeze
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
}