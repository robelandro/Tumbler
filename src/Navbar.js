import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faHome, faComment, faUser } from '@fortawesome/free-solid-svg-icons'

const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Tumbler </h1>
      <div className="links">
        <a href="/"><FontAwesomeIcon icon={faHome} />Home</a>
        <a href="/chat" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}><FontAwesomeIcon icon={faComment} />Chat</a>
        <a href="/notification" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>
          <FontAwesomeIcon icon={faBell} />
        </a>
        <a href="/profile" style={{ 
          color: 'white', 
          backgroundColor: '#7a72bd',
          borderRadius: '8px' 
        }}><FontAwesomeIcon icon={faUser} />Profile</a>
      </div>
    </nav>
  );
}
 
export default Navbar;
