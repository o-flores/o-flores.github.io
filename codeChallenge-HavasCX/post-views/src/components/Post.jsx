import React, { Component } from 'react';
import { Link } from 'react-router-dom'

class Post extends Component {
  render() {

    const { post } = this.props;
    const { id } = post;


    return (
      <div className='posts-container'>
          <div className='post'>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <Link to={`/post/${id}`}>Saiba mais</Link>
          </div>
      </div>
    )
  }
}

export default Post;