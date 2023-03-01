import './PostOrder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHandshake, faGavel} from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function PostOrder() {
  return (
    <div className="mainTab">
    <Link to="/order" style={{ 
      color: 'white', 
      backgroundColor: '#f1356d',
      borderRadius: '8px' 
    }}><FontAwesomeIcon icon={faHandshake} />PostOrder</Link>
    <Link to="/skill" style={{ 
      color: 'white', 
      backgroundColor: '#f1356d',
      borderRadius: '8px' 
    }}>
      <FontAwesomeIcon icon={faGavel}/>I Have skill
    </Link>
  </div>
  );
}

export default PostOrder;
