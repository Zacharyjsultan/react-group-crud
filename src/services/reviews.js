import { client } from './client';

export async function getReviews() {
  const response = await client.from('reviews').select('*');
  return response.data;
}

