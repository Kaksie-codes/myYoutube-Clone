import React,{ useState, useEffect } from 'react'
import ThumbUpAltOutlinedIcon from '@mui/icons-material/ThumbUpAltOutlined';
import ThumbDownOffAltOutlinedIcon from '@mui/icons-material/ThumbDownOffAltOutlined';
import moment from 'moment';
import numeral from 'numeral';
// import Image from '../../assets/nsikak.jpg'
import axios from 'axios';
import {auth} from '../../firebase'
import { useDispatch, useSelector } from 'react-redux';
import './videometadata.css'

const VideoMetaData = () => {   
    const dispatch = useDispatch(); 
    

    const { video } = useSelector(state => state.video);        
    const { snippet:{ publishedAt, channelTitle, channelId, description, title }, statistics:{ commentCount, likeCount, viewCount  } } = video;
    const { channelInfo } = useSelector(state => state.channelInfo);
    const { accessToken, userId } = useSelector(state => state.user);
    const { statistics:{ subscriberCount }, snippet } = channelInfo;
    const channel_logo = snippet.thumbnails.default.url;  
    
    const [showMore, setShowMore] = useState(false);  
    const text = description;
    const trimmedText = text.substring(0, 150);
    const shouldTrim = text.length > 150;
    

   
  return (    
    <div className='videometadata'>
        <h2>{title}</h2>       
        <div className="channel__info">
            <div className="left">
                <img src={channel_logo} alt="Account Logo"  className='channel__logo'/>
                <div className="account__info">
                    <h3>{channelTitle}</h3>
                    <p>{numeral(subscriberCount).format("0.a")} subscribers</p>
                </div>
            </div>
            <button className='btn'>Subscribe</button>
        </div>
        
        <div className="stats">
            <div className="left">
                <p>{numeral(viewCount).format("0.a")} views &bull; {moment(publishedAt).fromNow()}</p>
            </div>
            <div className="right">
                <span>
                    <ThumbUpAltOutlinedIcon size={26}/> {numeral(likeCount).format("0.a")}
                </span>
                <span>
                    <ThumbDownOffAltOutlinedIcon/>
                </span>                
            </div>
        </div>       
       {description &&
        <div className="video__description">
            <small>{shouldTrim && !showMore ? `${trimmedText}...` : text}</small>
            {shouldTrim && (
                <button onClick={() => setShowMore(!showMore)} className='btn'>
                {showMore ? 'Show Less' : 'Show More'}
                </button>
            )}              
        </div>
        }
    </div>
  )
}

export default VideoMetaData