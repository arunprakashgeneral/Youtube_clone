import { Routes,Route, useNavigate } from "react-router-dom"
import LoginScreen from "./screen/LoginScreen"
import Layout from "./components/Layout"
import HomeScreen from "./screen/HomeScreen"
import SearchScreen from "./screen/SearchScreen"
import WatchScreen from "./screen/WatchScreen"
import ChannelScreen from "./screen/ChannelScreen"
import NoPage from "./components/NoPage"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { selectAccessToken } from "./components/redux/authSlice"

function App() {

  const accessToken = useSelector(selectAccessToken)
  const navigate = useNavigate()

  useEffect(()=>{
  accessToken ? navigate('/') : navigate('/login')
  },[accessToken])

  return (    
    <div className="">  
     <Routes>
      <Route  element={<Layout />}>
        <Route path='/' element={<HomeScreen />} />
        <Route path='/search/:query' element={<SearchScreen />} />
        <Route path='/watch/:id' element={<WatchScreen />} />
        <Route path='/channel/:channelId' element={<ChannelScreen />} />
      </Route>
      <Route path='/login' element={<LoginScreen />} />    
      <Route path='/*' element= {<NoPage />} />  
     </Routes>
     </div>
  )
}

export default App
