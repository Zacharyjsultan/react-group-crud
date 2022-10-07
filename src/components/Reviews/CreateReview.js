import React from 'react';
import { useHistory } from 'react-router-dom';
import useReview from '../../hooks/useReview';
import { makeReview } from '../../services/reviews';
import ReviewForm from './ReviewForm';

export default function CreateReview() {
  const history = useHistory();
  const { setLoading } = useReview();

  const handleClick = async (restaurantInput, ratingInput, descriptionInput) => {
    setLoading(true);
    try {
      await makeReview(restaurantInput, ratingInput, descriptionInput);
      history.push('/reviews');
    } catch (e) {
      console.log(e.message);
    }
  };
  return <ReviewForm clickHandler={handleClick} />;
}
