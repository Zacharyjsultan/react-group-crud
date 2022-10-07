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
      <h2>
        Restaurant: <br></br>
        {restaurant}
      </h2>
      <h5>
        Rating: <br></br>
        {rating}
      </h5>
      <p>
        Review: <br></br>
        {description}
      </p>
      {reviewer && (
        <>
          <button onClick={() => handleDelete(id)}> Delete </button>
          <Link to={`/review/form/edit/${id}`} className="link">
            Edit
          </Link>
        </>
      )}
    </div>
  );
}
