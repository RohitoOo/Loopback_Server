import React, { Component } from "react"
import logo from "../logo.svg"
import "../App.css"
import { BrowserRouter, Switch, Route, Redirect, Link } from "react-router-dom"
import theme from "../theme"
import User from "./User/CreateUser"

import { Grommet, Box, Text, Button } from "grommet"
import { observer, inject } from "mobx-react"
import { compose } from "recompose"
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Grommet theme={theme}>
          <Box>
            <div className="App">
              <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <Text size="medium">Rohito's Full Stack Application</Text>
              </header>
            </div>
          </Box>
          <Box>
            <Box align="center" justify="center">
              <Switch>
                <Route exact path="/" render={() => <Redirect to="/user" />} />
                <Route path="/user" component={User} />
                {/* <Route path="/partner" component={Partner} />
              <Route path="/inviteusers" component={InviteUsers} />
              <Route path="/creategateway" component={CreateGateway} /> */}
              </Switch>
            </Box>
          </Box>
        </Grommet>
      </BrowserRouter>
    )
  }
}

const AppEnhanced = compose(
  inject("userStore"),
  observer
)(App)
export default AppEnhanced
