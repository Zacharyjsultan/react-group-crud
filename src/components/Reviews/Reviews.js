import React from 'react';
import useReview from '../../hooks/useReview';

export default function Reviews() {

  const { review, setReview } = useReview();
  // console.log(review);

  return (
    <div>Reviews</div>
  );
}
