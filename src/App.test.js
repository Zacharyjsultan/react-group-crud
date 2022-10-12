import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import { MemoryRouter } from 'react-router-dom';
import { UserProvider } from './context/UserContext';

import * as authFns from './services/auth';
// import * as reviewsFns from './services/reviews';

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
});
