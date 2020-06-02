import React, { useEffect, useState } from 'react';
import Post from './Post';
import axios from 'axios';

const PostList = () => {
  const [ posts, setPosts ] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/posts')
      .then(res => setPosts(res.data))
      .catch(err => console.log(err))
  }, [])

  return (
    <div>
      {posts.map(post => {
        return <Post {...post} />
      })}
    </div>
  );
}

export default PostList;