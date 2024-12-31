import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';
import Toast from 'react-native-simple-toast';

export const homeCount = createAsyncThunk(
  'home/homeCount',
  async (_, thunkAPI) => {
    const state = thunkAPI.getState();
    const {emails} = state.email;
    const tokens = emails.token;
    try {
      const response = await axios.get(
        'https://shipmentdelivery.vrinsoft.in/api/v1/Statistical_data',
        {
          headers: {Authorization: `Bearer ${tokens}`},
        },
      );
      const request = response.data.data;
      return request;
    } catch (error) {
      console.warn('Error fetching counts:', error?.response);
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
    const tokens = emails.token;

    try {
      const response = await axios.get(
        'https://shipmentdelivery.vrinsoft.in/api/v1/delivery_list',
        {
          headers: {Authorization: `Bearer ${tokens}`},
        },
      );
      const request = response.data.data;
      // console.log('resasx', request);
      return request;
    } catch (error) {
      console.warn('Error fetch myDeliveries:', error?.response);
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
    const tokens = emails.token;

    try {
      const response = await axios.get(
        'https://shipmentdelivery.vrinsoft.in/api/v1/notificiation_list',
        {
          headers: {Authorization: `Bearer ${tokens}`},
        },
      );
      const request = response.data.data;
      // console.log('resasx', request);
      return request;
    } catch (error) {
      console.warn('Error fetching Notification:', error?.response);
      return thunkAPI.rejectWithValue(
        error.response?.data || 'Unexpected Error',
      );
    }
  },
);

export const deliveryDetail = createAsyncThunk(
  'home/deliveryDetail',
  async (shipment_id, {getState, rejectWithValue}) => {
    try {
      const state = getState();
      const {emails} = state.email;
      const tokens = emails.token;

      const request = await axios.post(
        'https://shipmentdelivery.vrinsoft.in/api/v1/delivery_details',
        shipment_id,
        {headers: {Authorization: `Bearer ${tokens}`}},
      );
      const response = request.data.data;
      return response;
    } catch (error) {
      console.error('Error fetching delivery details:', error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const updateStatus = createAsyncThunk(
  'home/updateStatus',
  async ({shipment_id, status}, {getState, rejectWithValue}) => {
    try {
      const state = getState();
      const {emails} = state.email;
      const tokens = emails.token;

      const param = {shipment_id, status};
      // console.log(param);

      const request = await axios.post(
        'https://shipmentdelivery.vrinsoft.in/api/v1/update_delivery_status',
        param,
        {headers: {Authorization: `Bearer ${tokens}`}},
      );
      const response = request.data;
      return response;
    } catch (error) {
      console.error('Error Updating Status:', error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const logOut = createAsyncThunk(
  'home/logOut',
  async (_, {getState, rejectWithValue}) => {
    try {
      const state = getState();
      const {emails} = state.email;
      const tokens = emails ? emails.token : null;

      if (!tokens) throw new Error('No token available');

      const request = await axios.post(
        'https://shipmentdelivery.vrinsoft.in/api/v1/logout',
        {},
        {headers: {Authorization: `Bearer ${tokens}`}},
      );

      const response = request.data;
      console.log(response, 'response');

      return response;
    } catch (error) {
      console.error('Error logging out:', error);
      return rejectWithValue(error.response.data);
    }
  },
);

const homeSlice = createSlice({
  name: 'home',
  initialState: {
    loading: false,
    homeCounts: null,
    myDeliveryData: null,
    myNotifications: null,
    deliveryDetails: null,
    editStatus: null,
    logOut: null,
    error: null,
  },
  extraReducers: builder => {
    builder
      //Home Page counts
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
        Toast.show(state.error);
      })
      //Fetch myDeliveries
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
        Toast.show(state.error);
      })
      //fetch myNotifications
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
        Toast.show(state.error);
      })
      //get Delivery Details
      .addCase(deliveryDetail.pending, state => {
        state.loading = true;
      })
      .addCase(deliveryDetail.fulfilled, (state, action) => {
        state.loading = false;
        state.deliveryDetails = action.payload;
        state.error = null;
      })
      .addCase(deliveryDetail.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Toast.show(state.error);
      })
      //updating DeliveryStatus
      .addCase(updateStatus.pending, state => {
        state.loading = true;
      })
      .addCase(updateStatus.fulfilled, (state, action) => {
        state.loading = false;
        state.editStatus = action.payload.data;
        Toast.show(action.payload.message);
      })
      .addCase(updateStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Toast.show(state.error);
      })
      //logOut User
      .addCase(logOut.pending, state => {
        state.loading = true;
      })
      .addCase(logOut.fulfilled, (state, action) => {
        state.loading = false;
        state.logOut = action.payload.data;
        Toast.show(action.payload.message);
      })
      .addCase(logOut.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        Toast.show(state.error);
      });
  },
});

export default homeSlice.reducer;
