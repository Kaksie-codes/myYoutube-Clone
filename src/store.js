import { configureStore } from "@reduxjs/toolkit";
import userReducer from './features/userSlice'
import videoReducer from "./features/videoSlice";
import channelInfoReducer from "./features/channelInfoSlice";
import categoryReducer from "./features/categorySlice";

export const store = configureStore({
    reducer:{
        user: userReducer,
        video: videoReducer,
        channelInfo: channelInfoReducer,
        category: categoryReducer
    }
})