import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const language_id = createAsyncThunk(
  'language/language_id',
  async language_id => {
    console.log("language_id",language_id);
    
    const request = await axios.post(
      `https://shipmentdelivery.vrinsoft.in/api/v1/labels`,
      language_id,
    );
    const response = request.data.data;
    console.log('rsfcadsd =====> ', response);
    return response;
  },
);

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    loading: false,
    selectedLanguage: [],
    user: null,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(language_id.pending, state => {
        state.loading = true;
      })
      .addCase(language_id.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedLanguage = action.payload;
        console.log('hfdjsfbj', state.selectedLanguage);

        // toast.success(action.payload.message);
        state.error = null;
      })
      .addCase(language_id.rejected, (state, action) => {
        state.loading = false;
        state.error = 'language not found';
      });
  },
});

export default languageSlice.reducer;
