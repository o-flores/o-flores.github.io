import React, { Component } from 'react';
import Post from '../components/Post';

class PostDetails extends Component {
  render() {
    const { posts } = this.props;
    const { id } = this.props.match.params
    const post = posts.find((item) => item.id === parseInt(id));

    return (
      <Post post={ post } />
    )
  }
}

export default PostDetails;