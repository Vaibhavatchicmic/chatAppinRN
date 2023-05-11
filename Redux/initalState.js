export const initalState = {
  // user: {username: 'Vaibhav', token: 'abcd', id: 1},
  user: null,
  // isLogged: true, // getting from User currently
  chatBoxes: [
    {
      name: 'Global Group',
      isGroup: true,
      id: 125,
      readTill: Date.now(),
      IreadTill: Date.now(),
      messages: [
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
    },
    {
      name: 'Robert Fox',
      isGroup: false,
      id: 123,
      readTill: Date.now(),
      IreadTill: Date.now(),
      messages: [
        {
          senderId: 1,
          time: Date.now(),
          text: 'hello everyone',
          id: 1,
          // readByAll: true,
        },
      ],
    },
    {
      name: 'Esther Howard',
      isGroup: true,
      id: 124,
      readTill: Date.now(),
      IreadTill: Date.now(),
      messages: [
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
  ],
  modal: false,
};
