import {action} from '@nozbe/watermelondb/decorators';
import {createGroup} from './chatBoxesReducer';
import {act} from 'react-test-renderer';

const {createSlice} = require('@reduxjs/toolkit');

const AddEditPageSlice = createSlice({
  name: 'AddEditPageData',
  initialState: {
    active: false,
    heading: '',
    inputs: [],
    toDispatchOnDone: null, //"createGroup"
  },
  reducers: {
    set: (state, action) => {
      return action.payload;
    },
    setInput: (state, action) => {
      state.inputs[action.payload.index].value = action.payload.value;
    },
  },
});

const DoneFun = {
  createGroup: createGroup,
};

export const AddEditPageReducer = AddEditPageSlice.reducer;

export function selectAddEditPageData(state) {
  return state.AddEditPageData;
}

export function onDone(onSuccess) {
  return async (dispatch, getState) => {
    const toDisFun = DoneFun[getState().AddEditPageData.toDispatchOnDone];
    const GUID = getState().AddEditPageData.inputs[0].value;
    const groupName = getState().AddEditPageData.inputs[1].value;
    dispatch(toDisFun(GUID, groupName));
    onSuccess();
  };
}
