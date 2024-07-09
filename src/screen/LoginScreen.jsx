import React,{useEffect} from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { fetchUser, selectAccessToken } from '../components/redux/authSlice'
import {useNavigate} from 'react-router-dom'

const LoginScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const accessToken = useSelector(selectAccessToken)

    const handleLogin = ()=> {
        dispatch(fetchUser())
    } 

    useEffect(()=>{
      if(accessToken){
        navigate('/')
      }
    },[accessToken,navigate])

  return (
    <section className='border-2 w-3/6 m-auto mt-20 rounded-3xl p-4 flex flex-col items-center pb-10 bg-slate-100 shadow-2xl'>
        <h2 className='text-4xl font-bold'>Login</h2>
        <img 
           src="/src/assets/youtube-header.svg" 
           alt="" 
           className='w-60'
        />
        <button className='border-2 p-4 rounded-full bg-blue-300 hover:bg-blue-400 w-80' onClick={handleLogin}>Login with Google</button>        
    </section>
  )
}

export default LoginScreen
