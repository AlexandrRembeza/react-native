import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  postContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    marginBottom: 34,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 240,
    borderRadius: 8,
    resizeMode: 'cover',
  },
  post: {
    fontFamily: 'Roboto-Medium',
    fontSize: 16,
    lineHeight: 19,
    marginTop: 8,
    color: '#212121',
  },
  postInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  postInfoWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  commentsAndLikesNumber: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 6,
    color: '#BDBDBD',
  },
  commentsWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  likesWrap: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationWrap: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  locationText: {
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    lineHeight: 19,
    marginLeft: 4,
    color: '#212121',
    textDecorationLine: 'underline',
  },
});
