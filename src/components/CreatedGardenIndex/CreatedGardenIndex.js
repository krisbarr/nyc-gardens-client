import React, { Component } from 'react'
import { Card, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { createdGardenIndex } from '../../api/gardens'
// import GardenView from '../GardenView/GardenView'

class CreatedGardenIndex extends Component {
  constructor (props) {
    super(props)

    // keep track of the gardens in our application
    // initially they will be null until we have fetched them from the api
    this.state = {
      gardens: null,
      createdGardens: null
    }
  }
  componentDidMount () {
    createdGardenIndex()
      .then(res => this.setState({ gardens: res.data.gardens }))
  }
  render () {
    // destructure our gardens state
    console.log('these are createdGardens', this.props.createdGardens)
    const { gardens } = this.state
    // if we haven't fetched any gardens yet from the API
    if (!gardens) {
      // A Spinner is just a nice loading message we get from react bootstrap
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }
    const cardContainerLayout = {
      display: 'flex',
      justifyContent: 'center',
      flexFlow: 'row wrap'
    }
    const gardenCards = gardens.map(garden => {
      return (
        <Card bg="secondary" key={garden._id} style={{ width: '16rem', margin: 8 }}>
          {/* <Card.Img variant='top' src={garden.backgroundUrl}/> */}
          <Card.Body>
            <Card.Title>{garden.name}</Card.Title>
            <Card.Text>{garden.zipCode}</Card.Text>
            <Card.Text>{garden.borough}</Card.Text>
            <Link to={`/gardens/${garden._id}`}>
              <Button>View This Garden</Button>
            </Link>
          </Card.Body>
        </Card>
      )
    })
    return (
      <div style={cardContainerLayout}>
        { gardenCards }
      </div>
    )
  }
}
// <Button onClick={this.handleClick}>Check out our Gardens</Button>
export default CreatedGardenIndex
