import React from 'react';
import { useState } from 'react';

export default function ReviewForm({
  restaurant = '',
  rating = '',
  description = '',
  clickHandler,
}) {
  const [restaurantInput, setRestaurantInput] = useState(restaurant);
  const [ratingInput, setRatingInput] = useState(rating);
  const [descriptionInput, setDescriptionInput] = useState(description);

  return (
    <div>
      <h2>Restaurant Reviewer</h2>

      <input
        type="text"
        value={restaurantInput}
        placeholder="'Restaurant'"
        onChange={(e) => setRestaurantInput(e.target.value)}
      />

      <h3>Rating</h3>

      <input
        type="number"
        value={ratingInput}
        placeholder="1/5"
        min="1"
        max="5"
        onChange={(e) => setRatingInput(e.target.value)}
      />

      <input
        type="text"
        value={descriptionInput}
        placeholder="description"
        onChange={(e) => setDescriptionInput(e.target.value)}
      />

      <button
        onClick={() => {
          clickHandler(restaurantInput, descriptionInput, ratingInput);
        }}
      >
        Submit
      </button>
    </div>
  );
}
