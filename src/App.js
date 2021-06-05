import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'
import Home from './components/Home/Home'
import GardenIndex from './components/GardenIndex/GardenIndex'
import GardenView from './components/GardenView/GardenView'
import GardenShow from './components/GardenShow/GardenShow'
import { createdGardenIndex } from './api/gardens'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: [],
      viewGarden: null,
      createdGardens: null
    }
  }
  componentDidMount () {
    createdGardenIndex()
      .then(res => this.setState({ createdGardens: res.data }))
      .catch(console.error)
  }
  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  setViewGarden = (gard) => {
    this.setState({ viewGarden: gard })
  }

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/' component={Home} />
          <Route exact path='/gardens' render={() => (
            <GardenIndex setViewGarden={this.setViewGarden} msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/view-1' render={() => (
            <GardenView createdGardens={this.state.createdGardens} viewGarden={this.state.viewGarden} msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/gardens/:id' render={() => (
            <GardenShow createdGardens={this.state.createdGardens} viewGarden={this.state.viewGarden} msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
