import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

import useReviews from '../../hooks/useReviews';
import ReviewCard from './ReviewCard';
import './Reviews.css';

export default function Reviews() {
  const { review, loading, error } = useReviews();
  const { user } = useUser();
  if (loading) return <h2>Loading Review..</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <>
      {user && <NavLink to="/review/form/create">Create Review</NavLink>}
      <div>
        {review.map((review) => (
          <ReviewCard key={review.id} {...review} />
        ))}
      </div>
    </>
  );
}
