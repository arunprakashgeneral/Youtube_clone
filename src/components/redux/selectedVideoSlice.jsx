import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../api";

const initialState={
    video:[],
    loading:false
}


export const fetchSelectedVideo = createAsyncThunk('selectedVideo/fetchSelectedVideo',async(id)=>{
    const {data}  = await request.get('/videos',{
        params:{
            part:'snippet,statistics',
            id:id
        }
    })
    const videoDetails = {
        video:data.items,
    }
    return videoDetails
})

const selectedVideoSlice = createSlice({
    name:'selectedVideo',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        (builder)
        .addCase(fetchSelectedVideo.fulfilled,(state,action)=>{
            const {video} = action.payload
            state.video = video
            state.loading= false
           })
           .addCase(fetchSelectedVideo.pending,(state,action)=>{
            state.loading = true
           })
    }
})

export default selectedVideoSlice.reducer
export const selectVideo = (state)=>state.selectedVideo.video
export const selectLoading = (state)=>state.selectedVideo.loading

