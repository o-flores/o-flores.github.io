import React, { Component } from 'react';
import '../styles/allPosts.css'
import Post from '../components/Post';

class AllPosts extends Component {
  render() {
    const { posts } = this.props;

    if (this.props.posts.length === 0) {
      return (
        <div>COE RAPAZIADA</div>
      )
    }
    
    return (
      <div className='posts-container'>
        { posts.map((post) => <Post
        key={ post.id } 
        post={post}
        back = { false }
        details={ true }
        />)}
      </div>
    )
  }
}

export default AllPosts;