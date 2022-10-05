import React from 'react';
import { Link } from 'react-router-dom';
import useReview from '../../hooks/useReview';

export default function Reviews() {

  const { review, loading, error } = useReview();
  if (loading) return <h2>Loading Review..</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      {review.map((review) => {
        return (
          <div className="big-div" key={review.id}>
            
            <div>{review.restaurant}</div>
            <div>{review.description}</div>
            <div> {review.rating} </div>
            <Link to={`/reviews/editreviews/`}>Edit Review</Link>
          </div>
        );
      })}
    </div>
  );
}
