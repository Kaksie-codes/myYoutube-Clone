import React, { useEffect, useState } from 'react'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import numeral from 'numeral'
import './channelrow.css'
import axios from 'axios';

const ChannelRow = ({result}) => {
  // const {image, channel, verified, subs, noOfVideos, description} = result
  const {snippet:{channelTitle,channelId, description, publishedAt, thumbnails}} = result;
  const { default:image } = thumbnails;
  const [videoCount, setVideoCount] = useState(null);
  const [channelSubscriberCount, setChannelSubscriberCount] = useState(null)
  const api_key = import.meta.env.VITE_MY_API_KEY; 

  useEffect(() => {
    const getChannelInfo = async() => {
      const response = await axios.get(`https://www.googleapis.com/youtube/v3/channels?part=snippet,contentDetails,statistics&id=${channelId}&key=${api_key}`);
        const channelInfo = await response.data.items[0]
        setChannelSubscriberCount(channelInfo.statistics.subscriberCount)
        setVideoCount(channelInfo.statistics.videoCount)
        console.log('channelInfo >>>', channelInfo)
        return response;
    }
    getChannelInfo()
  },[channelId])
  console.log('videoCount >>>', videoCount)
  console.log('channelSubscriberCount >>>', channelSubscriberCount)
  return (
    <div className='channelRow'>
       <img src={image.url} alt="channel logo"  className='channnelRow__logo'/>
       <div className="channelRow__text">
        <h3>{channelTitle}{<CheckCircleOutlineOutlinedIcon/>}</h3>
        <small>{numeral(channelSubscriberCount).format("0.a")}  subscribers &bull; {videoCount} videos</small>
        <small>{description}</small>
       </div>
    </div>
  )
}

export default ChannelRow;