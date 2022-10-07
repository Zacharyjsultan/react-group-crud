import { useEffect, useState } from 'react';
import { getReviews } from '../services/reviews';

export default function useReviews() {
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      setLoading(true);
      try {
        const data = await getReviews();
        setReviews(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setLoading(false);
      }
    };
    fetchReview();
  }, []);
  return { reviews, setReviews, error, loading, setLoading };
}
