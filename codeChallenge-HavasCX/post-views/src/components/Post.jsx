import React, { Component } from 'react';
import '../styles/post.css'
import { Link } from 'react-router-dom'

class Post extends Component {
 
  render() {
    const { id, title, body } = this.props.post;
    const { back, details } = this.props;
    return (
      <div className='post-container'>
        <div className='post'>
          <h2>{title}</h2>
          <p>{body}</p>
          <div className='links'>
            {back && <Link className='link' to='/' >Voltar</Link>}
            {details && <Link className='link' to={`/post/${id}`}>Saiba mais</Link>}
          </div>
        </div>
      </div>
    )
  }
}

export default Post;