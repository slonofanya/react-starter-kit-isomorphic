import React from 'react';
import { Route } from 'react-router';

import Main from "./components/Main";
import About from "./components/About";

export default
<Route name="root" path="/" component={Main}>
  <Route name="root" path="about" component={About}></Route>
</Route>
;