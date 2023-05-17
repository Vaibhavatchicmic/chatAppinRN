import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const Footer = ({children, style}) => {
  return <View style={[styles.Footer, style]}>{children}</View>;
};

export default Footer;

export const styles = StyleSheet.create({
  Footer: {
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
    // backgroundColor: 'red',
  },
});
