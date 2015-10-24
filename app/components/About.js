import React from "react";
import { IndexLink } from 'react-router'

export default React.createClass({
  render: function() {
    console.log('render:About');
    return (
      <div>
        About, {this.props.name}!
        <IndexLink to="/">Back to Home</IndexLink>
      </div>
    );
  }
});