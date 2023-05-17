const {createSlice} = require('@reduxjs/toolkit');

const currentChatBoxSlice = createSlice({
  name: 'currentChatBox',
  initialState: null,
  reducers: {
    set: (state, action) => {
      console.log('changing current Chatbox', action);
      return action.payload.id;
    },
    unset: (state, action) => {
      return null;
    },
  },
});

const currentChatBoxReducer = currentChatBoxSlice.reducer;
export {currentChatBoxReducer};

export function selectCurrentChatBox(state) {
  return state.currentChatBox;
}
