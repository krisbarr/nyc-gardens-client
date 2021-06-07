import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { gardenCreate } from '../../api/gardens'
import { Redirect, Link } from 'react-router-dom'

class GardenCreate extends Component {
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
      },
      gardenId: null

    }
  }
  handleClick = event => {
    event.preventDefault()

    const { user, msgAlert } = this.props
    const garden = this.props
    // , createdGardens
    // console.log(garden.parksId)
    // console.log('these are createdGardens', createdGardens[0])
    // console.log(createdGardens)
    const chosenGarden = this.props.createdGardens.gardens.find(({ parksId }) => parksId === garden.parksId)
    console.log('this is chosenGarden', chosenGarden)
    if (!chosenGarden) {
      // const chosenGarden = createdGardens.gardens.find(garden => garden.parksId.some(parksId => parksId === garden.parksId))
      gardenCreate(garden, user)
        .then(res => {
          this.setState({ gardenId: res.data.garden._id })
          return res
        })
        .then(res => msgAlert({
          heading: 'Garden Joined Successfully!',
          message: 'You are now a member',
          variant: 'success'
        }))
        .catch(error => {
          msgAlert({
            heading: 'Sorry, that didnt work!',
            message: 'Could not join this garden ' + error.message,
            variant: 'danger'
          })
        })
    } else {
      this.setState({ gardenId: chosenGarden._id })
    }
  }
  render () {
    const { gardenId } = this.state
    if (gardenId) {
      return <Redirect to={`/gardens/${gardenId}`}/>
    }
    const user = this.props.user
    if (user) {
      return (
        <div>
          <Link to={`/gardens/${gardenId}`}>
            <Button onClick={this.handleClick}>Join This Garden</Button>
          </Link>
        </div>
      )
    } else if (!user) {
      return null
    }
  }
}

export default GardenCreate
