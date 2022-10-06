import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useReview from '../../hooks/useReview';
import { editReview } from '../../services/reviews';
import ReviewForm from './ReviewForm';


export default function EditReviews() {

  const { id } = useParams();
  const { review, error, loading, setLoading } = useReview(id);
  const history = useHistory();
  if (loading) return <p>This page is loading...</p>;
  console.log(review);
  const editHandler = async (restaurant, rating, description) => {
    setLoading(true);
    try {
      await editReview(review.id, rating, description, restaurant);
      history.push('/reviews');
    } catch (e) {
      console.error(e.message);
    }
  }; 
  return <ReviewForm {...review} clickHandler={editHandler} />;

}
