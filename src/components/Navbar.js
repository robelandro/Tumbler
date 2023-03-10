import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faComment, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie"; // import useCookies hook

const Navbar = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]); // use useCookies hook
  // setCookie("token", "John");
  // console.log(cookies.user); // "John"

  // check a cookies undefined or not 
  if(cookies.token === undefined){
    console.log("undefined");
  }else{
    console.log("not undefined");
  }

  return (
    <nav className="navbar">
      <Link to="/">
        <img src="/images/logo.png" alt="logo" className="logo" />
        Tumbler{" "}
      </Link>
      <div className="links">
        {cookies.token ? ( // if user cookie exists
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
