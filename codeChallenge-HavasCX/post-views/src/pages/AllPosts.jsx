import React, { Component } from 'react';
import '../styles/allPosts.css'
import Post from '../components/Post';
import Loading from '../components/Loading';
import { FaSearch } from 'react-icons/fa';
import PropTypes from 'prop-types';

class AllPosts extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      search: '',
    }
  }

  componentDidUpdate(prevProps) {
    if (prevProps.posts !== this.props.posts) {
      this.setState({ posts: this.props.posts })
    }
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ search: value }, () => {
      const { posts } = this.props;
      const filteredPosts = posts.filter((post) => {
        return post.body.toLowerCase().includes(value.toLowerCase())
          || post.title.toLowerCase().includes(value.toLowerCase());
      });
      this.setState({ posts: filteredPosts })
    });
  }

  render() {

    const { posts } = this.state;

    if (this.props.posts.length === 0) {
      return (
        <Loading />
      )
    }

    return (
      <main>
        <div className='input'>
          <input onChange={this.handleChange} type='text' name='search'></input>
          <span><FaSearch /></span>
        </div>
        <div className='posts-container'>
          {posts.map((post) => <Post
            key={post.id}
            post={post}
            back={false}
            details={true}
          />)}
        </div>
      </main>
    )
  }
}

AllPosts.propTypes = {
  posts: PropTypes.array
};


export default AllPosts;