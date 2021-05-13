import React, { Component } from 'react';
import '../styles/post.css'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class Post extends Component {
 
  render() {
    const { id, title, body } = this.props.post;
    const { back, details } = this.props;
    return (
      <div className='post-container'>
        <div className='post'>
          <h2>{title}</h2>
          <p>{body}</p>
          <div className='links'>
            {back && <a className='link' href='/' >Voltar</a>}
            {details && <Link className='link' to={`/post/${id}`}>Saiba mais</Link>}
          </div>
        </div>
      </div>
    )
  }
}

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
  }),
  back: PropTypes.bool,
  details: PropTypes.bool,
};

export default Post;