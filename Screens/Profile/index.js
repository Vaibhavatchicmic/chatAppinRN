import React from 'react';
import {View, Text, Pressable, ScrollView, StatusBar} from 'react-native';
import RoundImage from '../Widgets/RoundImage';
import {Svg, Path, G} from 'react-native-svg';
import {styles} from './styles';
import ClickElement from './ClickElement';
import {useDispatch} from 'react-redux';

const Profile = ({navigation}) => {
  const name = 'Lonnie Murphy';
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch({
      type: 'user/logout',
    });
  }
  return (
    <View style={styles.Profile}>
      <StatusBar backgroundColor={'#771F98'} barStyle={'light-content'} />
      {/* header */}
      <View style={[styles.header, styles.pad_h]}>
        {/* <Text style={[styles.Text1, styles.col_white]}>Setting</Text> */}
        <View style={styles.flex_row}>
          {/* round image */}
          <RoundImage isLarge={false} />
          {/* Hello user */}
          <View style={styles.jus_around}>
            <Text style={[styles.Text4, styles.TextDim]}>Hello</Text>
            <Text style={[styles.Text2, styles.col_white]}>{name}</Text>
          </View>

          {/* edit btn */}
          <Pressable style={styles.align_end}>
            <Svg
              style={styles.edit_image}
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <Path opacity={0.15} d="M4 20h4l6-6-4-4-6 6v4z" fill="#fff" />
              <Path
                d="M10 10l-6 6v4h4l6-6m-4-4l3-3 4 4-3 3m-4-4l4 4m0 6h6V4H4v6"
                stroke="#fff"
                strokeWidth={1.5}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </Svg>
          </Pressable>
        </View>
      </View>

      {/* body with sign out */}
      <ScrollView>
        {/* Various buttons */}
        <ClickElement text={'Messages'} />
        <ClickElement text={'Change Password'} />
        <ClickElement text={'Support'} />
        <ClickElement text={'Privacy Policy'} />
        <ClickElement text={'Sign Out'} onPress={handleSignOut} />
      </ScrollView>
    </View>
  );
};

export default Profile;
