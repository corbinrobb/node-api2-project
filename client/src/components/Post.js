import React from 'react';

const Post = ({ title, contents }) => {
  return (
    <div className="post">
      <h3>{title}</h3>
      <p>{contents}</p>
    </div>
  );
}

export default Post;