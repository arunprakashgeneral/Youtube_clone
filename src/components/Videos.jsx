import React, { useEffect, useState } from 'react'
import request from '../api'
import moment from 'moment'
import numeral from 'numeral'
import { useNavigate } from 'react-router-dom'

const Videos = ({video}) => {
  const {id,snippet:{channelId,channelTitle,title,publishedAt,thumbnails:{medium}},contentDetails} = video
  const [views,setViews] = useState(null)
  const[duration,setDuration] = useState(null)
  const [channelIcon,setChannelIcon] = useState(null)
  const navigate = useNavigate()

  const seconds= moment.duration(duration).asSeconds()
  const _duration = moment.utc(seconds*1000).format('mm:ss')

  const _videoId = id?.videoId || contentDetails?.videoId || id
  
  useEffect(()=>{
    const getVideoInfo = async()=>{
      const {data:{items}} = await request('/videos',{
        params:{
          part:'contentDetails,statistics',
          id:_videoId
        }
      })
      setDuration(items[0].contentDetails.duration)
      setViews(items[0].statistics.viewCount)
    }
    getVideoInfo()
  },[_videoId])

  useEffect(()=>{
    const getChannelIcon = async()=>{
      const {data:{items}} = await request('/channels',{
        params:{
          part:'snippet',
          id:channelId
        }
      })
      setChannelIcon(items[0].snippet.thumbnails.default)
    }
    getChannelIcon()
  },[channelId])

  const handleVideoClick = ()=>{
    navigate(`/watch/${_videoId}`)
  }

  return (
    <section className='m-6 cursor-pointer' onClick={handleVideoClick}>
      <div className='relative'>
          <img 
              src={medium.url}
              alt="" 
              className='w-60 rounded-lg '
          
          />
          <span className='absolute right-6 bottom-1 bg-stone-700 text-white rounded-md p-0.5'>{_duration}</span>
      </div>
      <div className='flex'>
      <img 
             src={channelIcon?.url} alt="" 
             className='w-8 rounded-2xl m-2'
        
        />
        <span className='line'>{title}</span>        
      </div>
      <span className='ml-12 line '>{video.snippet.channelTitle}</span>  
      <div className='ml-12'>
          <span> {numeral(views).format('0.a')}views •</span> 
          <span className=''> {moment(publishedAt).fromNow()}</span>
      </div>
    </section>
  )
}

export default Videos
