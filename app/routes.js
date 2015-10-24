import React from 'react'
import { Router, Route } from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

import Main from "./components/Main"
import About from "./components/About"

export default
<Router history={createBrowserHistory()}>
  <Route name="root" path="/" component={Main}></Route>
  <Route name="about" path="about" component={About}></Route>
</Router>
;