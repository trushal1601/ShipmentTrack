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
      console.warn('ErrorDemo:', error?.response);
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
      const tokens = emails.token.Token;
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
      const tokens = emails.token.Token;
      const param = {shipment_id, status};
      console.log(param);

      const request = await axios.post(
        'https://shipmentdelivery.vrinsoft.in/api/v1/update_delivery_status',
        param,
        {headers: {Authorization: `Bearer ${tokens}`}},
      );
      const response = request.data;
      return response;
    } catch (error) {
      console.error('Error fetching delivery details:', error);
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
      })
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
      });
  },
});

export default homeSlice.reducer;
