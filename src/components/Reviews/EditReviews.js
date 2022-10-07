/* eslint-disable no-console */
import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import useReview from '../../hooks/useReview';
import { editReview } from '../../services/reviews';
import ReviewForm from './ReviewForm';

export default function EditReviews() {
  const { id } = useParams();
  const { review, loading, setLoading } = useReview(id);
  const history = useHistory();
  if (loading) return <p>This page is loading...</p>;

  const editHandler = async (restaurant, description, rating) => {
    setLoading(true);
    try {
      await editReview(review.id, restaurant, description, rating);
      history.push('/reviews');
    } catch (error) {
      console.error(error.message);
    }
  };
  return <ReviewForm {...review} clickHandler={editHandler} />;
}
