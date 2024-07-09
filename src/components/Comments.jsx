import React, { useEffect, } from 'react'
import Comment from './Comment'
import { useDispatch, useSelector } from 'react-redux'
import { selectPhotoURL } from './redux/authSlice'
import { fetchComment, selectComment } from './redux/commentSlice'


const Comments = ({id}) => {
  
  const photoURL = useSelector(selectPhotoURL)
  const comments = useSelector(selectComment)
  const dispatch = useDispatch() 

  useEffect(()=>{
  dispatch(fetchComment(id))
  },[dispatch,id])

  return (
    <main>
      <hr />
      <div className="flex w-full my-2">
        <img 
            src={photoURL} 
            alt="" 
            className='rounded-full mr-3 w-12'
        />
        <form  className='flex'>
           <input 
              type="text"
              placeholder='Write a comment'
              className='grow border-none active:border-none' 
           />
           <button className='p-2 border-none bg-slate-500'>
            Comment
           </button>
        </form>
       
      </div>
      <hr />
      <div>
         {comments?.map((comment,i)=>(
            <Comment comment={comment} key={i} />
         )) }
        </div>
    </main>
  )
}

export default Comments
