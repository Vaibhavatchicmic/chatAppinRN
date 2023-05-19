import {Platform} from 'react-native';
import {Database, Q} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {Chat, Messages, User} from './model/models';

import appSchema from './model/schema';
import migrations from './model/migrations';
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

db_readGroupMessages(124);
db_createGroupMessages('abcd', 124, 1, 12345);

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

export async function db_readGroupMessages(ID) {
  const messages = await database.read(async () => {
    const MessagesCollection = await database
      .get('messages')
      .query(Q.where('chat_id', Q.eq(ID)));
    console.log('messages in db', MessagesCollection);
    return MessagesCollection;
  });
}

export async function db_createGroupMessages(
  text,
  chatBoxId,
  senderId,
  sendAt,
) {
  const message = await database.write(async () => {
    const message = await database.get('messages').create(message => {
      message.text = text;
      message.chat_id = chatBoxId;
      message.sender_id = senderId;
      message.send_at = sendAt;
    });
    console.log(message);
    return message;
  });
}
