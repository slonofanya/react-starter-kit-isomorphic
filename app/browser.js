//import { render } from 'react-dom'
//render(require('./routes'), document.body);

var React = require('react');
var Router = require('react-router');
var {DefaultRoute, Route, Routes} = Router;
var routes = require('./routes');

Router.run(routes, Router.HistoryLocation, function(Handler) {
  React.render(<Handler/>, document.body);
});