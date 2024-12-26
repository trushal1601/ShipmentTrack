import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';

export const language_id = createAsyncThunk(
  'language/language_id',
  async language_id => {
    // console.log('language_id', language_id);

    const request = await axios.post(
      `https://shipmentdelivery.vrinsoft.in/api/v1/labels`,
      language_id,
    );
    const response = request.data.data;
    // console.log('rsfcadsd =====> ', response);
    return response;
  },
);

export const login = createAsyncThunk(
  'language/login',
  async ({email, fcm_token}) => {
    const param = {email, fcm_token};
    // console.log(param, '<======== param');

    const request = await axios.post(
      `https://shipmentdelivery.vrinsoft.in/api/v1/login`,
      param,
    );
    const response = request.data.data;
    // console.log('rsfcadsd =====> ', response);
    return response;
  },
);

export const verifyOTP = createAsyncThunk(
  'language/verifyOTP',
  async ({email, fcm_token, otp}) => {
    const param = {email, fcm_token, otp};
    console.log(param, '<======== param');

    const request = await axios.post(
      `https://shipmentdelivery.vrinsoft.in/api/v1/verify_otp`,
      param,
    );
    const response = request.data.data;
    console.log('verifyOTP======>', response);
    return response;
  },
);

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    loading: false,
    otpVerifyLoading: false,
    selectedLanguage: [],
    loginEmail: null,
    token:null,
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
        state.error = null;
      })
      .addCase(language_id.rejected, (state, action) => {
        state.loading = false;
        state.error = 'language not found';
      })
      .addCase(login.pending, state => {
        state.otpVerifyLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.otpVerifyLoading = false;
        state.loginEmail = action.payload;
        // console.log('email Found', state.loginEmail);
      })
      .addCase(login.rejected, (state, action) => {
        state.otpVerifyLoading = false;
        state.error = action.error.message;
      })
      .addCase(verifyOTP.pending, state => {
        state.otpVerifyLoading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.otpVerifyLoading = false;
        state.token = action.payload;
        console.log('email Found', state.token);
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.otpVerifyLoading = false;
        state.error = action.error.message;
      });
  },
});

export default languageSlice.reducer;
