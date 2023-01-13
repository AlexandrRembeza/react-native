import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  tabBarContainer: {
    width: "100%",
    height: 83,
    paddingTop: 9,
    paddingBottom: 34,
    paddingHorizontal: (Dimensions.get("window").width.toFixed(0) - 230) / 2,
    borderTopWidth: 1,
    borderTopColor: "rgba(0, 0, 0, 0.07)",
  },
  tabBarItem: { minWidth: 70, marginRight: 10, borderRadius: 20 },
});
