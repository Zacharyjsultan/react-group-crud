import { useEffect, useState } from 'react';
import { getReviews } from '../services/reviews';

export default function useReviews() {
  const [review, setReview] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      setLoading(true);
      try {
    
        const data = await getReviews();
        setReview(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    fetchReview();
  }, []);
  return { review, setReview, error, loading, setLoading };
}


