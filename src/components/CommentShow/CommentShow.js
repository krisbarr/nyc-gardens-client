import React, { Component, Fragment } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Button } from 'react-bootstrap'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect } from 'react-router-dom'
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
      gardenId: null
    }
  }
  // , Redirect, Link
  componentDidMount () {
    const { user, match, msgAlert } = this.props
    // make a request for a single comments
    commentShow(match.params.commentId, match.params.gardenId, user)
      // set the commentsstate, to the commentswe got back in the response's data
      .then(res => this.setState({ comment: res.data.comment }))
      /// .then(() => this.setState({ gardenId: match.params.gardenId }))
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
  // http://localhost:7165/#/comments/60bc121b2b71713f5650a06e/60bc12162b71713f5650a06d
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
      .then(() => msgAlert({
        heading: 'Comment Refunded Successfully!',
        message: 'Transaction will be refunded in 3-5 business days',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Comment Refund Failed',
          message: 'Failed with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { comment, deleted } = this.state
    console.log(comment)

    // if we don't have a commentsyet
    if (!comment) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    // if the comment is deleted
    if (deleted) {
      // redirect to the comments index page
      return <Redirect to="/gardens" />
    }
    // <DropdownButton id="dropdown-basic-button" title="Shipping Options">
    //   <Dropdown.Item onClick={(event) => this.handleUpdate(event, 'Standard Shipping: (7-10 Business Days)')}>Standard Shipping: (7-10 Business Days)</Dropdown.Item>
    //   <Dropdown.Item onClick={(event) => this.handleUpdate(event, 'Priority Shipping: (3-5 Business Days)')}>Priority Shipping: (3-5 Business Days)</Dropdown.Item>
    //   <Dropdown.Item onClick={(event) => this.handleUpdate(event, 'Express Shipping: (1-2 Business Days)')}>Express Shipping: (1-2 Business Days)</Dropdown.Item>
    // </DropdownButton>
    // <Button onClick={this.handleDelete}>Get Refund</Button>
    // <Link to="/products">
    //   <Button>Buy More</Button>
    // </Link>
    // <Link to="/index-comments">
    //   <Button>View All Comments</Button>
    // </Link>

    return (
      <Fragment>
        <div>
          <h3>Here is your comment</h3>
          <h5>Item: {comment[0].title}</h5>
          <p>{comment[0].body}</p>
          <Button onClick={this.handleDelete}>Get Refund</Button>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(ShowComment)
