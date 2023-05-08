import React, {useEffect, useState } from 'react'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import './videorow.css'
import { useNavigate } from 'react-router';
import axios from '../../axios'
import moment from 'moment/moment'
import numeral from 'numeral'


const VideoRow = ({result}) => {
  // {views, subs, description, timestamp, channel, title, image}
  const {id,snippet:{channelTitle, channelId, publishedAt, description, title, thumbnails }} = result;
  const {medium:image} = thumbnails;
  const navigate = useNavigate()
  const { videoId } = id;
  const api_key = import.meta.env.VITE_MY_API_KEY; 
  const [views, setViews] = useState(null)
  const [duration, setDuration] = useState(null)
  const [channelIcon, setChannelIcon] = useState(null);
  const [channelSubscriberCount, setChannelSubscriberCount] = useState(null)

  const seconds = moment.duration(duration).asSeconds();
  const _duration = moment.utc(seconds * 1000).format("mm:ss")

  

  useEffect(() => {
    const getVideoDetails = async() => {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails,statistics&key=${api_key}`);
          // console.log("toto",response.data.items);
        setViews(response.data.items[0].statistics.viewCount);
        setDuration(response.data.items[0].contentDetails.duration);        
          return response
        }
        getVideoDetails()
      }, [videoId])

      useEffect(() => {
        const getChannelInfo = async() => {
          const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${api_key}`);
            // console.log('channelInfo >>>', response.data.items[0].statistics.subscriberCount)
            // console.log('channelInfo >>>', response.data.items[0])
            const channelInfo = await response.data.items[0]
            setChannelSubscriberCount(channelInfo.statistics.subscriberCount)
            setChannelIcon(channelInfo.snippet.thumbnails.default)
            console.log('channelInfo >>>', channelInfo)
            return response;
        }
        getChannelInfo()
      },[channelId])

  function truncate(string, n){
    return string?.length > n ? string.substr(0, n - 1) + '...' : string;
  }

  return (
    <div className='videoRow' onClick={() => navigate(`/watch/${videoId}`)}>
        <div className="videorow__thumbnail">
          <img src={image.url} alt="thumbnail"/>  
          <p className='duration'>{_duration}</p>
        </div>
        
        <div className="videoRow__text">
            <h3>{title}</h3>
            <small className='stats'>{numeral(views).format("0.a")} views &bull; {moment(publishedAt).fromNow()} &bull; {numeral(channelSubscriberCount).format("0.a")}  subscribers </small>
            <div className="channel__description">
                <img src={channelIcon?.url} alt="" className='channel__logo'/>
                <small>{channelTitle}<CheckCircleOutlineOutlinedIcon/></small>
            </div>     
            <small>{truncate(description, 170)}</small> 
        </div>
    </div>
  )
}

export default VideoRow