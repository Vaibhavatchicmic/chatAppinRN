import {Pressable, StyleSheet, Text, View} from 'react-native';
import React, {forwardRef, useEffect} from 'react';
import {Svg, Path} from 'react-native-svg';
import {MyButton} from '../Splash_Screen';

const MyModal_using_Ref = forwardRef(
  ({heading = 'Heading', children, onClose}, ref) => {
    return (
      <View style={styles.MyModal} ref={ref}>
        <View style={styles.modal_con}>
          <View style={styles.modal_head}>
            <Text style={styles.modal_heading}>{heading}</Text>
            <Pressable
              onPress={() => {
                // ref.current.style = {};
                ref.current.setNativeProps({
                  style: {
                    display: 'none',
                  },
                });
              }}>
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 48 48"
                width="20px"
                height="20px">
                <Path d="M38.982 6.97a2 2 0 00-1.396.616L24 21.172 10.414 7.586A2 2 0 008.98 6.98a2 2 0 00-1.393 3.434L21.172 24 7.586 37.586a2 2 0 102.828 2.828L24 26.828l13.586 13.586a2 2 0 102.828-2.828L26.828 24l13.586-13.586a2 2 0 00-1.432-3.443z" />
              </Svg>
            </Pressable>
          </View>
          <View style={styles.separator} />
          <View>{children}</View>
        </View>
      </View>
    );
  },
);

const MyModal = ({heading = 'Heading', children, onClose}) => {
  return (
    <View style={styles.MyModal}>
      <View style={styles.modal_con}>
        <View style={styles.modal_head}>
          <Text style={styles.modal_heading}>{heading}</Text>
          <Pressable
            onPress={() => {
              onClose;
            }}>
            <Svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="20px"
              height="20px">
              <Path d="M38.982 6.97a2 2 0 00-1.396.616L24 21.172 10.414 7.586A2 2 0 008.98 6.98a2 2 0 00-1.393 3.434L21.172 24 7.586 37.586a2 2 0 102.828 2.828L24 26.828l13.586 13.586a2 2 0 102.828-2.828L26.828 24l13.586-13.586a2 2 0 00-1.432-3.443z" />
            </Svg>
          </Pressable>
        </View>
        <View style={styles.separator} />
        <View>{children}</View>
      </View>
    </View>
  );
};

export default MyModal;

const styles = StyleSheet.create({
  MyModal: {
    zIndex: 1000,
    position: 'absolute',
    width: '100%',
    height: '100%',
    // display: 'none',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_con: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'white',
    width: '80%',

    elevation: 50,
  },
  modal_heading: {
    fontFamily: 'Poppins',
    fontSize: 20,
    color: 'black',
  },
  modal_head: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  separator: {
    height: 1,
    width: '100%',
    backgroundColor: 'black',
    marginVertical: 5,
  },
});
