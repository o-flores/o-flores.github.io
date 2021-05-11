import React, { Component } from 'react';
import '../styles/AllPosts.css'
import Post from '../components/Post';

class AllPosts extends Component {
  render() {
    const { posts } = this.props;

    return (
      <div className='posts-container'>
        { posts.map((post) => <Post key={ post.id } post={post} />)}
      </div>
    )
  }
}

export default AllPosts;