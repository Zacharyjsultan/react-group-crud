import React, { useState } from 'react';
import { Redirect, useParams } from 'react-router-dom';
import { useUser } from '../context/UserContext';
import { authUser } from '../services/auth';

export default function Auth() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { type } = useParams();
  const { user, setUser } = useUser();

  const submitAuth = async () => {
    const authUsers = await authUser(email, password, type);
    setUser(authUsers);
    setEmail('');
    setPassword('');
  };

  if (user) { return <Redirect to="/Reviews" />; }

  return (
    <>
      <div>
        <div className="log-in-controls">
          <label>Email=</label>
          <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="log-in-controls">
          <label>Password=</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button onClick={submitAuth}>Submit</button>
      </div>
    </>
  );
}
