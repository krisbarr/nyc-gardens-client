import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Redirect, withRouter } from 'react-router-dom'
import axios from 'axios'
import apiUrl from '../../apiConfig'

import { commentShow } from '../../api/comments'

import CommentForm from '../CommentForm/CommentForm'

class CommentUpdate extends Component {
  constructor () {
    super()

    this.state = {
      comment: null,
      updated: false,
      commentId: null,
      gardenId: null
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props
    commentShow(match.params.commentId, match.params.gardenId, user)
      .then(res => this.setState({ comment: res.data.comment }))
      .then(() => this.setState({ gardenId: match.params.gardenId }))
      .then(() => {
        msgAlert({
          heading: 'Showing Comment Successfully',
          variant: 'success',
          message: 'You can now edit the comment.'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Showing Comment Failed',
          variant: 'danger',
          message: 'Comment is not displayed due to error: ' + err.message
        })
      })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    const { user, match, msgAlert } = this.props
    const { comment } = this.state
    // const editComment = { title: comment.title, body: comment.body }
    console.log('this is the match', match)
    // commentUpdate(match.params.commentId, match.params.gardenId, comment, user)
    axios({
      url: apiUrl + '/comments/' + match.params.commentId + '/' + match.params.gardenId + '/edit',
      method: 'PATCH',
      // Add an authorization header
      headers: {
        // we need the user, so we have access to their token
        'Authorization': `Bearer ${user.token}`
      },
      // send the comment object as our data for creating a movie
      data: { title: comment.title, body: comment.body }
    })
      .then(res => this.setState({ updated: true }))
      .then(res => console.log('this is the res', res))
      .then(() => {
        msgAlert({
          heading: 'Updated Comment Successfully',
          variant: 'success',
          message: 'Comment has been updated.'
        })
      })
      .catch(err => {
        msgAlert({
          heading: 'Updating Comment Failed',
          variant: 'danger',
          message: 'Comment was not updated due to error: ' + err.message
        })
      })
  }

  // same handleChange from CommentCreate
  handleChange = event => {
    event.persist()
    this.setState(state => {
      return { comment: { ...state.comment, [event.target.name]: event.target.value }
      }
    })
  }

  render () {
    const { comment, updated, gardenId } = this.state

    // if we don't have a comment yet
    if (!comment) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    // if the comment is deleted
    if (updated) {
      // redirect to the comments index page
      return <Redirect to={`/comments/${comment._id}/${gardenId}`} />
    }

    return (
      <div>
        <h3>Edit Comment</h3>
        <CommentForm
          comment={comment}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default withRouter(CommentUpdate)
