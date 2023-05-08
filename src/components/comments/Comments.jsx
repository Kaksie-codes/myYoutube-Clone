import React, { useEffect, useState } from 'react'
import Image from '../../assets/nsikak.jpg'
import { useSelector, useDispatch } from 'react-redux'
import './comments.css'
import Comment from '../Comment'

const Comments = () => {
    
    const {comments} = useSelector(state => state.video);
    const _comments = comments?.map(comment => comment.snippet.topLevelComment.snippet)
    const [visibleItems, setVisibleItems] = useState(5);

    function handleComment(e){
        e.preventDefault()
    }

    const handleShowMoreClick = () => {
        setVisibleItems(prevVisibleItems => prevVisibleItems + 10);
    };
    
  return (
    <div className='comments'>
        <p>12k comments</p>
        <div className="comments__form">
            <img src={Image} alt="user image" className='user__image'/>
            <form onSubmit={handleComment}>
                <input type="text" placeholder='Write a Comment...'/>
                <button>Comment</button>
            </form>
        </div>
        <div className="comments__list">
            {_comments && _comments?.slice(0, visibleItems).map((comment, index) => <Comment comment={comment} key={index}/>)}
            {visibleItems < _comments?.length && (
                <button onClick={handleShowMoreClick}>Show More</button>
              )}
        </div>
    </div>
  )
}

export default Comments