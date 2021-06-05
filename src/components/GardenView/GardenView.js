import React, { Component, Fragment } from 'react'
// import { Button } from 'react-bootstrap'
// import { gardenCreate } from '../../api/gardens'
import Spinner from 'react-bootstrap/Spinner'
import GardenCreate from '../GardenCreate/GardenCreate'

class GardenView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      garden: {
        parksId: props.parksId,
        name: props.name,
        borough: props.borough,
        zipCode: props.zipCode,
        members: [],
        comments: []
      }
    }
  }
  componentDidMount () {
    // const { user, match, msgAlert } = this.props
    // .then(() => msgAlert({
    //   heading: 'This is your community garden',
    //   message: 'Thanks for being a part of NYC Gardens!',
    //   variant: 'success'
    // }))
    // .catch(error => {
    //   msgAlert({
    //     heading: 'That didn\'t work',
    //     message: 'Failed to show this garden ' + error.message,
    //     variant: 'danger'
    //   })
    // })
  }
  render () {
    const { viewGarden, user, createdGardens, msgAlert } = this.props
    console.log(viewGarden)
    if (!viewGarden) {
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
          <h2>{viewGarden.gardenname}</h2>
          <p>{viewGarden.borough}</p>
          <p>{viewGarden.zipcode}</p>
        </div>
        <GardenCreate
          user={user}
          viewGarden={viewGarden}
          createdGardens={createdGardens}
          msgAlert={msgAlert}
          parksId={viewGarden.parksid}
          name={viewGarden.gardenname}
          borough={viewGarden.borough}
          zipCode={viewGarden.zipcode} />
      </Fragment>
    )
  }
}

export default (GardenView)
