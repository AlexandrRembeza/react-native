import React, { useEffect, useState } from 'react';
import {
  View,
  TextInput,
  Text,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import * as Location from 'expo-location';
import shortid from 'shortid';
import { useSelector } from 'react-redux';

import { styles } from './CreatePostsScreenStyle';
import ArrowLeftIcon from '../../../../assets/images/arrow-left.svg';
import CameraIcon from '../../../../assets/images/camera.svg';
import MapPinIcon from '../../../../assets/images/map-pin.svg';
import TrashIcon from '../../../../assets/images/trash-2.svg';
import { storage, firestore } from '../../../firebase/config';

const CreatePostsScreen = ({ navigation }) => {
  const { userId, nickname } = useSelector(({ auth }) => auth);
  const [location, reqLocationPermission] = Location.useForegroundPermissions();
  const [userLocation, setUserLocation] = useState(null);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [cameraRef, setCameraRef] = useState(null);
  const [type, setType] = useState(CameraType.back);
  const [post, setPost] = useState({
    image: null,
    name: '',
    location: '',
  });
  const [isShownKeyboard, setIsShownKeyboard] = useState(false);

  const isOneOfFieldsCompleted = post.name || post.location || post.image;
  const isAllFieldsCompleted = post.name && post.location && post.image;

  useEffect(() => {
    (async () => {
      await requestPermission();
      await reqLocationPermission();
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const { coords } = await Location.getCurrentPositionAsync();
      setUserLocation({
        latitude: coords.latitude,
        longitude: coords.longitude,
      });
    })();
  }, [location]);

  useEffect(() => {
    const showKeyboard = Keyboard.addListener('keyboardDidShow', () => setIsShownKeyboard(true));
    const hideKeyboard = Keyboard.addListener('keyboardDidHide', () => setIsShownKeyboard(false));
    return () => {
      showKeyboard.remove();
      hideKeyboard.remove();
    };
  }, []);

  const resetForm = () => {
    setPost({ image: null, name: '', location: '' });
  };

  const changeCameraType = () => {
    setType(type === CameraType.back ? CameraType.front : CameraType.back);
  };

  const takePhoto = async () => {
    if (cameraRef) {
      const { uri } = await cameraRef.takePictureAsync();
      setPost(s => ({ ...s, image: uri }));
    }
  };

  const uploadPhotoToServer = async image => {
    const file = await (await fetch(image)).blob();
    const id = shortid.generate();
    await storage.ref(`postsImages/${id}`).put(file);
    return await storage.ref('postsImages').child(id).getDownloadURL();
  };

  const uploadPostToServer = async () => {
    if (!isAllFieldsCompleted) return Alert.alert('You have empty fields');
    const uploadedPhotoUrl = await uploadPhotoToServer(post.image);
    const res = await firestore.collection('posts').add({
      userId,
      nickname,
      postText: post.name,
      location: post.location,
      exactLocation: userLocation,
      photo: uploadedPhotoUrl,
      likes: Math.floor(Math.random() * (201 - 0) + 0),
      date: Date.now(),
    });
    if (res) {
      resetForm();
      navigation.navigate('Posts');
    }
  };

  if (!permission || !location) return null;
  if (!permission.granted) Alert.alert('No access to camera');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>Create post</Text>
          <TouchableOpacity
            activeOpacity={0.6}
            style={styles.goBackButton}
            onPress={() => navigation.navigate('Posts')}
          >
            <ArrowLeftIcon stroke="rgba(33, 33, 33, 0.8)" />
          </TouchableOpacity>
        </View>

        <View style={styles.formContainer}>
          <View style={{ ...styles.loadImageContainer, marginBottom: !isShownKeyboard ? 32 : 10 }}>
            {!post.image && !permission.granted && (
              <View style={styles.imageWrap}>
                <View style={{ ...styles.imageCircle, backgroundColor: '#ffffff' }}>
                  <CameraIcon fill={'#BDBDBD'} />
                </View>
              </View>
            )}
            {!post.image && permission.granted && (
              <View style={styles.cameraWrap}>
                <Camera style={styles.camera} type={type} ref={setCameraRef}>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={{
                      ...styles.imageCircle,
                      backgroundColor: 'rgba(255, 255, 255, 0.3)',
                    }}
                    onPress={takePhoto}
                  >
                    <CameraIcon fill={'#ffffff'} />
                  </TouchableOpacity>
                  <TouchableOpacity
                    activeOpacity={0.6}
                    style={styles.flipBtn}
                    onPress={changeCameraType}
                  >
                    <Text style={styles.flipText}>flip</Text>
                  </TouchableOpacity>
                </Camera>
              </View>
            )}
            {post.image && <Image source={{ uri: post.image }} style={styles.image} />}
            <Text
              style={{
                ...styles.uploadPhoto,
                color: post.image ? '#FF6C00' : '#BDBDBD',
              }}
              onPress={() => {
                if (!post.image) return;
                setPost(s => ({ ...s, image: null }));
              }}
            >
              {post.image ? 'Edit photo' : 'Upload photo'}
            </Text>
          </View>
          <View style={styles.inputWrap}>
            <TextInput
              style={{ ...styles.input, paddingLeft: 0 }}
              value={post.name}
              onChangeText={text => setPost(s => ({ ...s, name: text }))}
              cursorColor="#BDBDBD"
            />
            <View
              style={{ ...styles.namePlaceholderWrap, display: post.name ? 'none' : 'flex' }}
              pointerEvents="none"
            >
              <Text style={styles.namePlaceholder}>Name...</Text>
            </View>
          </View>
          <View style={{ ...styles.inputWrap, marginTop: 16 }}>
            <TextInput
              style={styles.input}
              value={post.location}
              onChangeText={text => setPost(s => ({ ...s, location: text }))}
              maxLength={32}
              cursorColor="#BDBDBD"
            />
            <MapPinIcon style={styles.mapPin} />
            <View
              style={{
                ...styles.locationPlaceholderWrap,
                display: post.location ? 'none' : 'flex',
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
              backgroundColor: isAllFieldsCompleted ? '#FF6C00' : '#F6F6F6',
            }}
            onPress={uploadPostToServer}
          >
            <Text
              style={{
                ...styles.publishButtonText,
                color: isAllFieldsCompleted ? '#ffffff' : '#BDBDBD',
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
                backgroundColor: isOneOfFieldsCompleted ? '#FF6C00' : '#F6F6F6',
              }}
              onPress={resetForm}
            >
              <TrashIcon
                stroke={isOneOfFieldsCompleted ? '#ffffff' : '#BDBDBD'}
                fill={isOneOfFieldsCompleted ? '#ffffff' : '#BDBDBD'}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default CreatePostsScreen;
