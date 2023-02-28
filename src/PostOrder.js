import './PostOrder.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faHandshake, faGavel} from '@fortawesome/free-solid-svg-icons'
function PostOrder() {
  return (
    <div className="mainTab">
    <a href="/order" style={{ 
      color: 'white', 
      backgroundColor: '#f1356d',
      borderRadius: '8px' 
    }}><FontAwesomeIcon icon={faHandshake} />PostOrder</a>
    <a href="/skill" style={{ 
      color: 'white', 
      backgroundColor: '#f1356d',
      borderRadius: '8px' 
    }}>
      <FontAwesomeIcon icon={faGavel}/>I Have skill
    </a>
  </div>
  );
}

export default PostOrder;
