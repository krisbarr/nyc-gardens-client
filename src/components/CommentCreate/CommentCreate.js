import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

import CommentForm from '../CommentForm/CommentForm'
import { commentCreate } from '../../api/comments'

class CommentCreate extends Component {
  constructor (props) {
    super(props)

    // initially our comments title and director will be empty until they are filled in
    this.state = {
      comment: {
        title: '',
        body: '',
        gardenId: this.props.gardenId
      },
      // createdId will be null, until we successfully create a comment
      createdId: null,
      gardenId: this.props.gardenId

    }
  }

  handleSubmit = event => {
    event.preventDefault()
    console.log(this.props)
    const { user, msgAlert } = this.props
    const { comment } = this.state

    // create a comment, pass it the comment data and the user for its token
    commentCreate(comment, user)
      // set the createdId to the id of the comment we just created
      // .then(res => this.setState({ createdId: res.data.comment._id }))
      .then(res => {
        this.setState({ createdId: res.data.garden.comments[0]._id })
        // pass the response to the next .then so we can show the title
        return res
      })
      .then(res => msgAlert({
        heading: 'Created Comment Successfully',
        message: `Comment has been created successfully. Now viewing ${res.data.garden.comments[0].title}.`,
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Failed to Create Comment',
          message: 'Could not create comment with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  // when an input changes, update the state that corresponds with the input's name
  handleChange = event => {
    // in react, an event is actually a SyntheticEvent
    // to ensure the properties are not set to null after handleChange is finished
    // we must call event.persist
    event.persist()

    this.setState(state => {
      // return our state changge
      return {
        // set the comment state, to what it used to be (...state.comment)
        // but replace the property with `name` to its current `value`
        // ex. name could be `title` or `director`
        comment: { ...state.comment, [event.target.name]: event.target.value }
      }
    })
  }
  // setViewComment = (comment) => {
  //   this.setState({ viewComment: comment })
  //   console.log(comment)
  // }

  render () {
    // destructure our comment and createdId state
    const { comment, createdId, gardenId } = this.state
    console.log(gardenId)

    // if the comment has been created and we set its id
    if (createdId) {
      // redirect to the comments show page
      return <Redirect to={`/comments/${createdId}/${gardenId}`}/>
    }

    return (
      <div>
        <h3>Create Comment</h3>
        <CommentForm
          comment={comment}
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    )
  }
}

export default CommentCreate
