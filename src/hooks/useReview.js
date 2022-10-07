import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { getReview } from '../services/reviews';

export default function useReview() {
  const { id } = useParams();
  const [review, setReview] = useState({});
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReview = async () => {
      setLoading(true);
      try {
    
        const data = await getReview(id);
        setReview(data);
        setLoading(false);
      } catch (e) {
        setError(e.message);
        setReview({});
        setLoading(false);
      }
    };
    fetchReview();
  }, [id]);
  return { review, setReview, error, loading, setLoading };
}