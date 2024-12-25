import {createSlice} from '@reduxjs/toolkit';

export const emailSlice = createSlice({
  name: 'user',
  initialState: {
    emails: '',
  },
  reducers: {
    setEmail: (state, action) => {
      state.emails = action.payload;
    },
  },
});

export const {setEmail} = emailSlice.actions;
export default emailSlice.reducer;
