import { checkError, client } from './client';

export async function getReviews() {
  const response = await client.from('reviews').select('*');
  return response.data;
}

export async function makeReview(restaurant, description, rating) {
  const response = await client.from('reviews').insert({ restaurant, description, rating });
  return response.data;
}

export async function editReview(id, restaurant, description, rating) {
  const response = await client.from('reviews').update({ restaurant, description, rating }). match({ id });
  return response;
}

export async function getReview(id) {
  const response = await client.from('reviews').select('*').match({ id }).single();
  return response;
}


export async function deleteReview(id) {
  const response = await client.from('reviews').delete().match({ id }).single();
  return checkError(response);
}