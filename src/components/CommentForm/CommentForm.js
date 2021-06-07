import React from 'react'
import { Button } from 'react-bootstrap'
// import { Link } from 'react-router-dom'

const CommentForm = ({ comment, handleSubmit, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <label>Title</label>
    <input
      required
      placeholder='Enter Post Title'
      name='title'
      value={comment.title}
      onChange={handleChange}
    />
    <label>Post</label>
    <input
      required
      placeholder='Write your post here'
      name='body'
      value={comment.body}
      onChange={handleChange}
    />
    <Button type='submit'>Post</Button>
  </form>
)

export default CommentForm
