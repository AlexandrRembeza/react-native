import { StyleSheet, Platform, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
    position: "relative",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    width: Dimensions.get("window").width,
    height: 88,
    paddingTop: 55,
    backgroundColor: "#ffffff",
    ...Platform.select({
      ios: {
        shadowColor: "#000000",
        shadowOpacity: 0.3,
        shadowOffset: {
          width: 0,
          height: 0.5,
        },
        shadowRadius: 0,
      },
      android: {
        elevation: 3,
        shadowColor: "#000000",
      },
    }),
  },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 17,
    lineHeight: 22,
    color: "#212121",
    letterSpacing: -0.408,
  },
  logoutButton: {
    position: "absolute",
    bottom: 10,
    right: 16,
  },
  userContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "flex-start",
    paddingTop: 32,
    paddingBottom: 32,
  },
  userPhoto: {
    width: 60,
    height: 60,
    backgroundColor: "#BDBDBD",
    borderRadius: 16,
  },
  userInfo: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 8,
  },
  userName: {
    fontFamily: "Roboto-Bold",
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
  },
  userEmail: {
    fontFamily: "Roboto-Regular",
    fontSize: 11,
    lineHeight: 13,
    color: "rgba(33, 33, 33, 0.8)",
  },
  postsContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    paddingHorizontal: 16,
  },
});
