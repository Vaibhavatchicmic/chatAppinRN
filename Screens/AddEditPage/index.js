import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Pressable,
  FlatList,
} from 'react-native';
import React from 'react';
import BackButton, {BackButton2} from '../Widgets/BackButton';
import {Path, Svg} from 'react-native-svg';
import {useDispatch, useSelector} from 'react-redux';
import {onDone, selectAddEditPageData} from '../../Redux/AddEditPageReducer';
import {identicalArrays} from '@nozbe/watermelondb/utils/fp';

const AddEditPage = ({navigation}) => {
  const dispatch = useDispatch();
  const data = useSelector(selectAddEditPageData);
  // console.log(data);
  return (
    <View style={styles.Page}>
      {/* heading */}
      <View style={[styles.header, styles.padH]}>
        <BackButton2 fill="white" onPress={() => navigation.goBack()} />
        {/* Heading */}
        <Text style={styles.heading}>{data.heading}</Text>
      </View>
      {/* <ScrollView style={[{flex: 1}, styles.padH]}>
        <View style={styles.form}>
          <View style={styles.editImage}>
            <Text>Image</Text>
          </View>
          <TextField placeholder="Group Name" />
          <TextField placeholder="Group Id" />
        </View>
      </ScrollView> */}
      <FlatList
        style={styles.FlatList}
        data={data.inputs}
        renderItem={({item, index}) => {
          return (
            <TextField
              placeholder={item.name}
              value={item.value}
              onChange={val => {
                // console.log(index, val);
                dispatch({
                  type: 'AddEditPageData/setInput',
                  payload: {
                    index: index,
                    value: val,
                  },
                });
              }}
            />
          );
        }}
      />
      {/* Done btn */}
      <Pressable style={styles.doneBtn} onPress={() => dispatch(onDone())}>
        <Svg
          xmlns="http://www.w3.org/2000/svg"
          height={30}
          viewBox="0 0 24 24"
          width={30}>
          <Path d="M0 0h24v24H0V0z" fill="none" />
          <Path
            d="M9 16.2l-3.5-3.5a.984.984 0 00-1.4 0 .984.984 0 000 1.4l4.19 4.19c.39.39 1.02.39 1.41 0L20.3 7.7a.984.984 0 000-1.4.984.984 0 00-1.4 0L9 16.2z"
            fill="#fff"
          />
        </Svg>
      </Pressable>
    </View>
  );
};

export default AddEditPage;

function TextField({placeholder, value, onChange}) {
  return (
    <TextInput
      onChangeText={onChange}
      style={styles.TextField}
      placeholder={placeholder}
      value={value}
      cursorColor="#771F98"
    />
  );
}

const styles = StyleSheet.create({
  Page: {
    flex: 1,
  },
  header: {
    backgroundColor: '#771F98',
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
    paddingVertical: 20,
  },
  heading: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  doneBtn: {
    backgroundColor: '#771F98',
    width: 50,
    height: 50,
    borderRadius: 100,
    position: 'absolute',
    bottom: 22,
    right: 22,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 20,
    shadowOffset: 20,
  },
  TextField: {
    borderBottomWidth: 2,
    borderBottomColor: '#771F98',
    backgroundColor: '#f2d7fb',
    paddingHorizontal: 10,
    marginTop: 20,
  },
  padH: {
    paddingHorizontal: 22,
  },
  form: {
    gap: 20,
  },
  editImage: {
    width: '50%',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  },
  FlatList: {
    paddingHorizontal: 22,
    backgroundColor: 'white',
  },
});
