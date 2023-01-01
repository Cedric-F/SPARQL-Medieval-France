import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Marker extends Component {

  render() {
    const { name } = this.props;

    return (
      <div title={name} className="marker">
        <Link to={{pathname: process.env.PUBLIC_URL + '/' + name.replace(/\s/g, '_'), state: {name: name} }} tabIndex="-1"><img src={require(`../icons/Castle.webp`)} alt={name}/></Link>
      </div>
    )
  }
}

export default Marker;