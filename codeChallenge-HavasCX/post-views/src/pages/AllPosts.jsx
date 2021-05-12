import React, { Component } from 'react';
import '../styles/allPosts.css'
import Post from '../components/Post';
import Loading from '../components/Loading';

class AllPosts extends Component {
  render() {
    const { posts } = this.props;

    if (this.props.posts.length === 0) {
      return (
        <Loading />
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