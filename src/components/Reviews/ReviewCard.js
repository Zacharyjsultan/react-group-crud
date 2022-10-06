import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import './Reviews.css';


export default function ReviewCard({ rating, description, restaurant, user_id, id }) {

  const { user } = useUser();
  const reviewer = user.id === user_id;
  return (
    <div className='big-div'>
      <h2>{restaurant}</h2>
      <h5>{rating}</h5>
      <p>{description}</p>
      {reviewer && (
        <Link to={`/review/form/edit/${id}`}>Edit</Link>
      )}
    </div>
  );
}

