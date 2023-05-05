import {StyleSheet} from 'react-native';
const styles = StyleSheet.create({
  ChatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    borderBottomStartRadius: 20,
    borderBottomEndRadius: 20,
    elevation: 20,
    backgroundColor: '#F8F8F8',
    shadowColor: '#400000',
    // shadowColor: 'black',
    shadowRadius: 20,
    zIndex: 100,
    paddingVertical: 10,
  },
  Image_icon: {
    width: '120%',
    height: '120%',
  },
  image_box: {
    // width: 60,
    // height: 60,
    justifyContent: 'center',
    alignItems: 'center',

    width: 50,
    height: 50,
    borderRadius: 70,
    // backgroundColor: 'black',
    overflow: 'hidden',
  },
  about_person: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icons: {
    flexDirection: 'row',
    gap: 20,
    alignItems: 'center',
  },
  ChatFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    // backgroundColor: 'red',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderTopWidth: 5,
    borderTopColor: '#ececec',

    // shadowOffset: '#1A000000',
    shadowColor: '#400000',
    // shadowColor: 'black',
    shadowRadius: 20,
    shadowOpacity: 1,
    // zIndex: 100,
    paddingHorizontal: 10,
  },
  dropShadow: {
    // width: '100%',
    // backgroundColor: 'white',
    // height: 10,
    // shadowColor: '#400000',
    // // shadowColor: 'black',
    // shadowRadius: 20,
    // elevation: 20,
  },
  ChatInput: {
    flex: 1,
  },
});

export default styles;
