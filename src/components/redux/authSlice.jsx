import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { auth } from '../../firebase'
import  {GoogleAuthProvider,signInWithPopup}  from 'firebase/auth'

const initialState ={
    accessToken:'',
    displayName:'',
    photoURL:'',   
    status:'idle',
    error:''
}

export const fetchUser = createAsyncThunk('user/fetchUser',async()=>{
        const provider = new GoogleAuthProvider()
        provider.addScope('https://www.googleapis.com/auth/youtube.force-ssl','https://www.googleapis.com/auth/youtube.readonly')
        const response = await signInWithPopup(auth,provider)
        const userData = {
            accessToken:response.user.accessToken,
            displayName:response.user.displayName,
            photoURL:response.user.photoURL            
        }
        return userData
})

const authSlice = createSlice({
    name:'auth',
    initialState,
    reducers:{}, 
    extraReducers:(builder)=>{
        builder
        .addCase(fetchUser.fulfilled,(state,action)=>{
            const{accessToken,displayName,photoURL} = action.payload
                 state.status = 'succeeded'
                 state.accessToken= accessToken
                 state.displayName= displayName
                 state.photoURL= photoURL             
          })
        .addCase(fetchUser.pending,(state)=>{
                state.status='loading'
        })  
        .addCase(fetchUser.rejected,(state,action)=>{
                state.status='failed'
                state.error=action.error.message
        })
    }
})

export default  authSlice.reducer
export const selectAccessToken = (state)=>state.auth.accessToken
export const selectDisplayName = (state)=>state.auth.displayName
export const selectPhotoURL = (state)=>state.auth.photoURL
