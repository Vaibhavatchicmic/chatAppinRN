export const initalState = {
  // user: {username: 'Vaibhav', token: 'abcd', id: 1},
  user: null,
  // isLogged: true, // getting from User currently
  chatBoxes: {
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed',
    error: null, //'string'
    125: {
      name: 'Global Group',
      isGroup: true,
      id: 125,
      readTill: Date.now(),
      IreadTill: Date.now(),
    },
    123: {
      name: 'Robert Fox',
      isGroup: false,
      id: 123,
      readTill: Date.now(),
      IreadTill: Date.now(),
    },
    124: {
      name: 'Esther Howard',
      isGroup: true,
      id: 124,
      readTill: Date.now(),
      IreadTill: Date.now(),
    },
  },
  modal: false,
  alert: false,

  // messages indexed by group id
  messages: {
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed',
    error: null, //'string'
    125: [
      {
        senderId: 1,
        time: Date.now(),
        text: 'hello everyone',
        id: 1,
        // readByAll: true,
      },
      {
        senderId: 2,
        time: Date.now(),
        text: 'hi',
        id: 2,
      },
      {
        senderId: 3,
        time: Date.now(),
        text: 'hello everyone',
        id: 3,
      },
    ],
    123: [
      {
        senderId: 1,
        time: Date.now(),
        text: 'hello everyone',
        id: 1,
        // readByAll: true,
      },
    ],
    124: [
      {
        senderId: 1,
        time: Date.now(),
        text: 'hello everyone',
        id: 1,
        // readByAll: true,
      },
      {
        senderId: 2,
        time: Date.now(),
        text: 'hi',
        id: 2,
      },
    ],
  },
};
