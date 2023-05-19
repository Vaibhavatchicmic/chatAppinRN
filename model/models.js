import {Database, Model} from '@nozbe/watermelondb';
import {
  field,
  text,
  date,
  relation,
  children,
} from '@nozbe/watermelondb/decorators';

export class Chat extends Model {
  static table = 'chats';
  static associations = {
    messages: {type: 'has_many', foreignKey: 'chat_id'},
  };

  //   model fields (defined with decorators)
  @text('name') name; //trim whitespaces
  @field('is_group') isGroup;
  @children('messages') messages;
}

export class Messages extends Model {
  static table = 'messages';
  static associations = {
    chats: {type: 'belongs_of', key: 'chat_id'},
  };

  @text('text') text;
  @field('chat_id') chatId;
  @field('sender_id') senderId;
  @date('send_at') sentAt;
  @field('mes_id') mesId;
}

export class User extends Model {
  static table = 'user';

  @field('name') name;
  @text('token') token;
  @text('password') password;
  @text('uid') uid;
}
