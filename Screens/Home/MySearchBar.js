import {View, Text, StatusBar, TextInput, Pressable} from 'react-native';
import React from 'react';
import Styles from './Styles';
import {Svg, Path} from 'react-native-svg';

const MySearchBar = () => {
  return (
    <View>
      <StatusBar backgroundColor="white" />
      <View style={Styles.MySearchBar}>
        {/* Search */}
        <View style={Styles.SearchInputCon}>
          <Searchbtn />
          <TextInput placeholder=" Search Chat" style={Styles.SearchInput} />
        </View>

        {/* QR opener */}
        <Pressable style={Styles.QR_opener}>
          <Svg
            width={24}
            height={20}
            viewBox="0 0 24 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <Path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M3.595 15.004c0 1.728 1.427 3.134 3.181 3.134h1.319c.441 0 .8.353.8.788a.794.794 0 01-.8.788H6.776c-2.636 0-4.781-2.113-4.781-4.71l-.001-3.493H.8a.794.794 0 01-.8-.787c0-.435.358-.788.8-.788l1.98-.002h18.44l1.98.002c.442 0 .8.353.8.788a.794.794 0 01-.8.788l-1.195-.001v3.493c0 2.597-2.145 4.71-4.781 4.71h-1.286a.794.794 0 01-.8-.788c0-.435.358-.788.8-.788h1.286c1.754 0 3.181-1.406 3.181-3.134v-3.493H3.594v3.493zM17.223 0c2.637 0 4.782 2.113 4.782 4.709v1.59a.794.794 0 01-.8.789.794.794 0 01-.8-.788V4.709c0-1.727-1.427-3.133-3.182-3.133h-1.285a.794.794 0 01-.8-.788c0-.435.358-.788.8-.788h1.285zM8.095 0c.442 0 .8.353.8.788a.794.794 0 01-.8.788H6.777c-1.755 0-3.182 1.406-3.182 3.133v1.59a.794.794 0 01-.8.789.794.794 0 01-.8-.788V4.709C1.995 2.113 4.14 0 6.777 0h1.318z"
              fill="#000"
            />
          </Svg>
        </Pressable>
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
