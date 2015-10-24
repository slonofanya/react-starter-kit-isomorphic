import React from "react";
import { Link } from 'react-router'

export default React.createClass({
  render: function() {
    console.log('render:Message');
    return (
      <div>
        Hello, {this.props.name} {typeof this.props.name}!
        <Link to="/about">Go to about</Link>
      </div>
    );
  }
});