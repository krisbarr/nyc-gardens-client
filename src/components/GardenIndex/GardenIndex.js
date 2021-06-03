import React, { Component } from 'react'
import { Card } from 'react-bootstrap'
// import Button from 'react-bootstrap/Button'
// import { Link } from 'react-router-dom'
// import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import { gardenIndex } from '../../api/gardens'
import GardenCreate from '../GardenCreate/GardenCreate'

class GardenIndex extends Component {
  constructor (props) {
    super(props)

    // keep track of the gardens in our application
    // initially they will be null until we have fetched them from the api
    this.state = {
      gardens: null
    }
  }
  componentDidMount () {
    gardenIndex(11221)
      .then(res => this.setState({ gardens: res.data }))
  }

  render () {
    // destructure our gardens state
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
        <Card bg="secondary" key={garden.parksid} style={{ width: '16rem', margin: 8 }}>
          {/* <Card.Img variant='top' src={garden.backgroundUrl}/> */}
          <Card.Body>
            <Card.Title>{garden.gardenname}</Card.Title>
            <Card.Text>{garden.borough}</Card.Text>
            <Card.Text>{garden.zipcode}</Card.Text>
            <GardenCreate
              parksId={garden.parksid}
              name={garden.gardenname}
              borough={garden.borough}
              zipCode={garden.zipcode}
              user={this.props.user}
              msgAlert={this.props.msgAlert}
            />
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

export default GardenIndex
