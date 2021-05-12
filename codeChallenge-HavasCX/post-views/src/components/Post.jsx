import React, { Component } from 'react';
import '../styles/post.css'
import { Link } from 'react-router-dom'

class Post extends Component {
  render() {

    const { post } = this.props;
    const { id } = post


    return (
      <div className='post-container'>
          <div className='post'>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
            <Link className='link' to={`/post/${id}`}>Saiba mais</Link>
          </div>
      </div>
    )
  }
}

export default Post;