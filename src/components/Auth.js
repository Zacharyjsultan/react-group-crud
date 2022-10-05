import React, { useContext, useState } from 'react';
import { useParams } from 'react-router-dom';
const [email, setEmail] = useState('');
const [password, setPassword] = useState('');
const { type } = useParams();
const { user, setUser } = useContext();
export default function Auth() {

  return (
    <div>Hello World?</div>
  );
}
