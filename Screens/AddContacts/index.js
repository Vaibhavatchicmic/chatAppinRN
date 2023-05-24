import {View, Text, StatusBar, Pressable} from 'react-native';
import React, {useEffect} from 'react';
import MySearchBar from '../Home/MySearchBar';
import {styles} from './Styles';
import RoundImage from '../Widgets/RoundImage';
import {G, Path, Svg} from 'react-native-svg';
import {on} from '@nozbe/watermelondb/QueryDescription';
import {createChatBox} from '../../Redux/currentChatBoxReducer';
import {useDispatch, useSelector} from 'react-redux';
import {selectAddEditPageData} from '../../Redux/AddEditPageReducer';

const AddContacts = ({navigation}) => {
  const dispatch = useDispatch();
  const AddEditPageData = useSelector(selectAddEditPageData);
  useEffect(() => {
    if (AddEditPageData.active) {
      navigation.navigate('AddEdit');
    }
  });
  return (
    <View>
      <MySearchBar SearchPlaceholder="Search Contact" />
      <View style={styles.body}>
        {/* new something */}
        <View>
          <AddNew
            text="New group"
            img={
              <Svg
                xmlns="http://www.w3.org/2000/svg"
                height={96}
                viewBox="0 0 24 24"
                width={96}>
                <G fill="none">
                  <Path d="M0 0H24V24H0z" />
                  <Path d="M0 0H24V24H0z" />
                </G>
                <G fill="#771f98">
                  <Path d="M22 9L22 7 20 7 20 9 18 9 18 11 20 11 20 13 22 13 22 11 24 11 24 9z" />
                  <Path d="M8 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zM8 13c-2.67 0-8 1.34-8 4v3h16v-3c0-2.66-5.33-4-8-4zM12.51 4.05C13.43 5.11 14 6.49 14 8s-.57 2.89-1.49 3.95C14.47 11.7 16 10.04 16 8s-1.53-3.7-3.49-3.95zM16.53 13.83C17.42 14.66 18 15.7 18 17v3h2v-3c0-1.45-1.59-2.51-3.47-3.17z" />
                </G>
              </Svg>
            }
            onPress={() => {
              dispatch({
                active: true,
                type: 'AddEditPageData/set',
                payload: {
                  active: true,
                  heading: 'New Group',
                  inputs: [
                    {name: 'Group Id', value: ''},
                    {name: 'Group Name', value: ''},
                  ],
                  toDispatchOnDone: 'createGroup',
                },
              });
            }}
          />
          <AddNew text="New contact" />
        </View>
      </View>
    </View>
  );
};

function AddNew({img, text, onPress}) {
  return (
    <Pressable style={styles.AddNew} onPress={onPress}>
      {/* <RoundImage img={img} /> */}
      {/* {img} */}
      <Text>{text}</Text>
    </Pressable>
  );
}
export default AddContacts;
