import { Link } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

// import useReviews from '../../hooks/useReviews';
// import { deleteReview, getReviews } from '../../services/reviews';
import './Reviews.css';

export default function ReviewCard({ rating, description, restaurant, user_id, id, handleDelete }) {
  const { user } = useUser();
  const reviewer = user.id === user_id;
  // const { setReview, review, setLoading } = useReviews();

  return (
    <div className="big-div">
      <h2>{restaurant}</h2>
      <h5>{rating}</h5>
      <p>{description}</p>
      {reviewer && (
        <>
          <button onClick={handleDelete}> Delete </button>
          <Link to={`/review/form/edit/${id}`}>Edit</Link>
        </>
      )}
    </div>
  );
}
