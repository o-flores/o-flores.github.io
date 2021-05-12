import React, { Component } from 'react';
import Post from '../components/Post';
import { Link } from 'react-router-dom'
import '../styles/postDetails.css'

class PostDetails extends Component {
  render() {
    const { posts } = this.props;
    const { id } = this.props.match.params
    const post = posts.find((item) => item.id === parseInt(id));

    return (
      <div className='post-container-details'>
        <Post post={post} />
        <Link className='link' to='/' >Voltar</Link>
      </div>
    )
  }
}

export default PostDetails;