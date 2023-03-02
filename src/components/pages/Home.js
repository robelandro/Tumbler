import Posts from '../Posts';
import PostOrder from '../PostOrder';
import React, { useEffect } from "react";

const Home = () => {
  useEffect(() => {
		document.title = "Tumbler";
	  }, []);
  return (
    <div className="home">
      <h2>Homepage</h2>
      <PostOrder />
      <Posts />
    </div>
  );
}
 
export default Home;
