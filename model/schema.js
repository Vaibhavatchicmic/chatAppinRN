import {appSchema, tableSchema} from '@nozbe/watermelondb';

export default appSchema({
  version: 3,
  tables: [
    tableSchema({
      name: 'chats',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'is_group', type: 'boolean'},
      ],
    }),
    tableSchema({
      name: 'messages',
      columns: [
        {name: 'text', type: 'string'},
        {name: 'chat_id', type: 'string', isIndexed: true},
        {name: 'sender_id', type: 'string'},
        {name: 'send_at', type: 'number'},
        {name: 'mes_id', type: 'number', isIndexed: true},
      ],
    }),
    tableSchema({
      name: 'user',
      columns: [
        {name: 'name', type: 'string'},
        {name: 'token', type: 'string'},
        {name: 'password', type: 'string'},
        {name: 'uid', type: 'string'},
      ],
    }),
  ],
});

// It is database convention to use plural and snake_case names for table names. Column names are also snake_case
//column types: string, number or boolean; default values : '', 0, false
// field could be null, if column marked as isOptional:true
// date should be number which has name ending with _at
// all table automatically have a string column id of string type
// whenever change schema you must increment its version number (clers all data on app reload, use Migrations for seamless update)
