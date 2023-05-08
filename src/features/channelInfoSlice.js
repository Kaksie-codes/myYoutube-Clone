import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const api_key = import.meta.env.VITE_MY_API_KEY;

export const fetchChannelInfo = createAsyncThunk(
    'channelInfo/fetchChannelInfo',
    async (channelId) => {
        try{
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${api_key}`);
            // console.log('channelInfo >>>', response.data.items[0])
            return response.data.items[0];
        }catch(err){
            console.log(err)
        } 
    }
  );


 

const initialState = {    
    channelInfo: null,
    status: 'idle',
    error: null,    
}

const videoSlice = createSlice({
    name: 'channelInfo',
    initialState,
    reducers:{

    },
extraReducers: (builder) => {
    builder    
    .addCase(fetchChannelInfo.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(fetchChannelInfo.fulfilled, (state, action) => {
        // console.log(action);
        state.status = 'succeeded';
        state.channelInfo = action.payload;
    })
    .addCase(fetchChannelInfo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
    })     
},
})



export default videoSlice.reducer;