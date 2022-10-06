import { client } from './client';

export async function getReviews() {
  const response = await client.from('reviews').select('*');
  return response.data;
}

export async function makeReview(restaurant, description, rating) {
  const response = await client.from('reviews').insert({ reviews_restaurant: restaurant, description, rating });
  return response.data;
}
