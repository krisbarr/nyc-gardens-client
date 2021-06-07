import React, { Component, Fragment } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Button } from 'react-bootstrap'
// import withRouter so we have access to the match route prop
import { withRouter, Redirect } from 'react-router-dom'
import { gardenShow, gardenUpdate } from '../../api/gardens'
import CommentCreate from '../CommentCreate/CommentCreate'

class GardenShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      garden: null,
      updated: true,
      user: null
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props

    gardenShow(match.params.id, user)
      .then(res => this.setState({ garden: res.data.garden }))
      .then(this.setState({ user: user }))
      .then(() => msgAlert({
        heading: 'This is your community garden',
        message: 'Thanks for being a part of NYC Gardens!',
        variant: 'success'
      }))

      .catch(error => {
        msgAlert({
          heading: 'That didn\'t work',
          message: 'Failed to show this garden ' + error.message,
          variant: 'danger'
        })
      })
  }
  handleUpdate = (event) => {
    const { msgAlert, match, user } = this.props
    // make a patch request
    gardenUpdate(match.params.id, user)
      // set the updated variable to true, to redirect to the purchases page in render
      .then(res => this.setState({ updated: true }))
      .then(() => msgAlert({
        heading: 'You Have Joined This Garden Successfully!',
        message: 'Your are now a member',
        variant: 'success'
      }))
      .catch(error => {
        msgAlert({
          heading: 'Sorry, that didn\'t work',
          message: 'Failed with error: ' + error.message,
          variant: 'danger'
        })
      })
  }

  render () {
    const { garden, user } = this.state
    console.log('this is the user down here', user)
    if (!garden) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    if (user === null) {
      return <Redirect to='/sign-in' />
    }
    const member = garden.members.find(member => member === user._id)
    if (!member) {
      return (
        <Fragment>
          <div>
            <h1>Your Community Garden</h1>
            <h2>{garden.name}</h2>
            <p>{garden.borough}</p>
            <p>{garden.zipCode}</p>
            { garden &&
                  garden.comments.map(comment => {
                    return (
                      <section key={comment.title}>
                        <p>{comment.title}</p>
                        <p>{comment.body}</p>
                      </section>
                    )
                  })
            }
            <Button onClick={this.handleUpdate}>Join This Garden</Button>
          </div>
        </Fragment>
      )
    } else {
      return (
        <Fragment>
          <div>
            <h1>Your Community Garden</h1>
            <h2>{garden.name}</h2>
            <p>{garden.borough}</p>
            <p>{garden.zipCode}</p>
            { garden &&
                  garden.comments.map(comment => {
                    return (
                      <section key={comment._id}>
                        <h1>{comment.title}</h1>
                        <p>{comment.body}</p>
                      </section>
                    )
                  })
            }
            <CommentCreate
              gardenId={garden._id}
              user={this.props.user}
              msgAlert={this.props.msgAlert}
            />
          </div>
        </Fragment>
      )
    }
  }
}

export default withRouter(GardenShow)
