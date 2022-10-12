import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

import * as authFns from './services/auth';
import * as reviewsFns from './services/reviews';

jest.mock('./services/auth');
jest.mock('./services/reviews');

const mockUser = {
  id: '60ff81ec-a8e4-46e5-a34c-113025ffbd6b',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'newEmail@example.com',
};

test('user should be able to sign in', async () => {
  authFns.getUser.mockReturnValue(null);
  authFns.authUser.mockReturnValue(mockUser);

  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );

  const emailInput = screen.getByLabelText('Email=');
  fireEvent.change(emailInput, { target: { value: 'newEmail@example.com' } });
  expect(emailInput.value).toBe('newEmail@example.com');

  const passwordInput = screen.getByLabelText('Password=');
  fireEvent.change(passwordInput, { target: { value: '123456' } });

  const button = screen.getByRole('button');
  fireEvent.click(button);

  const headerText = await screen.findByText('Welcome newEmail@example.com');
  expect(headerText).toBeInTheDocument();
  // screen.debug();
});

const mockReviews = [
  {
    id: 1,
    restaurant: 'restaurant 1',
    rating: 3,
    description: 'review 1',
    user_id: '60ff81ec-a8e4-46e5-a34c-113025ffbd6b',
  },
  {
    id: 2,
    restaurant: 'restaurant 2',
    rating: 5,
    description: 'review 2',
    user_id: '60ff81ec-a8e4-46e5-a34c-113025ffbd6b',
  },
];

test('authenticated users should be able to see a list of reviews', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  reviewsFns.getReviews.mockReturnValue(mockReviews);
  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/reviews']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  await screen.findByText(/restaurant 1/i);
  // await screen.findByText(/Edit/i);
  await screen.findByText(/restaurant 2/i);
});

const mockReview = {
  id: 3,
  restaurant: 'New Restaurant 1',
  rating: 2,
  description: 'New Review 1',
  user_id: '60ff81ec-a8e4-46e5-a34c-113025ffbd6b',
};

test('authenticated users can edit their reviews', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  reviewsFns.getReviews.mockReturnValue(mockReviews);
  reviewsFns.makeReview.mockReturnValue(mockReview);
  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/review/form/create']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  const restaurantInput = screen.getByLabelText('Restaurant:');
  fireEvent.change(restaurantInput, { target: { value: 'New Restaurant 1' } });

  const ratingInput = screen.getByLabelText('Rating:');
  fireEvent.change(ratingInput, { target: { value: 2 } });

  const reviewInput = screen.getByLabelText('Review:');
  fireEvent.change(reviewInput, { target: { value: 'New Review 1' } });
  screen.debug();

  const button = screen.getByTestId('submit');
  fireEvent.click(button);
  mockReviews.push(mockReview);
  screen.debug();
  await screen.findByText(/New Restaurant 1/i);
  screen.debug();
});
