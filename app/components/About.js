import React from "react";
import { Link } from 'react-router'

export default React.createClass({
  render: function() {
    return (
      <div>
        About, {this.props.name}!
        <Link to="/">Back to home</Link>
      </div>
    );
  }
});