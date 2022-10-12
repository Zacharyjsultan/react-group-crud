import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/UserContext';

// importing services
import * as authFns from './services/auth';
import * as reviewsFns from './services/reviews';

// allows testing to occur
jest.mock('./services/auth');
jest.mock('./services/reviews');

const mockUser = {
  id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'random@example.com',
};

test('auth log in ', async () => {
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
  fireEvent.change(emailInput, { target: { value: 'random@example.com' } });
  expect(emailInput.value).toBe('random@example.com');

  const passwordInput = screen.getByLabelText('Password=');
  fireEvent.change(passwordInput, { target: { value: '123456' } });

  const button = screen.getByRole('button');
  fireEvent.click(button);
});

const fakeReviews = [
  {
    id: 1,
    restaurant: 'Fake Reviews #1',
    description: '#1 description',
    user_id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  },
  { id: 2, restaurant: 'Fake Reviews #2', description: '#2 description' },
];

test('signed in users should see a list of reviews', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  reviewsFns.getReviews.mockReturnValue(fakeReviews);
  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/reviews']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  await screen.findByText(/Fake Reviews #1/i);
  await screen.findByText(/Fake Reviews #2/i);
});

const mockReviews = [
  {
    id: 1,
    restaurant: 'TacoSmell',
    rating: 3,
    description: 'YUCKCKK',
    user_id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  },
  {
    id: 2,
    restaurant: 'KFC',
    rating: 5,
    description: 'Fine Dining',
    user_id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  },
];

const mockReview = {
  id: 3,
  restaurant: 'Wackarnolds',
  rating: 2,
  description: 'MMM Delicioso!',
  user_id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
};

test('User can add review', async () => {
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
  fireEvent.change(restaurantInput, { target: { value: 'Wackarnolds' } });

  const ratingInput = screen.getByLabelText('Rating:');
  fireEvent.change(ratingInput, { target: { value: 2 } });

  const reviewInput = screen.getByLabelText('Review:');
  fireEvent.change(reviewInput, { target: { value: 'New Review 1' } });
  screen.debug();

  const button = screen.getByTestId('submit');
  fireEvent.click(button);
  mockReviews.push(mockReview);

  await screen.findByText(/Wackarnolds/i);
  screen.debug();
});
