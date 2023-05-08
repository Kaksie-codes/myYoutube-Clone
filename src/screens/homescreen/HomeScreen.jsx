import React, { useEffect, useState} from 'react'
import CategoriesBar from '../../components/categoriesbar/CategoriesBar';
import VideoCard from '../../components/videocard/VideoCard'
import axios from 'axios';
import { useSelector } from 'react-redux';
import './homescreen.css'
import Sidebar from '../../components/sidebar/Sidebar';

const HomeScreen = ({ sidebarOpen, handleToggleSidebar }) => {  
  const api_key = import.meta.env.VITE_MY_API_KEY;    
  const [popularVideos, setPopularVideos] = useState([]);
  const { category } = useSelector(state => state.category);  
  
  useEffect(() => {
    const fetchData = async() => {
        // let url = requests.fetchPopularVideos
        let url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&chart=mostPopular&regionCode=NG&maxResults=27&key=${api_key}`
        if(category){
          url+=`&videoCategoryId=${category}`
        }
        const request = await axios.get(url);        
        setPopularVideos(request.data.items)
        // console.log(request.data.items)
        return request;
    }

    fetchData();
    },[category])  

    // console.log(popularVideos)
  return (
    <div className='homescreen container'>      
      <div className="homescreen__content">
      <Sidebar sidebarOpen={sidebarOpen} handleToggleSidebar={handleToggleSidebar}/>   
        <div className="videos__container">
          <CategoriesBar/> 
          <div className="videos__container-content">
          {
            
            popularVideos.map((video, index) => {
              return (
                <VideoCard video={video} key={video.id}/>
              )
            })
          }    
          </div>           
        </div> 
      </div>    
         
      
    </div>
  )
}

export default HomeScreen;