// breakdown of the demo code for future reference as notes

import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';
import { UserProvider } from './context/UserContext';

import * as authFns from './services/auth';
import * as postFns from './services/posts';
// import all the functions from these files and use them as named

jest.mock('./services/auth');
jest.mock('./services/posts');
// creating a mock file to access the contents inside those files without actually making api calls

const mockUser = {
  id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  aud: 'authenticated',
  role: 'authenticated',
  email: 'random@example.com',
};
// created a mock authenticated user in order to test app functionality on components/ user stories that require a logged in user

test('user can sign in', async () => {
  // within the quotes, its like a console.log flag- it'll show the message of what you're trying to test
  authFns.getUser.mockReturnValue(null);
  // testing login so we don't need to get a user
  authFns.authUser.mockReturnValue(mockUser);
  // test should return the values of the mock user we created?
  render(
    <UserProvider>
      <MemoryRouter>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  // need to make sure the App component is wrapped the same as it is in index.js to access the state/ routes needed
  // memory router is a soft version of browser router
  const headerElem = screen.getByText(/bulletin board/i);
  // getByText is synchronous and is checking if the page says the phrase passed in between the /'s
  // i - makes what's passed in case insensitive so it'll look for the word disregarding the casing
  expect(headerElem).toBeInTheDocument();
  // expects are what you're expecting to happen or for th component to have

  const emailInput = screen.getByLabelText('Email:');
  // this is where we can use htmlFor to link the label with the id of the input
  //        <label htmlFor="email">Email:</label>
  //        <input type="text" id="email" value={email}
  fireEvent.change(emailInput, { target: { value: 'random@example.com' } });
  // fireEvent is the syntax for making an event happen
  expect(emailInput.value).toBe('random@example.com');

  const passwordInput = screen.getByLabelText('Password:');
  fireEvent.change(passwordInput, { target: { value: '123456' } });

  const button = screen.getByRole('button');
  // for fireEvents, if there are multiple then its best to get by label
  // here, since there is only one button on the page we can getByRole but just need to be cautious on using
  fireEvent.click(button);

  const headerText = await screen.findByText('Hello random@example.com');
  // this is the main thing we were testing for
  // to make sure not only were the inputs and the button was working
  // but that the user was able to log in/ sign up to become an authenticated user
  // and to access the page of posts
  // we're able to know this worked because of the change in the heading with the personal message
  expect(headerText).toBeInTheDocument();
});

const fakePosts = [
  {
    id: 1,
    title: 'Fake Post #1',
    description: '#1 description',
    user_id: '0dab2c65-5911-469c-9f12-8fb47ebe52f2',
  },
  { id: 2, title: 'Fake Post #2', description: '#2 description' },
];

it('signed in users should see a list of posts at /posts', async () => {
  authFns.getUser.mockReturnValue(mockUser);
  postFns.getPosts.mockReturnValue(fakePosts);
  render(
    <UserProvider>
      <MemoryRouter initialEntries={['/posts']}>
        <App />
      </MemoryRouter>
    </UserProvider>
  );
  await screen.findByText(/Fake Post #1/i);
  await screen.findByText(/Edit 1/i);
  await screen.findByText(/Fake Post #2/i);
});
