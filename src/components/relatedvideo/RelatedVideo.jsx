import React, { useState, useEffect } from 'react'
import Image from '../../assets/city.jpg'
import moment from 'moment/moment'
import numeral from 'numeral'
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { useNavigate } from 'react-router';
import './relatedvideo.css'

const RelatedVideo = ({video}) => {
    const api_key = import.meta.env.VITE_MY_API_KEY;
    const navigate = useNavigate();
    const [views, setViews] = useState(null)
    const [duration, setDuration] = useState(null)       

    const {id, snippet:{channelTitle, channelId, description, publishedAt, title, thumbnails:{medium}} } = video
    
    const seconds = moment.duration(duration).asSeconds();
    const _duration = moment.utc(seconds * 1000).format("mm:ss");

    const _videoId = id?.videoId || id

    useEffect(() => {
        const getVideoDetails = async() => {
          const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${_videoId}&part=snippet,contentDetails,statistics&key=${api_key}`);
        //   console.log(response.data.items);
          setViews(response.data.items[0].statistics.viewCount);
          setDuration(response.data.items[0].contentDetails.duration)
          return response
        }
        getVideoDetails()
    }, [_videoId])

    function truncate(string, n){
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
    }
  return (
    <div className='relatedvideo' onClick={() => navigate(`/watch/${_videoId}`)}>
        <div className="thumbnail">
            <img src={medium.url} alt="thumbnail" />
            <small>{_duration}</small>
        </div>        
        <div className="relatedvideo__info">
            <small className='relatedvideo__header'>{truncate(title, 40)}</small>
            <div>
                 <small>{channelTitle} <CheckCircleIcon className="icon"/></small>
                <small>{numeral(views).format('0.a')} views  &bull; {moment(publishedAt).fromNow()}</small>
            </div>           
        </div>
    </div>
  )
} 

export default RelatedVideo