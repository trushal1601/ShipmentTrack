import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async()=>{
        
    }
)

const userSlice = createSlice({
    name:'user',
    initialState:{
        loading:false,
        user:null,
        error:null
    },
    // extraReducers
})

export default userSlice.reducer