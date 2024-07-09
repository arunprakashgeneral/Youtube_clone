import React, { useEffect, useState } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import request from '../api'
import { useNavigate } from 'react-router-dom'

const VideoHorizontal = ({video}) => {
  const{id:{videoId,
           kind},
        snippet:{publishedAt,
                 title,
                 thumbnails:{medium},
                 channelTitle,
                 channelId,
                 description
                 ,resourceId
                },} = video

 const isVideo = kind ==='youtube#video'

  const navigate = useNavigate()
  const [views,setViews] = useState(null)
  const[duration,setDuration] = useState(null)
  const [channelIcon,setChannelIcon] = useState(null)

  useEffect(()=>{
    try {
      const getVideoInfo = async(videoId)=>{
          const {data:{items}} = await request('/videos',{
            params:{
              part:'contentDetails,statistics',
              id:videoId
            }
      })
          setDuration(items[0]?.contentDetails?.duration)
          setViews(items[0]?.statistics?.viewCount)
      } 
      getVideoInfo(videoId)
    } catch (error) {
      console.log(error.message);
    }
  },[videoId])

  useEffect(()=>{
  try {
    const getChannelIcon = async()=>{
      const {data:{items}} = await request('/channels',{
        params:{
          part:'snippet',
          id:channelId,
        }
      })
      console.log(items);
      setChannelIcon(items[0].snippet.thumbnails.default)
    }
    getChannelIcon()
  } catch (error) {
    console.log(error.message);
  }
  },[channelId])

  const _channelId = resourceId?.channelId || channelId

  const handleClick = ()=>{
    {isVideo ? navigate(`/watch/${videoId}`)
           : navigate(`/channel/${_channelId}`)
    }
    
  }
  const seconds= moment.duration(duration).asSeconds()
  const _duration = moment.utc(seconds*1000).format('mm:ss')

  return (
    <main className=' p-4 flex items-center cursor-pointer'onClick={handleClick}>
      <section className='relative '>
           <img 
              src={medium?.url}
              alt="" 
              className={`object-contain  video ${isVideo ? 'rounded-xl':'rounded-full'}`} 
           />
           {isVideo &&<span className='absolute right-2 bottom-2 bg-gray-600 text-white'>{_duration}</span>}
      </section>
      <section className='m-2'>
        <p className='line'>{title}</p>
        {isVideo &&
            <div>
              {numeral(views).format('0.a')}views • 
              {moment(publishedAt).fromNow()}
            </div>
         }
        {!isVideo && <p className='mt-2'>{description}</p>}
        <div>
          {/* {!isVideo && <img src={channelIcon?.url} alt="" />} */}
        <p>
          {channelTitle}
        </p>
        </div>
      </section>
    </main>
  )
}

export default VideoHorizontal
