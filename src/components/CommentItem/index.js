// Write your code here
import './index.css'
import {formatDistanceToNow} from 'date-fns'

const CommentItem = props => {
  const {commentDetails, toggleLike, deleteComment} = props
  const {
    name,
    comment,
    isLiked,
    id,
    firstLetterBackgroundColor,
  } = commentDetails

  const onClickLikeIcon = () => {
    toggleLike(id)
  }

  const timeDistance = formatDistanceToNow(new Date())
  const firstLetter = name[0].toUpperCase()
  const likeIcons = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const toggleLikeClassName = isLiked ? 'liked' : ''
  const onDeleteComment = () => {
    deleteComment(id)
  }

  return (
    <>
      <li className="comment-item">
        <div className="letter-and-button">
          <h1 className={`first-letter ${firstLetterBackgroundColor}`}>
            {firstLetter}
          </h1>
          <button
            type="button"
            className="like-button"
            onClick={onClickLikeIcon}
          >
            <img src={likeIcons} alt="like" className="like-img" />
          </button>
        </div>
        <div className="name-comment-like-time">
          <div className="name-and-time">
            <h1 className="name">{name}</h1>
            <p className="time">{timeDistance}</p>
          </div>
          <p className="comment">{comment}</p>
          <p className={`like ${toggleLikeClassName}`}>Like</p>
        </div>
        <button
          type="button"
          className="delete-button"
          onClick={onDeleteComment}
          data-testid="delete"
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png"
            alt="delete"
            className="delete-icon"
          />
        </button>
      </li>
      <hr className="separator" />
    </>
  )
}

export default CommentItem
