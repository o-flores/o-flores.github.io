import Header from './components/Header';
import PostDetails from './pages/PostDetails'
import AllPosts from './pages/AllPosts'
import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
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
    this.setState({ posts: data });
  }
  render() {

    const { posts } = this.state;
    return (
      <div>
        <Header />
        <BrowserRouter>
          <Switch>
            <Route exact path='/' render={() => <AllPosts posts={ posts } /> } />
            <Route path='/post/:id' render={(props) => <PostDetails {...props} posts={ posts } />} />
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

export default App;
