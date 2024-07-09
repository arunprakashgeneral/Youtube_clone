import React from 'react'
import moment from 'moment'
import ShowMoreText from 'react-show-more-text';

const Comment = ({comment}) => {

  return (
   <section className='flex grow p-2 border-b-2'>
      <img 
            src={comment?.snippet?.topLevelComment?.snippet?.authorProfileImageUrl
            }
            alt="" 
            className='rounded-full mr-3 w-12 object-contain'
        />
      <div>
         <p>
            {comment?.snippet?.topLevelComment?.snippet?.authorDisplayName} • {moment(comment?.snippet?.topLevelComment?.snippet?.publishedAt).fromNow()}
         </p> 
         <ShowMoreText
               lines={3}
               more= 'Show more'
               less='Show less'
               expanded={false}
               anchorClass='cursor-pointer text-blue-600'
               className=''
          >
         <p className=''>{comment?.snippet?.topLevelComment?.snippet?.textDisplay} </p> 
       </ShowMoreText>  
      </div>
   </section>
  )
}

export default Comment
