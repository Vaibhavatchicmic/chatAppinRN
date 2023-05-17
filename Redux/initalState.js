export const initalState = {
  user: {
    status: 'no_user', // 'no_user'|'idle' | 'login_submitting' | 'login_succeeded' | 'login_failed'| 'register_submitting' |'register_succeeded','register_failed',
    // username: 'Vaibhav',
    // token: 'abcd',
    // id: 1,
  },
  chatBoxes: {
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed',
    error: null, //'string'
    data: {
      //own id indexed
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
  },
  // messages indexed by group id
  messages: {
    status: 'idle', //'idle' | 'loading' | 'succeeded' | 'failed',
    error: null, //'string'
    data: {
      //index by group id
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
  },
  navigation: {
    screens: [],
    currentScreen: '',
  },
  modal: false,
  alert: false,
};
