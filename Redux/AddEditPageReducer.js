const {createSlice} = require('@reduxjs/toolkit');

const AddEditPageSlice = createSlice({
  name: 'AddEditPageData',
  initialState: {
    heading: 'New Group',
    inputs: [],
    toDispatchOnDone: null,
  },
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
  },
});

export const AddEditPageReducer = AddEditPageSlice.reducer;

export function selectAddEditPageData(state) {
  return state.selectAddEditPageData;
}
