import './Posts.css';
import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHandPaper, faThumbsUp } from '@fortawesome/free-solid-svg-icons'

function Posts() {
  const [posts, setPosts] = useState([]);
  const [clickedPosts, setClickedPosts] = useState([]);
  const [likes, setLikes] = useState({});

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        setPosts(data);
        setLikes(Object.fromEntries(data.map(post => [post.id, 0])));
      });
  }, []);

  const handleInterestedClick = (postId) => {
    // handle logic for interested button click
    console.log(`User is interested in post ${postId}`);
    if (clickedPosts.includes(postId)) {
      setClickedPosts(clickedPosts.filter(id => id !== postId));
    } else {
      setClickedPosts([...clickedPosts, postId]);
    }
    console.log(clickedPosts);
  };

  const handleLikeClick = (postId) => {
    // handle logic for like button click
    console.log(`User likes post ${postId}`);
    console.log(likes);
    setLikes({ ...likes, [postId]: likes[postId] + 1 });
  }

  return (
    <div className="posts">
      {posts.map((post) => (
        <div key={post.id} className="post">
          <h3>{post.title}</h3>
          <img src="https://picsum.photos/600/400" alt="Post" />
          <p>{post.body}</p>
          <div className="buttons">
            <button
              className={`interested-btn${clickedPosts.includes(post.id) ? ' clicked' : ''}`}
              onClick={() => handleInterestedClick(post.id)}
            >
              <FontAwesomeIcon icon={faHandPaper}/>
              Interested
            </button>
            <button className="like-btn" onClick={() => handleLikeClick(post.id)}>
              <FontAwesomeIcon icon={faThumbsUp} />
              {likes[post.id]} Likes
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Posts;
