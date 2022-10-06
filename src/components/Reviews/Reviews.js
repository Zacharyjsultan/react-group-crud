import React from 'react';
import { Link } from 'react-router-dom';
import useReview from '../../hooks/useReview';
import ReviewCard from './ReviewCard';
import './Reviews.css';
export default function Reviews() {

  const { review, loading, error } = useReview();
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
