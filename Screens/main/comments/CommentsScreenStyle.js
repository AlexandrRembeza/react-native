import { StyleSheet, Dimensions } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
  },
  headerContainer: {
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
  goBackButton: {
    position: "absolute",
    bottom: 10,
    left: 16,
  },
  postWrap: {
    paddingTop: 32,
    paddingHorizontal: 16,
    paddingBottom: 80,
  },
  image: {
    width: "100%",
    height: 240,
    borderRadius: 8,
    resizeMode: "cover",
  },
  commentsWrap: {
    display: "flex",
    flexDirection: "column",
    marginTop: 32,
  },
  inputWrap: {
    flex: 1,
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 16,
    paddingBottom: 16,
    backgroundColor: "transparent",
  },
  input: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    width: "100%",
    height: 50,
    padding: 16,
    paddingBottom: 15,
    paddingRight: 45,
    borderWidth: 1,
    borderRadius: 100,
  },
  inputButton: {
    position: "absolute",
    top: 8,
    right: 8,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 34,
    height: 34,
    borderRadius: 50,
  },
});
