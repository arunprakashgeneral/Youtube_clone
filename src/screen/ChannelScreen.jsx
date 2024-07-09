import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { fetchVideosOfChannel } from '../components/redux/homeSlice'
import { selectLoading, selectVideos } from '../components/redux/homeSlice'
import SkeletonVideo from '../components/SkeletonVideo'
import Videos from '../components/Videos'

const ChannelScreen = () => {

  const {channelId} = useParams()
  const dispatch = useDispatch()
  const videos = useSelector(selectVideos)
  const loading  = useSelector(selectLoading)

  useEffect(()=>{
  dispatch(fetchVideosOfChannel(channelId))
  },[channelId,dispatch])

  return (
    <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16'>
    {!loading
       ? videos.map((video,i)=> (<Videos video ={video} key={i} />))
      : [...Array(20).map(()=>(
        <SkeletonVideo />
      ))]
    }   
  </section>
  )
}

export default ChannelScreen
