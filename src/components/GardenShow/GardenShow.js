import React, { Component, Fragment } from 'react'
import Spinner from 'react-bootstrap/Spinner'
import { Button } from 'react-bootstrap'
// import withRouter so we have access to the match route prop
import { withRouter, Link } from 'react-router-dom'
import { gardenShow } from '../../api/gardens'

class GardenShow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      garden: null
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
          <Link to="/comments">
            <Button>Write a Post</Button>
          </Link>
        </div>
      </Fragment>
    )
  }
}

export default withRouter(GardenShow)
