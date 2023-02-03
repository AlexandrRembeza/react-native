import { StyleSheet, Dimensions } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    width: Dimensions.get('window').width,
    height: 88,
    paddingTop: 55,
    backgroundColor: '#FF6C00',
    ...Platform.select({
      ios: {
        shadowColor: '#ffffff',
        shadowOpacity: 0.3,
        shadowOffset: {
          width: 0,
          height: 0.5,
        },
        shadowRadius: 0,
      },
      android: {
        elevation: 3,
        shadowColor: '#ffffff',
      },
    }),
  },
  headerTitle: {
    fontFamily: 'Roboto-Medium',
    fontSize: 17,
    lineHeight: 22,
    color: '#ffffff',
    letterSpacing: -0.408,
  },
  goBackButton: {
    position: 'absolute',
    bottom: 10,
    left: 16,
  },
  mapContainer: {
    flex: 1,
    width: '100%',
    height: 600,
  },
  bottomContainer: {
    width: '100%',
    height: 83,
    backgroundColor: '#FF6C00',
    borderTopWidth: 2,
    borderTopColor: '#ffffff',
  },
});
