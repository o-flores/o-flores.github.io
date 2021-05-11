import React, { Component } from 'react';

class Post extends Component{
  render(){

    const { infos } = this.props;

    return(
      <div className='post-container'>
        <h1>{ infos.title }</h1>
        <p>{ infos.body }</p>
      </div>
    )
  }
}

export default Post;