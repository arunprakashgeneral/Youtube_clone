import React, { useEffect } from 'react'
import moment from 'moment'
import numeral from 'numeral'
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@mui/icons-material/ThumbDownOutlined';
import ShowMoreText from 'react-show-more-text';
import { useDispatch, useSelector } from 'react-redux';
import { checkSubscriptionStatus, fetchChannelDetails, selectChannel, selectSubscriptionStatus } from './redux/channelSlice';

const VideoMetaData = ({video,videoId}) => {

  const dispatch = useDispatch()

  const channel = useSelector(selectChannel)
  const subscriptionStatus = useSelector(selectSubscriptionStatus)

  useEffect(()=>{
   dispatch(fetchChannelDetails(video[0]?.snippet?.channelId))
   dispatch(checkSubscriptionStatus(video[0]?.snippet?.channelId))
  },[dispatch,video[0]?.snippet?.channelId])
  
  return (
    <main>
        <section className=''>
            <h5 className='m-2'>{video[0]?.snippet?.title}</h5>
            <div className='flex justify-between m-2'>
              <span>
                {numeral(video[0]?.statistics?.viewCount).format('0.a')}views •
                {moment(video[0]?.snippet?.publishedAt).fromNow()}
              </span>
            <div className=''>
                <span>
                    <ThumbUpOutlinedIcon />{video[0]?.statistics?.viewCount}
                </span>
                <span>
                     <ThumbDownOutlinedIcon />
                </span>
            </div>
            </div>
            <hr />
        </section>
        <section className='flex justify-between m-2'>
          <div className='flex'>
                <img 
                  src={channel?.snippet?.thumbnails?.default?.url}
                  alt=""
                  className='rounded-full w-12'
                />
            <div className='flex flex-col m-2'>
                  <span>{video[0]?.snippet?.channelTitle}</span>
                  <span> {numeral(channel?.statistics?.subscriberCount).format('0.a')} Subscribers</span>
            </div>
            </div>
            <div className=''>
                 <button className={`rounded-md p-2 ${subscriptionStatus?'bg-gray-500':'bg-red-600'}`} >{subscriptionStatus?'Subscribed':'Subscribe'}</button>
            </div>
        </section>
        <hr />
        <section>
          <ShowMoreText
               lines={3}
               more= 'Show more'
               less='Show less'
               expanded={false}
               anchorClass='cursor-pointer text-blue-600'
               className=''
          >
               <p className='p-2'>{video[0]?.snippet?.description}</p>
             </ShowMoreText>
        </section>
    </main>
  )
}

export default VideoMetaData
