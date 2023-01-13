import React, { useEffect, useState } from "react";
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { styles } from "./CreatePostsScreenStyle";
import ArrowLeftIcon from "../../../assets/images/arrow-left.svg";
import CameraIcon from "../../../assets/images/camera.svg";
import MapPinIcon from "../../../assets/images/map-pin.svg";
import TrashIcon from "../../../assets/images/trash-2.svg";

const CreatePostsScreen = ({ navigation }) => {
  const [post, setPost] = useState({
    image: false,
    name: "",
    location: "",
  });
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  useEffect(() => {
    const showKeyboard = Keyboard.addListener("keyboardDidShow", () =>
      setIsShownKeyboard(true)
    );
    const hideKeyboard = Keyboard.addListener("keyboardDidHide", () =>
      setIsShownKeyboard(false)
    );
    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  const resetForm = () => {
    setPost({
      // image: null,
      name: "",
      location: "",
    });
  };
  const goToPostsScreen = () => navigation.navigate("Posts");

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Create post</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.goBackButton}
            onPress={goToPostsScreen}
          >
            <ArrowLeftIcon />
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View
            style={{
              ...styles.loadImageContainer,
              marginBottom: !isShownKeyboard ? 32 : 10,
            }}
          >
            <View style={styles.image}>
              <View
                style={{
                  ...styles.imageCircle,
                  backgroundColor: post.image
                    ? "rgba(255, 255, 255, 0.3)"
                    : "#ffffff",
                }}
              >
                <CameraIcon fill={post.image ? "#ffffff" : "#BDBDBD"} />
              </View>
            </View>
            <Text style={styles.uploadPhoto}>
              {post.image ? "Edit photo" : "Upload photo"}
            </Text>
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              style={{ ...styles.input, paddingLeft: 0 }}
              value={post.name}
              onChangeText={(text) => setPost((s) => ({ ...s, name: text }))}
              cursorColor="#BDBDBD"
            />
            <View
              style={{
                ...styles.namePlaceholderWrap,
                display: post.name ? "none" : "flex",
              }}
              pointerEvents="none"
            >
              <Text style={styles.namePlaceholder}>Name...</Text>
            </View>
          </View>
          <View style={{ ...styles.inputWrap, marginTop: 16 }}>
            <TextInput
              style={styles.input}
              value={post.location}
              onChangeText={(text) =>
                setPost((s) => ({ ...s, location: text }))
              }
              cursorColor="#BDBDBD"
            />
            <MapPinIcon style={styles.mapPin} />
            <View
              style={{
                ...styles.locationPlaceholderWrap,
                display: post.location ? "none" : "flex",
              }}
              pointerEvents="none"
            >
              <Text style={styles.locationPlaceholder}>Location</Text>
            </View>
          </View>
          <TouchableOpacity
            activeOpacity={0.6}
            style={{
              ...styles.publishButton,
              backgroundColor:
                post.name && post.location ? "#FF6C00" : "#F6F6F6",
            }}
          >
            <Text
              style={{
                ...styles.publishButtonText,
                color: post.name && post.location ? "#ffffff" : "#BDBDBD",
              }}
            >
              Publish
            </Text>
          </TouchableOpacity>
          <View style={styles.clearButtonContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              style={{
                ...styles.clearButton,
                backgroundColor:
                  post.name || post.location ? "#FF6C00" : "#F6F6F6",
              }}
              onPress={resetForm}
            >
              <TrashIcon
                stroke={post.name || post.location ? "#ffffff" : "#BDBDBD"}
                fill={post.name || post.location ? "#ffffff" : "#BDBDBD"}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
