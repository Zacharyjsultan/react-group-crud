import React from 'react';
import { useHistory } from 'react-router-dom';
import { editReview } from '../../services/reviews';
import ReviewForm from './ReviewForm';

export default function EditReviews() {
  const history = useHistory();
  const editHandler = async (restaurant, rating, description) => {
    try {
      await editReview(rating, description, restaurant);
      history.push('/reviews');
    } catch (e) {
      console.error(e.message);
    }
  }; 
  return <ReviewForm clickHandler={editHandler} />;

}
