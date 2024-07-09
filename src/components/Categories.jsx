
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { fetchPopularVideos,fetchVideosByCategories } from './redux/homeSlice'

const categoriesList = ['All','ReactJS','Redux','JavaScript','TamilMovie','Cricket','Music','AngularJS' ,'HTML','CSS','Vijaysong','PewDiePie','plip plip','Temple Monkeys']

const Categories = () => {
  const dispatch= useDispatch()
  const [activeElement,setActiveElement] = useState('All')
  
  const handleClick=(item)=>{
    setActiveElement(item)
    if(item==='All'){
      dispatch(fetchPopularVideos())
    }else{
      dispatch(fetchVideosByCategories(item))
    }
  }

  return (
    <div className='overflow-x-scroll scroll relative top-14 bg-white'>
      {categoriesList.map((item,i)=>
            <span  
                    key={i} 
                    className={`border-2 rounded-xl whitespace-nowrap px-4  m-4  cursor-pointer ${activeElement===item?'active':''}`}
                    onClick={()=>handleClick(item)}
            >{item}</span>)}
    </div>
  )
}
export default Categories
