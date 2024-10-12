import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import CommentItem from '../CommentItem'
import './index.css'

const initialContainerBackgroundClassNames = [
  'amber',
  'blue',
  'orange',
  'emerald',
  'teal',
  'red',
  'light-blue',
]

// const initialCommentsList = [
//   {
//     id: uuidv4(),
//     name: 'Richard Branson',
//     comment:
//       'Thanks for being so typically supportive and such a good friend, Elon. Great to be opening up space',
//     isLiked: false,
//   },

//   {
//     id: uuidv4(),
//     name: 'Shiva Chilikeshwaram',
//     comment:
//       'Thanks for being so typically supportive and such a good friend, Elon. Great to be opening up space',
//     isLiked: false,
//   },
// ]

// Write your code here
class Comments extends Component {
  state = {
    name: '',
    comment: '',
    commentsList: [],
  }

  deleteComment = id => {
    const {commentsList} = this.state
    const filteredCommentsList = commentsList.filter(
      eachComment => eachComment.id !== id,
    )
    this.setState({commentsList: filteredCommentsList})
  }

  toggleLike = id => {
    this.setState(prevState => ({
      commentsList: prevState.commentsList.map(eachComment => {
        if (id === eachComment.id) {
          return {...eachComment, isLiked: !eachComment.isLiked}
        }
        return eachComment
      }),
    }))
  }

  onAddComment = event => {
    event.preventDefault()
    const {name, comment} = this.state
    const randomColorIndex = Math.ceil(
      Math.random() * initialContainerBackgroundClassNames.length,
    )
    const firstLetterBackgroundColor =
      initialContainerBackgroundClassNames[randomColorIndex]

    const newComment = {
      id: uuidv4(),
      name,
      comment,
      isLiked: false,
      firstLetterBackgroundColor,
    }

    if (name !== '' && comment !== '') {
      this.setState(prevState => ({
        commentsList: [...prevState.commentsList, newComment],
        name: '',
        comment: '',
      }))
    }
  }

  onChangeName = event => {
    this.setState({name: event.target.value})
  }

  onChangeComment = event => {
    this.setState({comment: event.target.value})
  }

  renderInputCommentForm = () => {
    const {name, comment} = this.state
    return (
      <form className="input-form" onSubmit={this.onAddComment}>
        <p className="instruction">Say Something about 4.0 Technologies</p>

        <input
          type="text"
          className="name-input"
          placeholder="Your Name"
          onChange={this.onChangeName}
          value={name}
        />
        <br />
        <textarea
          rows="8"
          cols="40"
          className="comment-text-container"
          placeholder="Your Comment"
          onChange={this.onChangeComment}
          value={comment}
        />
        <br />
        <button type="submit" className="comment-button">
          Add Comment
        </button>
      </form>
    )
  }

  renderComments = () => {
    const {commentsList} = this.state
    return (
      <ul className="comments-container">
        {commentsList.map(eachComment => (
          <CommentItem
            commentDetails={eachComment}
            key={eachComment.id}
            toggleLike={this.toggleLike}
            deleteComment={this.deleteComment}
          />
        ))}
      </ul>
    )
  }

  render() {
    const {commentsList} = this.state
    const commentsCount = commentsList.length
    return (
      <div className="comments-app-container">
        <div className="app-responsive-container">
          <h1 className="main-heading">Comments</h1>
          <div className="comment-section">
            {this.renderInputCommentForm()}
            <img
              src="https://assets.ccbp.in/frontend/react-js/comments-app/comments-img.png"
              alt="comments"
              className="comments-img"
            />
          </div>
          <hr className="separator" />
          <span className="comments-count">{commentsCount}</span>
          <span className="comments">Comments</span>
          {this.renderComments()}
        </div>
      </div>
    )
  }
}

export default Comments
