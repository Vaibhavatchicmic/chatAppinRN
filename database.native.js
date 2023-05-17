import {Platform} from 'react-native';
import {Database} from '@nozbe/watermelondb';
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite';
import {Chat, Messages, User} from './model/models';

import appSchema from './model/schema';
import migrations from './model/migrations';
import parseErrorStack from 'react-native/Libraries/Core/Devtools/parseErrorStack';
import {devToolsEnhancer} from '@reduxjs/toolkit/dist/devtoolsExtension';
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
  modelClasses: [Chat],
});

database.write(async () => {
  // const chatboxes = database.get('chats');
  // await chatboxes.create(chatbox => {
  //   chatbox.name = 'GlobalChat';
  //   chatbox.is_group = false;
  // });

  const chats = await database.get('chats').query().fetch();
  console.log(chats);
});
