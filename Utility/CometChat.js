import {CometChat} from '@cometchat-pro/react-native-chat';

let appID = '238669cf456c0986';
let region = 'us';
let appSetting = new CometChat.AppSettingsBuilder()
  .subscribePresenceForAllUsers()
  .setRegion(region)
  .autoEstablishSocketConnection(true)
  .build();
CometChat.init(appID, appSetting).then(
  () => {
    console.log('Initialization completed successfully');
    // messagesListener();
  },
  error => {
    console.log('Initialization failed with error:', error);
  },
);

function messagesListener() {
  console.log('started listening to messaages');

  let listenerID = 'UNIQUE_LISTENER_ID';

  CometChat.addMessageListener(
    listenerID,
    new CometChat.MessageListener({
      onTextMessageReceived: textMessage => {
        console.log('Text message received successfully', textMessage);
      },
      onMediaMessageReceived: mediaMessage => {
        console.log('Media message received successfully', mediaMessage);
      },
      onCustomMessageReceived: customMessage => {
        console.log('Custom message received successfully', customMessage);
      },
    }),
  );
}

function stopMessagesListener() {
  var listenerID = 'UNIQUE_LISTENER_ID';

  CometChat.removeMessageListener(listenerID);
}

export const AUTH_KEY = 'e8be36c3e839fed6b6147c7106d1eedb81a19659';
