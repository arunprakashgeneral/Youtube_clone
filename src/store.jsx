import { configureStore } from "@reduxjs/toolkit";
import authReducer from './components/redux/authSlice'
import homeReducer from './components/redux/homeSlice'
import selectedVideoReducer from './components/redux/selectedVideoSlice'
import channelDetailsReducer from './components/redux/channelSlice'
import commentReducer from './components/redux/commentSlice'


const store = configureStore({
    reducer:{
       auth:authReducer,
       home:homeReducer,
       selectedVideo:selectedVideoReducer,
       channelDetails:channelDetailsReducer,
       comment:commentReducer
    }
})

export default store