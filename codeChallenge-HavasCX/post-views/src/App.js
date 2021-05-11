import Header from './components/Header';
import Post from './components/Post';
import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    this.fetchPosts();
  }

  fetchPosts = async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    const data = await response.json();
    console.log(data);
    this.setState({ posts: data });
  }
  render() {

    const { posts } = this.state;
    return (
      <div>
        <Header />
        { posts.map((post) => <Post key={ post.id } infos={ post } />) }
      </div>
    )
  }
}

export default App;
