import React, { Component, Fragment } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Button } from 'react-bootstrap'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect, Link } from 'react-router-dom'
import { commentShow, commentDelete } from '../../api/comments'

class ShowComment extends Component {
  constructor (props) {
    super(props)
    // commentDelete, commentUpdate
    // initially our commentsstate will be null, until it is fetched from the api
    this.state = {
      comment: null,
      deleted: false,
      updated: false,
      gardenId: null,
      commentId: null
    }
  }
  // , Redirect, Link
  componentDidMount () {
    const { user, match, msgAlert } = this.props
    // make a request for a single comments
    commentShow(match.params.commentId, match.params.gardenId, user)
      // set the commentsstate, to the commentswe got back in the response's data
      .then(res => this.setState({ comment: res.data.comment }))
      .then(() => this.setState({ gardenId: match.params.gardenId }))
      .then(() => this.setState({ commentId: match.params.commentId }))
      .then(() => msgAlert({
        heading: 'Here\'s Your Comment!',
        message: 'You can update or delete it here',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Showing Comment Failed',
          message: 'Failed to show comment with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  // handleUpdate = (event, shipping) => {
  //   const { user, msgAlert, match } = this.props
  //   // make a delete axios request
  //   commentsUpdate(match.params.id, user, shipping)
  //     // set the deleted variable to true, to redirect to the comments page in render
  //     .then(res => this.setState({ updated: true, comments res.data.comments}))
  //     .then(() => msgAlert({
  //       heading: 'Shipping Updated Successfully!',
  //       message: 'Your shipping preferences have been updated',
  //       variant: 'success'
  //     }))
  //     .catch(error => {
  //       msgAlert({
  //         heading: 'Shipping Update Failed',
  //         message: 'Failed with error: ' + error.message,
  //         variant: 'danger'
  //       })
  //     })
  // }
  //
  handleDelete = event => {
    const { user, msgAlert, match } = this.props
    // make a delete axios request
    commentDelete(match.params.commentId, match.params.gardenId, user)
      // set the deleted variable to true, to redirect to the comments page in render
      .then(() => this.setState({ deleted: true }))
      .then(() => this.setState({ gardenId: match.params.gardenId }))
      .then(() => msgAlert({
        heading: 'Post Successful',
        message: 'Your message posted',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Post Failed',
          message: 'Failed with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { comment, deleted, gardenId, commentId } = this.state
    console.log(comment)

    // if we don't have a comment yet
    if (!comment) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    // if the comment is deleted
    if (deleted) {
      // redirect to the comments index page
      return <Redirect to={`/gardens/${gardenId}`} />
    }

    return (
      <Fragment>
        <div>
          <h3>Here is your post</h3>
          <h5>Item: {comment.title}</h5>
          <p>{comment.body}</p>
          <Button onClick={this.handleDelete}>Delete Post</Button>
          <Link to={`/comments/${commentId}/${gardenId}/edit`}>
            <Button>Edit Post</Button>
          </Link>
          <Link to={`/gardens/${gardenId}`}>
            <Button>View Post</Button>
          </Link>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(ShowComment)
