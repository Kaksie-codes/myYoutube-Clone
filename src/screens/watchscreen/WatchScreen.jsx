import React, { useEffect, useState} from 'react'
import "./watchscreen.css"
import VideoMetaData from '../../components/videometadata/VideoMetaData'
import RelatedVideo from '../../components/relatedvideo/RelatedVideo'
import Comments from '../../components/comments/Comments'
import { fetchDefaultVideo, fetchComments, fetchRelatedVideos } from '../../features/videoSlice'
import { fetchChannelInfo } from '../../features/channelInfoSlice'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { Filter } from '@mui/icons-material'

const WatchScreen = () => {
  const { id } = useParams();
  const [_video, setVideo] = useState(null);
  const api_key = import.meta.env.VITE_MY_API_KEY;
  const { video, relatedVideos } = useSelector(state => state.video);
  const { channelInfo } = useSelector(state => state.channelInfo);
  const [visibleItems, setVisibleItems] = useState(10);
  
  useEffect(() => {
    const fetchVideo = async () => {
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${id}&key=${api_key}`
      );
      setVideo(response.data.items[0]);
      const channelId = response.data.items[0].snippet.channelId;
      dispatch(fetchChannelInfo(channelId))
    };
    fetchVideo();
  }, [id]);   
  
  const dispatch = useDispatch();
    useEffect(() => {
        if(id){
            dispatch(fetchDefaultVideo(id));
            dispatch(fetchComments(id)); 
            dispatch(fetchRelatedVideos(id))       
          }          
    },[id]) 

  const handleShowMoreClick = () => {
      setVisibleItems(prevVisibleItems => prevVisibleItems + 10);
  };  
    
  return (
    <div className='watchscreen'>
      <div className="watchscreen__player">
        <iframe  
          // title="MY YOUTUBE VIDEO"
          title={`_video?.snippet?.title`}
          allowFullScreen
          width="100%"
          height="430"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          // src="https://www.youtube.com/embed/tgbNymZ7vqY"
          src={`https://www.youtube.com/embed/${id}`}
          >
          
        </iframe>
        {(video && channelInfo ) && <VideoMetaData/>}
        {/* <VideoMetaData/> */}
        {id && <Comments/>}
      </div>
      <div className="watchscreen__related-videos">
        {relatedVideos &&
          relatedVideos?.filter(video => video.snippet).slice(0, visibleItems).map((video) => <RelatedVideo video={video} key={video.id.videoId}/>)
        }
        {visibleItems < relatedVideos?.length && (
            <button onClick={handleShowMoreClick} className='show__more-btn'>Show More</button>
        )}
      </div>
    </div>
  )
}

export default WatchScreen