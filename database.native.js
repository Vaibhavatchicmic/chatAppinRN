import {Platform} from 'react-native';
import {Database, Q} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {Chat, Messages, User} from './model/models';

import appSchema from './model/schema';
import migrations from './model/migrations';
import {gt, lt} from '@nozbe/watermelondb/QueryDescription';
// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
  schema: appSchema,
  // (You might want to comment it out for development purposes -- see Migrations documentation)
  migrations,
  // (optional database name or file system path)
  // dbName: 'myapp',
  // (recommended option, should work flawlessly out of the box on iOS. On Android,
  // additional installation steps have to be taken - disable if you run into issues...)
  jsi: true /* Platform.OS === 'ios' */,
  // (optional, but you should implement this method)
  onSetUpError: error => {
    // Database failed to load -- offer the user to reload the app or log out
  },
});

// Then, make a Watermelon database from it!
const database = new Database({
  adapter,
  modelClasses: [Chat, Messages, User],
});

// db_readGroupMessages(124);
// db_createGroupMessages('abcd', 124, 1, 12345);

export async function db_setCurrentUser({name, token, password, uid}) {
  let user = {
    name: name,
    token: token,
    password: password,
    uid: uid,
  };
  await database.localStorage.set('CurrentUser', JSON.stringify(user));
}
export async function db_getCurrentUser() {
  const user = await database.localStorage.get('CurrentUser');
  if (!user) {
    return null;
  }
  return JSON.parse(user);
}
export async function db_remCurrentUser() {
  await database.localStorage.remove('CurrentUser');
}

// export async function db_readGroups() {
//   const groups = await database.read(async => {
//     const GroupCollection = database.get('chats').query().fetch();
//     console.log(GroupCollection);
//     return GroupCollection;
//   });
// }

// export async function db_createGroups(name, is_group) {}
const GUID = '101'; //for now
export async function db_readGroupMessages(
  ID = GUID,
  limit = 50,
  lastMesId = 10000000,
) {
  let messages = await database.read(async () => {
    console.log('searching in db', ID, lastMesId);
    const MessagesCollection = await database
      .get('messages')
      .query(
        Q.where('chat_id', Q.eq(ID)),
        Q.where('mes_id', lt(+lastMesId)),
        Q.take(limit),
        Q.sortBy('mes_id', Q.desc),
      );
    // for (let i of MessagesCollection) {
    //   console.log(i);
    // }
    // console.log(MessagesCollection, 'messages collection');
    return MessagesCollection;
  });

  // for (let i of messages) {
  //   console.log(i._raw.text);
  // }
  messages = messages.map(mes => mes._raw).reverse();
  // console.log(messages);
  return messages;
}

// export async function db_readGroupMessagesBefore(
//   ID = GUID,
//   limit = 50,
//   lastMesId,
// ) {
//   const messages = await database.read(async () => {
//     const MessagesCollection = await database
//       .get('messages')
//       .query(Q.where('chat_id', Q.eq(ID)));
//     // console.log('messages in db', MessagesCollection);
//     for (let i of MessagesCollection) {
//       console.log(i._raw);
//     }
//     return MessagesCollection;
//   });
// }

export async function db_createGroupMessages(
  text,
  senderId,
  sentAt,
  mesId, //number
  chatBoxId = GUID,
) {
  // console.log(
  //   'creating new message in db',
  //   text,
  //   chatBoxId,
  //   senderId,
  //   sentAt,
  //   mesId,
  // );
  const message = await database.write(async () => {
    const message = await database.get('messages').create(message => {
      message.text = text;
      message.chatId = chatBoxId;
      message.senderId = senderId;
      message.sentAt = sentAt;
      message.mesId = mesId;
    });
    // console.log(message._raw);
    return message;
  });
}

export async function db_clearDatabase() {
  await database.write(async () => {
    await database.get('messages').query().destroyAllPermanently();
    console.log('cleared all messages');
  });
}
