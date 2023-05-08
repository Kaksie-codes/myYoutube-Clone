import React from 'react'
import Image from '../assets/nsikak.jpg'
import moment from 'moment'


const Comment = ({comment}) => {
  const { authorDisplayName, authorProfileImageUrl, textOriginal, publishedAt } = comment
  return (
    <div className='comment'>
        <img src={authorProfileImageUrl} alt="viewer photo" />
        <div className="comment__body">
            <p className="comment__header">
                {authorDisplayName} &bull; {moment(publishedAt).fromNow()}
            </p>
            <p>{textOriginal}</p>
        </div>
    </div>
  )
}

export default Comment