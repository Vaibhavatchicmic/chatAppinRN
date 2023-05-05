import {Modal, View, Text, Pressable, StyleSheet} from 'react-native';
import React from 'react';
export default function MyModal({modal, setModal}) {
  return (
    <Modal
      visible={modal.isVisible}
      transparent={true}
      animationType="slide"
      onRequestClose={() => {
        setModal({...modal, isVisible: false});
      }}>
      <View style={styles.modal_con}>
        <View style={styles.modal_content}>
          <View style={styles.modal_text}>
            <Text>{modal.text}</Text>
          </View>
          <Pressable
            style={styles.close_button}
            onPress={() => {
              setModal({...modal, isVisible: false});
            }}>
            <Text>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
