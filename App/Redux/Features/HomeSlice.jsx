import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';
import {useSelector} from 'react-redux';

export const homeCount = createAsyncThunk(
  'home/homeCount',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const {emails} = state.email;
    const tokens = emails.token.Token;
    console.log(tokens);
    try {
      const response = await axios.get(
        'https://shipmentdelivery.vrinsoft.in/api/v1/Statistical_data',
        {
          headers: {Authorization: `Bearer ${tokens}`},
        },
      );
      const request = response.data.data;
      console.log('respx', request);
      return request;
    } catch (error) {
      console.warn('ErrorDemo:', error?.response);
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Unexpected Error',
      );
    }
  },
);

export const myDelivery = createAsyncThunk(
  'home/myDelivery',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const {emails} = state.email;
    const tokens = emails.token.Token;
    console.log(tokens);
    try {
      const response = await axios.get(
        'https://shipmentdelivery.vrinsoft.in/api/v1/delivery_list',
        {
          headers: {Authorization: `Bearer ${tokens}`},
        },
      );
      const request = response.data.data;
      console.log('resasx', request);
      return request;
    } catch (error) {
      console.warn('ErrorDemo:', error?.response);
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Unexpected Error',
      );
    }
  },
);

export const myNotification = createAsyncThunk(
  'home/myNotification',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const {emails} = state.email;
    const tokens = emails.token.Token;
    console.log(tokens);
    try {
      const response = await axios.get(
        'https://shipmentdelivery.vrinsoft.in/api/v1/notificiation_list',
        {
          headers: {Authorization: `Bearer ${tokens}`},
        },
      );
      const request = response.data.data;
      console.log('resasx', request);
      return request;
    } catch (error) {
      console.warn('ErrorDemo:', error?.response);
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Unexpected Error',
      );
    }
  },
);

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    loading: false,
    homeCounts: null,
    myDeliveryData: null,
    myNotifications:null,
    error: null,
  },
  extraReducers: builder => {
    builder
      .addCase(homeCount.pending, state => {
        state.loading = true;
      })
      .addCase(homeCount.fulfilled, (state, action) => {
        state.loading = false;
        state.homeCounts = action.payload;
        state.error = null;
      })
      .addCase(homeCount.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(myDelivery.pending, state => {
        state.loading = true;
      })
      .addCase(myDelivery.fulfilled, (state, action) => {
        state.loading = false;
        state.myDeliveryData = action.payload;
        state.error = null;
      })
      .addCase(myDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(myNotification.pending, state => {
        state.loading = true;
      })
      .addCase(myNotification.fulfilled, (state, action) => {
        state.loading = false;
        state.myNotifications = action.payload;
        state.error = null;
      })
      .addCase(myNotification.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
  },
});

export default homeSlice.reducer;
