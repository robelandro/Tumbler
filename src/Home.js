import Posts from './Posts';
import PostOrder from './PostOrder';
const Home = () => {
  return (
    <div className="home">
      <h2>Homepage</h2>
      <PostOrder />
      <Posts />
    </div>
  );
}
 
export default Home;
