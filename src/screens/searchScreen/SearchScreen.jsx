import React, { useEffect, useState } from 'react'
import TuneOutlinedIcon from '@mui/icons-material/TuneOutlined';
import './searchscreen.css'
import ChannelRow from '../../components/channelrow/ChannelRow';
import Image from '../../assets/nsikak.jpg'
import VideoRow from '../../components/videorow/VideoRow';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const SearchScreen = () => {
  const { query } = useParams();
  const [result, setResult] = useState(null)
  
  const api_key = import.meta.env.VITE_MY_API_KEY;  

  useEffect(() => {
    const fetchSearchedVideo = async() => {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=100&q=${query}&key=${api_key}`);
      const videos = await response.data.items;
      setResult(videos)
    }
    fetchSearchedVideo()    
  },[query])

  console.log(result)
  return (
    <div className='searchscreen'>
        <div className="searchscreen__filter">
            <TuneOutlinedIcon/>
            <h3>Filters</h3>
        </div>
        <hr />
        {
          result?.map(result => {
            if(result?.id.kind === 'youtube#channel'){
              return <ChannelRow result={result}/>
            }else{
              return <VideoRow result={result}/>
            } 
          })
        }
    </div>
  )
}

export default SearchScreen
