import React from 'react';
import '../styles/loading.css'

function Loading() {
  return (
    <div className='loading-container'>
      <div className='spin'/>
      <div>Loading...</div>
    </div>

  )
}

export default Loading;