import {Pressable, StyleSheet, Text, View} from 'react-native';
import React from 'react';

function ClickIcon({children}) {
  return <Pressable>{children}</Pressable>;
}

export default ClickIcon;

const styles = StyleSheet.create({});
