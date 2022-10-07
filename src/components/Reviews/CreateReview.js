import React from 'react';
import { useHistory } from 'react-router-dom';
import useReview from '../../hooks/useReview';
import { makeReview } from '../../services/reviews';
import ReviewForm from './ReviewForm';

export default function CreateReview() {
  const history = useHistory();
  const { setLoading } = useReview();

  const handleClick = async (restaurant, description, rating) => {
    console.log('restaurant', restaurant);
    console.log('description', description);
    console.log('rating', rating);
    setLoading(true);
    try {
      const data = await makeReview(restaurant, description, rating);
      console.log('data', data);
      history.push('/reviews');
    } catch (e) {
      console.log(e.message);
    }
  };
  return <ReviewForm clickHandler={handleClick} />;
}
