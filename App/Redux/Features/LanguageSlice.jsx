import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

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
    const response = request.data;
    // console.log('rsfcadsd =====> ', response);
    return response;
  },
);

export const verifyOTP = createAsyncThunk(
  'language/verifyOTP',
  async ({email, fcm_token, otp}) => {
    const param = {email, fcm_token, otp};
    // console.log(param, '<======== param');

    const request = await axios.post(
      `https://shipmentdelivery.vrinsoft.in/api/v1/verify_otp`,
      param,
    );
    const response = request.data;
    // console.log('verifyOTP======>', response);
    return response;
  },
);

export const resendOTP = createAsyncThunk(
  'language/resendOTP',
  async ({email, fcm_token}) => {
    const param = {email, fcm_token};
    // console.log(param, '<======== param');

    const request = await axios.post(
      `https://shipmentdelivery.vrinsoft.in/api/v1/resend_OTP`,
      param,
    );
    const response = request.data;
    console.log('resendOTP======>', response);
    // return response;
  },
);

const languageSlice = createSlice({
  name: 'language',
  initialState: {
    loading: false,
    otpVerifyLoading: false,
    selectedLanguage: [],
    loginEmail: null,
    token: null,
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
        state.error = action.error.message;
        Toast.show(state.error);
      })
      .addCase(login.pending, state => {
        state.otpVerifyLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.otpVerifyLoading = false;
        state.loginEmail = action.payload.data;
        Toast.show(action.payload.message);
      })
      .addCase(login.rejected, (state, action) => {
        state.otpVerifyLoading = false;
        state.error = action.error.message;
        Toast.show(state.error);
      })
      .addCase(verifyOTP.pending, state => {
        state.otpVerifyLoading = true;
      })
      .addCase(verifyOTP.fulfilled, (state, action) => {
        state.otpVerifyLoading = false;
        state.token = action.payload.data;
        Toast.show(action.payload.message);
      })
      .addCase(verifyOTP.rejected, (state, action) => {
        state.otpVerifyLoading = false;
        state.error = action.error.message;
        Toast.show(state.error);
      });
  },
});

export default languageSlice.reducer;
