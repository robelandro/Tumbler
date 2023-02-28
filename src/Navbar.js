import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faHome, faComment, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/">Tumbler </Link>
      <div className="links">
        <Link to="/"><FontAwesomeIcon icon={faHome} />Home</Link>
        <Link to="/chat" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}><FontAwesomeIcon icon={faComment} />Chat</Link>
        <Link to="/notification" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>
          <FontAwesomeIcon icon={faBell} />
        </Link>
        <Link to="/profile" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}><FontAwesomeIcon icon={faUser} />Profile</Link>
      </div>
    </nav>
  );
}
 
export default Navbar;
