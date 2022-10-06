import React from 'react';
import { useUser } from '../../context/UserContext';
import { signOut } from '../../services/auth';
import './Header.css';

export default function Header() {
  const { user, setUser } = useUser();

  const handleClick = async () => {
    await signOut();
    setUser(null);
  }; 
  return (
    <div className='header'>
      <h2>E/Z Restaurant Reviewer</h2>
      {user && (
        <>
          <div>Welcome {user.email}</div>
          <button onClick={handleClick}>Sign Out</button>
        </>
      )}

    
    
    </div>
  );
}
