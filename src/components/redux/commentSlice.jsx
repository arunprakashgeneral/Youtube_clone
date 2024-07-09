import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../api";


const initialState ={
    comment:null,
    loading:false
}

export const fetchComment = createAsyncThunk('comment/fetchComment',async(id)=>{
const {data} = await request.get('/commentThreads',{
    params:{
        part:'snippet',
        videoId:id
    }
})
return data.items
})



const commentSlice = createSlice({
   name:'comment',
   initialState,
   reducers:{},
   extraReducers:(builder)=>{
        (builder)
          .addCase(fetchComment.fulfilled,(state,action)=>{
            state.loading=false
            state.comment= action.payload
          })
          .addCase(fetchComment.pending,(state,action)=>{
            state.loading=true
          })
   }

})
export default commentSlice.reducer
export const selectComment = (state)=>state.comment.comment
export const selectLoading = (state)=>state.comment.loading