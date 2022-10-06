import React from 'react';

import useReviews from '../../hooks/useReviews';
import ReviewCard from './ReviewCard';
import './Reviews.css';
export default function Reviews() {

  const { review, loading, error } = useReviews();
  if (loading) return <h2>Loading Review..</h2>;
  if (error) return <h2>{error}</h2>;

  return (
    <div>
      {review.map((review) => (
        <ReviewCard key={review.id} {...review} />
      )
        
      )}
    </div>
  );
}
