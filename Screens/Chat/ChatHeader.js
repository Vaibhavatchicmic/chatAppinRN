import {StyleSheet, Text, View, Image, StatusBar} from 'react-native';
import React, {useContext} from 'react';
import {BackButton2} from '../Widgets/BackButton';
import {Svg, Path} from 'react-native-svg';
import ClickIcon from '../Widgets/ClickIcon';
import styles from './Styles';
import {ChatBoxContext} from './context';
import MyStatusBar from '../Widgets/MyStatusBar';
import {useSelector} from 'react-redux';
import {selectCurrentChatBox} from '../../Redux/currentChatBoxReducer';
import {getChatBoxbyId} from '../../Redux/chatBoxesReducer';
function ChatHeader({onBack}) {
  const chatBox = useSelector(
    getChatBoxbyId(useSelector(selectCurrentChatBox)),
  );
  // console.log('from chatHeader :', chatBox);
  return (
    <View style={styles.ChatHeader}>
      <MyStatusBar />
      {/* Back btn */}
      <BackButton2 onPress={onBack} />

      {/* Group/Perosn */}
      <View>
        <View style={styles.about_person}>
          <View style={styles.image_box}>
            <Image
              style={styles.Image_icon}
              source={
                chatBox.isGroup
                  ? require('../../Assets/Group.png')
                  : require('../../Assets/Person.jpg')
              }
            />
          </View>
          <Text>{chatBox.name}</Text>
        </View>
      </View>
      <View style={styles.icons}>
        <ClickIcon>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={18}
            fill="none">
            <Path
              fill="#8D8D8D"
              fillRule="evenodd"
              d="m7.307.001.565.001h.292l.6.001 3.787.008h.468l.213.001c2.7-.183 5.137 1.756 5.355 4.358.002.027.003.178.005.454l2.491-1.974a2.443 2.443 0 0 1 2.547-.301C24.476 2.938 25 3.74 25 4.647l-.014 8.534c-.002.905-.528 1.709-1.373 2.095a2.461 2.461 0 0 1-1.03.225c-.541 0-1.075-.18-1.516-.53l-2.47-1.983v.101c.05 1.226-.4 2.407-1.272 3.325-.915.965-2.178 1.526-3.553 1.58-.023.002-.155.003-.37.004h-2.394l-.578-.002-4.138-.008-.493-.001h-.442c-.127.008-.254.013-.381.013-2.537.001-4.75-1.88-4.96-4.348v-.033l-.001-.037v-.017l-.002-.067v-.14l-.001-.044v-.104l-.001-.06-.001-.21v-.08l-.001-.284v-.107l-.002-.367v-.769l-.001-.18-.001-1.041V4.903C-.053 3.706.396 2.517 1.272 1.59 2.187.625 3.448.061 4.824.005l.251-.003h.258L5.492 0h1.816Zm5.99 1.75-4.949-.006h-.832l-.388-.001H5.04c-.079 0-.13 0-.15.002-.885.036-1.702.4-2.292 1.022a2.836 2.836 0 0 0-.795 2.095V9.35l.001.295.001 1.386v.255l.001.48v.223l.001.598c.002.539.003.888.005.955.137 1.608 1.695 2.838 3.478 2.706h.58l.605.001 1.57.003h.634c.315.002.628.002.934.002l.602.001h.293l.562.001H13.458l.252-.001A3.32 3.32 0 0 0 16 15.235c.55-.58.833-1.322.799-2.09l-.002-.02V6.247l-.001-.223-.001-.596-.001-.47-.001-.233-.003-.247c-.136-1.617-1.7-2.861-3.493-2.726Zm8.926 2.447L18.597 7.06v.445l.001 2.912 3.61 3.209a.594.594 0 0 0 .636.074.56.56 0 0 0 .341-.522l.015-8.533a.562.562 0 0 0-.342-.523.6.6 0 0 0-.635.076Z"
              clipRule="evenodd"
            />
          </Svg>
        </ClickIcon>
        <ClickIcon>
          <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={25}
            height={25}
            fill="none">
            <Path
              fill="#8D8D8D"
              fillRule="evenodd"
              d="M2.877 3.733c.002 0-.059.064-.135.14-.295.286-.906.882-.913 2.13-.01 1.745 1.138 4.985 6.664 10.51 5.5 5.497 8.735 6.658 10.484 6.658h.025c1.248-.006 1.843-.619 2.13-.912.089-.09.16-.157.21-.198 1.214-1.222 1.836-2.132 1.83-2.715-.009-.595-.749-1.298-1.772-2.271-.326-.31-.68-.647-1.052-1.02-.968-.965-1.447-.8-2.5-.43-1.458.512-3.458 1.207-6.565-1.902-3.112-3.11-2.416-5.107-1.906-6.564.368-1.054.536-1.534-.432-2.503-.38-.378-.72-.736-1.033-1.065-.967-1.018-1.664-1.753-2.256-1.761h-.01c-.584 0-1.491.624-2.775 1.908l.006-.005ZM18.978 25c-3.039 0-7.001-2.42-11.778-7.194C2.405 13.012-.018 9.038 0 5.993c.011-2.012 1.066-3.043 1.462-3.43.021-.025.092-.094.116-.119C3.327.694 4.506-.013 5.68 0 7.042.02 8.011 1.038 9.238 2.33c.304.32.633.667 1 1.033 1.78 1.78 1.273 3.232.866 4.398-.444 1.272-.828 2.37 1.472 4.67 2.302 2.3 3.4 1.916 4.667 1.468 1.167-.407 2.615-.917 4.398.863.361.361.704.687 1.02.988 1.297 1.233 2.322 2.207 2.34 3.573.014 1.165-.694 2.351-2.44 4.099l-.773-.524.653.639c-.386.396-1.415 1.452-3.429 1.463h-.034Z"
              clipRule="evenodd"
            />
          </Svg>
        </ClickIcon>
      </View>
    </View>
  );
}

export default ChatHeader;
