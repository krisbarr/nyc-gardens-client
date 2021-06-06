import React, { Component, Fragment } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Button } from 'react-bootstrap'
// import withRouter so we have access to the match route prop
import { withRouter } from 'react-router-dom'
import { gardenShow, gardenUpdate } from '../../api/gardens'
import CommentCreate from '../CommentCreate/CommentCreate'

class GardenShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      garden: null,
      updated: true
    }
  }

  componentDidMount () {
    const { user, match, msgAlert } = this.props

    gardenShow(match.params.id, user)
      .then(res => this.setState({ garden: res.data.garden }))
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
    const { garden } = this.state
    if (!garden) {
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    return (
      <Fragment>
        <div>
          <h1>Your Community Garden</h1>
          <h2>{garden.name}</h2>
          <p>{garden.borough}</p>
          <p>{garden.zipCode}</p>
          <p>{garden.comments}</p>
          <Button onClick={this.handleUpdate}>Join This Garden</Button>
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

export default withRouter(GardenShow)
