 import React, { useState } from 'react'
 import MenuIcon from '@mui/icons-material/Menu';
 import MicIcon from '@mui/icons-material/Mic';
 import VideoCallIcon from '@mui/icons-material/VideoCall';
 import NotificationsIcon from '@mui/icons-material/Notifications';
 import { Avatar } from '@mui/material';
import { useSelector } from 'react-redux';
import { selectPhotoURL } from './redux/authSlice';
import { useNavigate } from 'react-router-dom';

 
  const Header = ({handleToggleSidebar}) => {
  const[query,setQuery]  = useState('') 
  const navigate = useNavigate()
  const photoURL = useSelector(selectPhotoURL)

 const handleSubmit  = (e)=>{
  e.preventDefault()
  navigate(`/search/${query}`)
 }

   return (
     <header className='h-14 w-full flex justify-between fixed top-0 z-50 bg-white  '>
      <section className='flex items-center basis-1/4'>
          <MenuIcon 
              className='ml-4 cursor-pointer'
              onClick={()=>handleToggleSidebar()}
          />
          <img 
              className='w-20 object-contain mx-6 cursor-pointer'
              src="./src/assets/youtube-header.svg"  
              alt="YouTube home" 
          />
      </section>
      <section className='flex items-center basis-1/2 '>   
      <form onSubmit={handleSubmit} className='flex'>          
          <input 
             type="text"
             placeholder='Search' 
             className='border-2 outline-none w-5/6 h-8  p-4 rounded-l-3xl'
             value={query}
             onChange={e=>setQuery(e.target.value)}
          />
          <button type='submit' className='rounded-r-3xl cursor-pointer bg-slate-200'>Search</button> 
          </form>
         <MicIcon 
             className='ml-8 cursor-pointer'
         />
      </section>
      <section className='flex items-center basis-1/4 justify-end'>
         <VideoCallIcon className='cursor-pointer'/>
         <NotificationsIcon className='mx-8 cursor-pointer'/>
         <Avatar  src={photoURL} className='mr-2'/>
      </section>
       
     </header>
   )
 }
 
 export default Header
 