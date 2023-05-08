import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios';

const api_key = import.meta.env.VITE_MY_API_KEY;
export const fetchDefaultVideo = createAsyncThunk(
    'video/fetchDefaultVideo',
    async (id) => {
        try{
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${api_key}`);
            // console.log('defaultVideo >>>', response.data.items[0])
            return response.data.items[0];
        }catch(err){
            console.log(err)
        } 
    }
  );
export const fetchComments = createAsyncThunk(
    'video/fetchComments',
    async (id) => {
        try{
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/commentThreads?part=snippet,replies&videoId=${id}&key=${api_key}&maxResults=100`);
            // console.log('comments >>>', response.data.items)
            return response.data.items;
        }catch(err){
            console.log(err)
        } 
    }
  );
export const fetchRelatedVideos = createAsyncThunk(
    'video/fetchRelatedVideos',
    async (id) => {
        try{
            const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&relatedToVideoId=${id}&type=video&maxResults=50&key=${api_key}`);
            // console.log('related videos >>>', response.data.items)
            return response.data.items;
        }catch(err){
            console.log(err)
        } 
    }
  );


const initialState = {
    video: null, 
    comments: null,
    relatedVideos: null,  
    status: 'idle',
    error: null,
}

const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers:{

    },
extraReducers: (builder) => {
    builder
    .addCase(fetchDefaultVideo.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(fetchDefaultVideo.fulfilled, (state, action) => {
        // console.log(action);
        state.status = 'succeeded';
        state.video = action.payload;
    })
    .addCase(fetchDefaultVideo.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
    })   
    .addCase(fetchComments.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(fetchComments.fulfilled, (state, action) => {
        // console.log("comments",action);
        state.status = 'succeeded';
        state.comments = action.payload;
    })
    .addCase(fetchComments.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
    })   
    .addCase(fetchRelatedVideos.pending, (state) => {
        state.status = 'loading';
    })
    .addCase(fetchRelatedVideos.fulfilled, (state, action) => {
        // console.log(action);
        state.status = 'succeeded';
        state.relatedVideos = action.payload;
    })
    .addCase(fetchRelatedVideos.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
    })   
},
})



export default videoSlice.reducer;