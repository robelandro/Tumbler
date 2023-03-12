import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faComment, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie"; // import useCookies hook
import { useEffect, useState } from "react";

const Navbar = () => {
  const [cookies] = useCookies(["token"]); // use useCookies hook
  const [status, setStatus] = useState(false);

  useEffect(() => {
    // Fetch user data from an API
    fetch(`http://api.nftalem.tech/get_user/${cookies.token}`)
    .then(response => {
      if (response.ok) { // Check if response status is 200 OK
        return response.json(); // Parse response data as JSON
      } else {
        //throw new Error(`User not found. Status code: ${response.status}`);
      }
    })
    .then(data => {
      if (cookies.token === undefined) {
        setStatus(false);
      }
      else if (data.id === cookies.token) {
        setStatus(true);
      }
      else{
        setStatus(false);
      }
    })
    .catch(error => {
      console.log(error);
    });
  }, [cookies]);

  return (
    <nav className="navbar">
      <Link to="/">
        <img src="/images/logo.png" alt="logo" className="logo" />
        Tumbler
      </Link>
      <div className="links">
        {status ? ( // If user is logged in, show these links
          <>
            <Link to="/">
              <FontAwesomeIcon icon={faHome} />
              Home
            </Link>
            <Link
              to="/chats"
              style={{
                color: "white",
                backgroundColor: "#f1356d",
                borderRadius: "8px",
              }}
            >
              <FontAwesomeIcon icon={faComment} />
              Chat
            </Link>
            <Link
              to="/profile"
              style={{
                color: "white",
                backgroundColor: "#f1356d",
                borderRadius: "8px",
              }}
            >
              <FontAwesomeIcon icon={faUser} />
            </Link>
          </>
        ) : (
          <Link
            to="/about"
            style={{
              color: "white",
              backgroundColor: "#f1356d",
              borderRadius: "8px",
            }}
          >
            About
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
