import {View, Text, StatusBar, TextInput, Pressable} from 'react-native';
import React from 'react';
import Styles from './Styles';
import {Svg, Path} from 'react-native-svg';
import {useDispatch} from 'react-redux';
import {fetchGroups} from '../../Redux/chatBoxesReducer';

const MySearchBar = ({
  SearchPlaceholder,
  icon,
  iconPress,
  filtering,
  setFilterValue,
}) => {
  return (
    <View>
      <StatusBar backgroundColor="#771F98" barStyle={'light-content'} />
      <View style={Styles.MySearchBar}>
        {/* Search */}
        <View style={Styles.SearchInputCon}>
          <Searchbtn />
          <TextInput
            onChangeText={val => {
              if (filtering) {
                setFilterValue(val);
              }
            }}
            placeholder={SearchPlaceholder}
            style={Styles.SearchInput}
          />
        </View>

        {/* QR opener */}
        {icon === 'reload' && (
          <Pressable
            style={Styles.QR_opener}
            onPress={() => {
              if (iconPress) {
                iconPress();
              }
            }}>
            <Svg
              rotation={180}
              xmlns="http://www.w3.org/2000/svg"
              width={24}
              height={24}
              viewBox="0 0 24 24">
              <Path
                d="M2 12a9 9 0 009 9c2.39 0 4.68-.94 6.4-2.6l-1.5-1.5A6.706 6.706 0 0111 19c-6.24 0-9.36-7.54-4.95-11.95C10.46 2.64 18 5.77 18 12h-3l4 4h.1l3.9-4h-3a9 9 0 00-18 0z"
                fill="#74179b"
              />
            </Svg>
          </Pressable>
        )}
      </View>
    </View>
  );
};

function Searchbtn() {
  return (
    <Pressable>
      <Svg
        width={24}
        height={24}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg">
        <Path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M11.534 0c6.36 0 11.533 5.059 11.533 11.279 0 2.934-1.151 5.61-3.036 7.619l3.708 3.618c.347.34.348.889.001 1.228a.9.9 0 01-1.257.002l-3.752-3.66a11.64 11.64 0 01-7.197 2.472C5.174 22.558 0 17.498 0 11.278 0 5.06 5.174 0 11.534 0zm0 1.737c-5.38 0-9.758 4.28-9.758 9.542 0 5.261 4.378 9.542 9.758 9.542 5.38 0 9.757-4.28 9.757-9.542s-4.378-9.542-9.757-9.542z"
          fill="#252525"
        />
      </Svg>
    </Pressable>
  );
}

export default MySearchBar;
