import React, { useEffect } from 'react'
import Videos from "../components/Videos"
import { useDispatch, useSelector } from 'react-redux'
import { fetchPopularVideos, selectLoading, selectVideos } from '../components/redux/homeSlice'
import SkeletonVideo from '../components/SkeletonVideo'


const HomeScreen = () => {
  const dispatch  = useDispatch()
  const videos  = useSelector(selectVideos)
  const loading = useSelector(selectLoading)

  useEffect(()=>{
    dispatch(fetchPopularVideos())
  },[dispatch])


  return (
      <section className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-16'>
        {!loading
           ? videos.map((video)=> <Videos video ={video} key={video.id}/>)
          : [...Array(20).map(()=>(
            <SkeletonVideo />
          ))]
        }   
      </section>
  )
}


export default HomeScreen
