import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome, faComment, faUser } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/"><img src='/images/logo.png' alt='logo' className='logo'/>Tumbler </Link>
      <div className="links">
        <Link to="/"><FontAwesomeIcon icon={faHome} />Home</Link>
        <Link to="/chats" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}><FontAwesomeIcon icon={faComment} />Chat</Link>
        <Link to="/profile" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}><FontAwesomeIcon icon={faUser} /></Link>
        <Link to="/about" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>
          About
        </Link>
      </div>
    </nav>
  );
}
 
export default Navbar;
