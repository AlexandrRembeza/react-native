import { StyleSheet, Dimensions } from "react-native";

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
  goBackButton: {
    position: "absolute",
    bottom: 10,
    left: 16,
  },
  formContainer: {
    display: "flex",
    flexDirection: "column",
    paddingHorizontal: 16,
    paddingTop: 32,
  },
  loadImageContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  image: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 240,
    backgroundColor: "#F6F6F6",
    borderWidth: 1,
    borderColor: "#E8E8E8",
    borderRadius: 8,
  },
  imageCircle: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 60,
    height: 60,
    backgroundColor: "#ffffff",
    borderRadius: 50,
  },
  uploadPhoto: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
    marginTop: 8,
  },
  inputWrap: {
    position: "relative",
    width: "100%",
    height: 50,
  },
  input: {
    fontFamily: "Roboto-Medium",
    fontSize: 16,
    lineHeight: 19,
    width: "100%",
    height: "100%",
    color: "#212121",
    paddingLeft: 28,
    borderBottomWidth: 1,
    borderBottomColor: "#E8E8E8",
  },
  mapPin: {
    position: "absolute",
    bottom: 13,
  },
  namePlaceholderWrap: {
    position: "absolute",
    top: 15,
  },
  namePlaceholder: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  locationPlaceholderWrap: {
    position: "absolute",
    top: 15,
    left: 28,
  },
  locationPlaceholder: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
    color: "#BDBDBD",
  },
  publishButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    marginTop: 32,
    borderRadius: 100,
  },
  publishButtonText: {
    fontFamily: "Roboto-Regular",
    fontSize: 16,
    lineHeight: 19,
  },
  clearButtonContainer: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 124,
  },
  clearButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: 70,
    height: 40,
    borderRadius: 20,
  },
});