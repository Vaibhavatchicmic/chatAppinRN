import {StyleSheet} from 'react-native';

export default StyleSheet.create({
  SearchInput: {
    paddingStart: 14,
    paddingVertical: 4,
    color: '#252525',
    flex: 1,
  },
  SearchInputCon: {
    borderRadius: 14,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F1F1',
    flex: 1,
  },
  Searchbtn: {},
  QR_opener: {
    backgroundColor: '#F1F1F1',
    padding: 10,
    borderRadius: 10,
  },
  MySearchBar: {
    flexDirection: 'row',
    // width: 'auto',
    paddingHorizontal: 22,
    paddingVertical: 25,
    gap: 12,
    backgroundColor: '#771F98',
  },
  Home: {
    backgroundColor: 'white',
    flex: 1,
  },
  flexRow: {
    flexDirection: 'row',
  },

  jus_bet: {
    justifyContent: 'space-between',
  },
  flexCol: {
    flexDirection: 'column',
  },
  ChatBoxElement: {
    marginBottom: 32,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderWidth: 2,
    borderColor: '#771F98',
    borderRadius: 14,
    gap: 14,
  },
  not_read_text: {
    fontSize: 16,
    color: 'white',
  },
  not_read: {
    backgroundColor: '#771F98',
    borderRadius: 50,
    height: 25,
    width: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heading: {
    paddingVertical: 10,
    fontFamily: 'Poppins',
    fontSize: 20,
    color: '#771f98',
  },
  Text1: {
    fontFamily: 'Poppins',
    fontWeight: '600',
    fontSize: 16,
    color: '#181818',
  },
  Text2: {
    fontFamily: 'Poppins',
    fontSize: 13,
    color: '#5C5C5C',
  },
  Text3: {
    fontFamily: 'Poppins',
    fontSize: 11,
    color: '#5C5C5C',
  },
});
