import React ,{useEffect,}from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import {fetchSearchedVideos,selectVideos,selectLoading} from '../components/redux/homeSlice'
import VideoHorizontal from '../components/VideoHorizontal'
import SkeletonVideo from '../components/SkeletonVideo';

const SearchScreen = () => {
  const {query} = useParams()
  const dispatch = useDispatch()
  const videos = useSelector(selectVideos)
  const loading = useSelector(selectLoading)

 useEffect(()=>{
 dispatch(fetchSearchedVideos(query))
 },[dispatch,query])

  return (
    <div className='mt-16'>
     {
      !loading?
       videos.map((video,i)=><VideoHorizontal video = {video} key={i}/>)
       : [...Array(20).map(()=>(
        <SkeletonVideo />
      ))]
     }
    </div>
  )
}

export default SearchScreen