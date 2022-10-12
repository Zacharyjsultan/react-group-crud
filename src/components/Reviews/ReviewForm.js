import React from 'react';
import { useState } from 'react';
import './ReviewForm.css';

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
    <div className="updater">
      <h2>Restaurant Reviewer</h2>
      <label htmlFor="restaurant">Restaurant:</label>
      <input
        type="text"
        id="restaurant"
        value={restaurantInput}
        placeholder="'Restaurant'"
        onChange={(e) => setRestaurantInput(e.target.value)}
      />

      <h3>Rating</h3>
      <label htmlFor="rating">Rating:</label>
      <input
        type="number"
        id="rating"
        value={ratingInput}
        placeholder="1/5"
        min="1"
        max="5"
        onChange={(e) => setRatingInput(e.target.value)}
      />
      <label htmlFor="review">Review:</label>
      <input
        type="text"
        id="review"
        value={descriptionInput}
        placeholder="description"
        onChange={(e) => setDescriptionInput(e.target.value)}
      />

      <button
        data-testid="submit"
        onClick={() => {
          clickHandler(restaurantInput, descriptionInput, ratingInput);
        }}
      >
        Submit
      </button>
    </div>
  );
}
