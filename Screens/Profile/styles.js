import {StyleSheet} from 'react-native';

export const styles = StyleSheet.create({
  Profile: {
    flex: 1,
    backgroundColor: 'white',
  },
  pad_h: {
    paddingHorizontal: 20,
  },
  edit_image: {
    width: 30,
    height: 30,
  },
  header: {
    backgroundColor: '#771F98',
    gap: 20,
    paddingBottom: 30,
    paddingTop: 10,
  },
  Text1: {
    fontFamily: 'Poppins',
    // fontWeight: '',
    fontSize: 30,
  },
  TextDim: {
    color: '#cbcbcb',
  },
  Text2: {
    fontFamily: 'Poppins',
    fontSize: 17,
  },
  Text3: {
    fontWeight: '800',
  },
  Text4: {
    fontFamily: 'Poppins',
    fontSize: 13,
  },
  col_white: {
    color: 'white',
  },
  col_black: {
    color: 'black',
  },
  col_red: {
    color: '#d53a3a',
  },
  flex_row: {
    gap: 20,
    flexDirection: 'row',
    width: '100%',
  },
  align_end: {
    marginStart: 'auto',
    alignSelf: 'center',
  },
  jus_around: {
    justifyContent: 'center',
  },
  ClickElement: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderColor: 'black',
    justifyContent: 'space-between',
    paddingVertical: 20,
    backgroundColor: 'white',
  },
});
