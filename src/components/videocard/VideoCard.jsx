import React, { useEffect, useState } from 'react'
import cardImage from '../../assets/city.jpg'
import userPhoto from '../../assets/nsikak.jpg'
import axios from '../../axios'
import moment from 'moment/moment'
import numeral from 'numeral'
import { useNavigate } from 'react-router-dom'

const VideoCard = ({video}) => {
  const {id, 
    snippet:{
      channelId,
      channelTitle,
      title,
      publishedAt,
      thumbnails:{medium},},} = video;
      

      const navigate = useNavigate()
      const api_key = import.meta.env.VITE_MY_API_KEY; 
      const [views, setViews] = useState(null)
      const [duration, setDuration] = useState(null)
      const [channelIcon, setChannelIcon] = useState(null)

      const seconds = moment.duration(duration).asSeconds();
      const _duration = moment.utc(seconds * 1000).format("mm:ss")

      const _videoId = id?.videoId || id;

      function truncate(string, n){
        return string?.length > n ? string.substr(0, n - 1) + '...' : string;
      }

      useEffect(() => {
        const getVideoDetails = async() => {
          const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${_videoId}&part=snippet,contentDetails,statistics&key=${api_key}`);
          // console.log(response.data.items);
          setViews(response.data.items[0].statistics.viewCount);
          setDuration(response.data.items[0].contentDetails.duration)
          return response
        }
        getVideoDetails()
      }, [_videoId])

      useEffect(() => {
        const getChannelIcon = async() => {
          const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?id=${channelId}&part=snippet&key=${api_key}`);
          // console.log(response.data.items);
          setChannelIcon(response.data.items[0].snippet.thumbnails.default)
          return response
        }
        getChannelIcon()
      }, [channelId])

      const handleVideoClick = () => {
        // navigate('/watch/${id.videoId}')
        navigate(`/watch/${_videoId}`)
      }
  return (
    <div className='video__card' onClick={handleVideoClick}>
        <div className="thumbnail">
           <img src={medium.url} alt="thumbnail"/>
           <p>{_duration}</p>  
        </div>               
        <div className="videos__info-wrapper">
          <img src={channelIcon?.url} alt="user photo" className="user__photo"/>                  
          <div className="video__info">
            <a href="#"><p>{truncate(title, 45)}</p></a>
            <div className="video__info-stats">
              <small>{channelTitle}</small>
              <small>{numeral(views).format("0.a")} views &bull; {moment(publishedAt).fromNow()}</small>
            </div>
          </div>
        </div>  
    </div>
  )
}

export default VideoCard