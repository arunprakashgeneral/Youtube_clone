import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import request from "../../api";

const initialState={
    channel:null,
    loading:false,
    subscriptionStatus:false
}

export const fetchChannelDetails = createAsyncThunk('selectedVideo/fetchChannelDetails',async(id)=>{
    const {data}  = await request.get('/channels',{
        params:{
            part:'snippet,statistics,contentDetails',
            id:id
        }
    })
    return data.items[0]
})

export const checkSubscriptionStatus = createAsyncThunk('checkSubscriptionStatus',async(id,{getState})=>{
    const {data}  = await request.get('/subscriptions',{
        params:{
            part:'snippet',
            forChannelId:id,
            mine:true,
        },
        headers:{
            Authorization: `Bearer ${getState().auth.accessToken}`
        }
    })
    return (data.items.length!==0)
})

export const fetchSubscribedChannel = createAsyncThunk('fetchSubscribedChannel',async(arg,{getState})=>{
    try {
        const state = getState()
        const {data}  = await request.get('/subscriptions',{
            params:{
                part:'snippet,contentDetails',
                mine:true,
            },
            headers:{
                Authorization:`Bearer ${state.auth.accessToken}` ,
            }
        })
        return (data.items)
    }
    catch (error) {
        console.log(error.response);
        return error.response.data
    }
   
})
const channelSlice = createSlice({
    name:'channelDetails',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        (builder)
        .addCase(fetchChannelDetails.fulfilled,(state,action)=>{
            state.channel = action.payload
            state.loading= false
           })
        .addCase(fetchChannelDetails.pending,(state,action)=>{
            state.loading = true
           })
        .addCase(checkSubscriptionStatus.fulfilled,(state,action)=>{
            state.subscriptionStatus = action.payload
        }) 
        .addCase(fetchSubscribedChannel.fulfilled,(state,action)=>{
            state.loading = false
            state.channel = action.payload
        })  
        .addCase(fetchSubscribedChannel.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchSubscribedChannel.rejected,(state,action)=>{
            state.error = action.payload
        })
    }
})

export default channelSlice.reducer
export const selectChannel = (state)=>state.channelDetails.channel
export const selectLoading = (state)=>state.channelDetails.loading
export const selectSubscriptionStatus = (state)=>state.channelDetails.subscriptionStatus

