const Navbar = () => {
  return (
    <nav className="navbar">
      <h1>Tumbler </h1>
      <div className="links">
        <a href="/">Home</a>
        <a href="/chat" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>Chat</a>
        <a href="/notification" style={{ 
          color: 'white', 
          backgroundColor: '#f1356d',
          borderRadius: '8px' 
        }}>Notification</a>
        <a href="/profile" style={{ 
          color: 'white', 
          backgroundColor: '#7a72bd',
          borderRadius: '8px' 
        }}>Profile</a>
      </div>
    </nav>
  );
}
 
export default Navbar;
