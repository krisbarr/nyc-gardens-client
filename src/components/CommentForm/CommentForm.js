import React from 'react'

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
    <button type='submit'>Submit</button>
  </form>
)

export default CommentForm
