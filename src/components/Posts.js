import './Posts.css';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHandPaper} from '@fortawesome/free-solid-svg-icons'

function Posts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const [clickedPosts, setClickedPosts] = useState([]);

  const handleInterestedClick = (postId) => {
    // handle logic for interested button click
    console.log(`User is interested in post ${postId}`);
    if (clickedPosts.includes(postId)) {
      setClickedPosts(clickedPosts.filter(id => id !== postId));
    } else {
      setClickedPosts([...clickedPosts, postId]);
    }
  };

  return (
    <div className="posts">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <img src="https://picsum.photos/600/400" alt="Post" />
          <p>{post.body}</p>
          <button
            className={`interested-btn${clickedPosts.includes(post.id) ? ' clicked' : ''}`}
            onClick={() => handleInterestedClick(post.id)}
          >
            <FontAwesomeIcon icon={faHandPaper}/>
            Interested
          </button>
        </div>
      ))}
    </div>
  );
}

export default Posts;
