import React from 'react'
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import SubscriptionsOutlinedIcon from '@mui/icons-material/SubscriptionsOutlined';
import ThumbUpOutlinedIcon from '@mui/icons-material/ThumbUpOutlined';
import HistoryOutlinedIcon from '@mui/icons-material/HistoryOutlined';
import PlaylistPlayOutlinedIcon from '@mui/icons-material/PlaylistPlayOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';
import { Link } from 'react-router-dom';

const Sidebar = ({sidebar}) => {
  return (
    <div className={`w-1/5  medium h-screen sticky top-10 ${sidebar? 'small': ''}`}>
      <ul >
        <Link to='/'>
             <li className='my-6'><HomeOutlinedIcon /><span className='medium mx-6'>Home</span></li>
        </Link>
            <li className='my-6'><SubscriptionsOutlinedIcon /><span className='medium mx-6'>Subscriptions</span></li>
            <li className='my-6'><ThumbUpOutlinedIcon /><span className='medium mx-6'>Liked Videos</span></li>
            <li className='my-6'><HistoryOutlinedIcon /><span className='medium mx-6'>History</span></li>
            <li className='my-6'><PlaylistPlayOutlinedIcon /><span className='medium mx-6'>Playlists</span></li>
            <hr className='border-2 ' />
            <li className='my-8'><LogoutOutlinedIcon /><span className='medium mx-6'>Logout</span></li>
            <hr className='border-2' />
      </ul>
    </div>
  )
}

export default Sidebar
