import React from 'react';
import { NavLink } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import useReview from '../../hooks/useReview';

import useReviews from '../../hooks/useReviews';
import { deleteReview, getReviews } from '../../services/reviews';
import ReviewCard from './ReviewCard';
import './Reviews.css';

export default function Reviews() {
  const { user } = useUser();
  const { reviews, loading, error, setReviews } = useReviews();
  
  if (loading) return <h2>Loading Review..</h2>;
  if (error) return <h2>{error}</h2>;

  const clickHandler = async (id) => {
    if (!user) return;
    
    await deleteReview(id);
    setReviews(await getReviews());
    console.log(id);
  };

  return (
    <>
      <p></p>
      <NavLink className='createButton' to="/review/form/create">Create Review</NavLink>
      <div>
        {reviews.map((review) => (
          <ReviewCard key={review.id} {...review} handleDelete={clickHandler} />
        ))}
      </div>
    </>
  );
}
