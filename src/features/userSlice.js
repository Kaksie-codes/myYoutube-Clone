import { createSlice } from '@reduxjs/toolkit';


const profile = {
    name: null,
    photoURL: null,
    email : null,
    accessToken: null,
    userId: null
}


const userSlice = createSlice({
    name: 'user',
    initialState: profile,
    reducers:{        
        login: (state, action) => {            
            state.name = action.payload.name,
            state.photoURL = action.payload.photoURL,
            state.email = action.payload.email
            state.accessToken = action.payload.accessToken
            state.userId = action.payload.userId            
        },
        logout:(state) => {
            state.user = null;
        }
    }
})


export const { login, logout } = userSlice.actions;
export default userSlice.reducer;