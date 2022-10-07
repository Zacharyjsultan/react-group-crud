import React from 'react';
import { useHistory } from 'react-router-dom';
import useReview from '../../hooks/useReview';
import { makeReview } from '../../services/reviews';
import ReviewForm from './ReviewForm';

export default function CreateReview() {
  const history = useHistory();
  const { setLoading } = useReview();

  const handleClick = async (restaurant, description, rating) => {
  
    setLoading(true);
    try {
      await makeReview(restaurant, description, rating);
      
      history.push('/reviews');
    } catch (e) {
      //eslint-disable-next-line
      console.error(e.message);
    }
  };
  return <ReviewForm clickHandler={handleClick} />;
}
