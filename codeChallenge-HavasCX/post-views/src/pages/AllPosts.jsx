import React, { Component } from 'react';
import '../styles/allPosts.css'
import Post from '../components/Post';
import Loading from '../components/Loading';

class AllPosts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      search: '',
    }
  }

  componentDidUpdate(prevProps){
    if(prevProps.posts !== this.props.posts){
      this.setState({posts: this.props.posts})
    }
  }

  handleChange = (event) => {
    const { value } = event.target;
    this.setState({ search: value }, () => {
      const { posts } = this.props;
      const filteredPosts = posts.filter((post) => {
        return post.body.includes(value)
          || post.title.includes(value);
      });
      this.setState({ posts: filteredPosts })
    });
  }

  render() {
    console.log('render');

    const { posts } = this.state;

    if (this.props.posts.length === 0) {
      return (
        <Loading />
      )
    }

    return (
      <main>
        <div className='input'>
          <label htmlFor="search">
            <input onChange={this.handleChange} type='text' name='search'></input>
            Search
          </label>
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

export default AllPosts;