import React, { Component } from 'react';
import Loading from '../components/Loading';
import Post from '../components/Post';
import '../styles/postDetails.css';

class PostDetails extends Component {

  setPost = () => {
    const { posts } = this.props;
    const { id } = this.props.match.params
    const post = posts.find((item) => item.id === parseInt(id));
    return post;
  }

  changeFilteredPosts = () => {
    const { posts } = this.props;
    const { id } = this.props.match.params
    const AllfilteredPosts = posts.filter((item) => item.id !== parseInt(id));
    const filteredPosts = AllfilteredPosts.slice(0, 4)
    return filteredPosts;
  }

  componentDidMount() {
    this.setPost();
    this.changeFilteredPosts();
  }

  render() {

    const post = this.setPost();
    const filteredPosts = this.changeFilteredPosts();

    if (this.props.posts.length === 0) {
      return (
        <Loading/>
      )
    }

    return (
      <section>
        <section className='post-container-details'>
          <Post post={post} back={true} details={false} />
        </section>
        <section className='read-more'>
          <h2>Leia Mais</h2>
          <div className='posts-container'>
            {filteredPosts.map((post) => <Post
              key={post.id}
              post={post}
              back={false}
              details={true}
            />)}
          </div>
        </section>
      </section>
    )
  }
}

export default PostDetails;