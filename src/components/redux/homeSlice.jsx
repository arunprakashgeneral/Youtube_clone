import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import request from "../../api";

const initialState={
    videos:[],
    loading:false,
    nextPageToken:null,
    activeCategory:'All',
    error:null
}

export const fetchPopularVideos = createAsyncThunk('home/fetchPopularVideos', async()=>{
    const {data} = await request.get('/videos',{
        params:{
            part:'snippet,contentDetails,statistics',
            chart:'mostPopular',
            regionCode:'IN',
            maxResults:50,
        }
    })
    const videoDetails= {
        video:data.items,
        }
    return videoDetails
})

export const fetchVideosByCategories = createAsyncThunk('categories/fetchVideosByCategories',async(item)=>{
    const {data} =  await request.get('/search',{
        params:{
            part:'snippet',
            maxResults:50,
            q:item,
            type:'video',
        }
    })
    const videoDetails= {
        video:data.items,
        activeCategory:item
        }
    return videoDetails
})

export const fetchRelatedVideos = createAsyncThunk('fetchRelatedVideos',async(id)=>{
    try {
        const {data} =  await request.get('/search',{
            params:{
                part:'snippet',
                maxResults:20,
                relatedtovideoId:id,
                type:'video',
            }
        })
        return data.items 
    } catch (error) {
        return error.message
    } 
})

export const fetchSearchedVideos = createAsyncThunk('fetchSearchedVideos',async(item)=>{
    try {
        const {data} =  await request.get('/search',{
            params:{
                part:'snippet',
                maxResults:50,
                q:item,
                type:'video,channel',
            }
        })
        return data.items
    } catch (error) {
        return error.message
    }
})

export const fetchVideosOfChannel = createAsyncThunk('videosOfChannel',async(channelId)=>{
    try {
        const {data} = await request.get('/channels',{
            params:{
                part:'contentDetails',
                id:channelId
            }
        })
        const uploadPlaylistId = data.items[0].contentDetails.relatedPlaylists.uploads
        try {
            const {data} = await request.get('/playlistItems',{
                params:{
                    part:'contentDetails,snippet',
                    playlistId:uploadPlaylistId,
                    maxResults:30
                }
            })
            return data.items
        } catch (error) {
            return(error.response.data);
        }
    } catch (error) {
        return(error.response.data);
    }
})


const homeSlice = createSlice({
    name:'home',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder
          .addCase(fetchPopularVideos.fulfilled,(state,action)=>{
               const{payload:{video}} = action
               state.loading= false
               state.videos=(video) 
          })
          .addCase(fetchPopularVideos.pending,(state,action)=>{
            state.loading= true
          })
           .addCase(fetchVideosByCategories.fulfilled,(state,action)=>{
            const{video,activeCategory} = action.payload
            state.loading =false
            state.videos=(video) 
            state.activeCategory= activeCategory
           })
           .addCase(fetchVideosByCategories.pending,(state,action)=>{
            state.loading=true
           })
           .addCase(fetchRelatedVideos.pending,(state,action)=>{
            state.loading = true
           })
           .addCase(fetchRelatedVideos.fulfilled,(state,action)=>{
            state.videos = action.payload
            state.loading = false
           })
           .addCase(fetchRelatedVideos.rejected,(state,action)=>{
            state.error= action.payload
           })
           .addCase(fetchSearchedVideos.fulfilled,(state,action)=>{
            state.videos = action.payload
            state.loading = false
           })
           .addCase(fetchSearchedVideos.pending,(state,action)=>{
            state.loading = true
           })
           .addCase(fetchSearchedVideos.rejected,(state,action)=>{
            state.error= action.payload
           }) 
           .addCase(fetchVideosOfChannel.fulfilled,(state,action)=>{
            state.videos = action.payload
            state.loading = false
           })
           .addCase(fetchVideosOfChannel.pending,(state,action)=>{
            state.loading = true
           })
           .addCase(fetchVideosOfChannel.rejected,(state,action)=>{
            state.error= action.payload
           })
    }
})

export default homeSlice.reducer
export const selectVideos = (state)=> state.home.videos
export const selectLoading = (state)=>state.home.loading