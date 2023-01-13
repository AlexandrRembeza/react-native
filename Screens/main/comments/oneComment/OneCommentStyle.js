import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  commentContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
  },
  avatar: {
    width: 28,
    height: 28,
    borderRadius: 50,
  },
  commentWrap: {
    width: Dimensions.get("window").width - 76,
    backgroundColor: "rgba(0, 0, 0, 0.03)",
    borderRadius: 6,
    padding: 16,
  },
  commentText: {
    fontFamily: "Roboto-Regular",
    fontSize: 13,
    lineHeight: 18,
    marginBottom: 8,
    color: "#212121",
  },
  commentDate: {
    fontFamily: "Roboto-Regular",
    fontSize: 10,
    lineHeight: 12,
    color: "#BDBDBD",
  },
});
