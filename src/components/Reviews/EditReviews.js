import React from 'react';
import { makeReview } from '../../services/reviews';
import ReviewForm from './ReviewForm';

export default function EditReviews() {

  const editHandler = async (restaurant, rating, description) => {
    try {
      await makeReview(rating, description, restaurant);
      history.push('/reviews');
    } catch (e) {
      console.error(e.message);
    }
  }; 
  return (
    <div>
      <ReviewForm clickHandler={editHandler} />
    </div>
  );
}
