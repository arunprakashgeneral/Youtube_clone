import React, { useEffect } from 'react'
import VideoHorizontal from '../components/VideoHorizontal'
import VideoMetaData from '../components/VideoMetaData'
import Comments from '../components/Comments'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchSelectedVideo, selectLoading, selectVideo } from '../components/redux/selectedVideoSlice'
import { fetchRelatedVideos, selectVideos } from '../components/redux/homeSlice'

const WatchScreen = () => {
  const {id} = useParams()
  const dispatch = useDispatch()

  const video = useSelector(selectVideo)
  const loading = useSelector(selectLoading)
  const videos = useSelector(selectVideos)

  
  useEffect(()=>{
   dispatch(fetchSelectedVideo(id))
   dispatch(fetchRelatedVideos(id))
  },[dispatch,id])

  return (
    <main className='flex mt-16'>
        <section className='w-2/3 '>
        <iframe 
            className='rounded-xl'
            width="100%" 
            height="20%" 
            src={`https://www.youtube.com/embed/${id}`} 
            title={video?.snippet?.title} 
            allowFullScreen
        ></iframe>
        {
          !loading ? <VideoMetaData video={video} videoId = {id} key={id}/> : <h6>Loading...</h6>
        }
        <Comments id={id}/>
        </section>
        <section className='w-1/3'>
          {!loading && videos?.filter(video=>video.snippet)
          .map((video,i)=> <VideoHorizontal video = {video} key = {i}/>)}
        </section>
    </main>
  )
}

export default WatchScreen
