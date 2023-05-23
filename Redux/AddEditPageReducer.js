import {createGroup} from './chatBoxesReducer';

const {createSlice} = require('@reduxjs/toolkit');

const AddEditPageSlice = createSlice({
  active: false,
  name: 'AddEditPageData',
  initialState: {
    heading: 'New Group',
    inputs: [],
    toDispatchOnDone: null, //"createGroup"
  },
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
  },
});

const DoneFun = {
  createGroup: createGroup,
};

export const AddEditPageReducer = AddEditPageSlice.reducer;

export function selectAddEditPageData(state) {
  return state.selectAddEditPageData;
}
