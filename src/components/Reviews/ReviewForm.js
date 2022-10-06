import React from 'react';
import { useState } from 'react';


export default function ReviewForm({ clickHandler }) {
  const [restaurant, setRestaurant] = useState('');
  const [rating, setRating] = useState('');
  const [description, setDescription] = useState('');

  return (
    <div>
      <h2>Restaurant Reviewer</h2>

      <input type="text" value={restaurant}placeholder="'Restaurant'" onChange={(e) => setRestaurant(e.target.value)} />

      <h3>Rating</h3>

      <input type="number" value={rating} placeholder="1/5" min="1" max="5" onChange={(e) => setRating(e.target.value)}/>

      <input type="text" value={description} placeholder="description" onChange={(e) => setDescription(e.target.value)}/>

      <button onClick={() => {clickHandler(restaurant, rating, description);
      }}
      />

    </div>
  );
}
