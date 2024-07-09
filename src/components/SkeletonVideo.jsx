import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'


const SkeletonVideo = () => {
  return (
    <div className='w-full mx-0 my-4'>
      <SkeletonTheme  color='#343a40' highlightColor='#3c4147'>
        <Skeleton height={180} />
        <div>
            <Skeleton
                style={{margin:'0.5rem'}}
                circle
                height={40}
                width={40}
            />
            <Skeleton height={40} width='75%' />    
        </div>
      </SkeletonTheme>
    </div>
  )
}

export default SkeletonVideo
