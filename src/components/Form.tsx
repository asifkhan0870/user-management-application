import React, { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import '../Global.css';

type User = {
  name: string;
  email: string;
  phone: string;
};

const Form: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState<User>({ name: '', email: '', phone: '' });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      setLoading(true);
      axios.get(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then(response => {
          setUser(response.data);
          setLoading(false);
        })
        .catch(error => {
          setError('Failed to fetch user.');
          setLoading(false);
        });
    }
  }, [id]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const request = id
      ? axios.put(`https://jsonplaceholder.typicode.com/users/${id}`, user)
      : axios.post('https://jsonplaceholder.typicode.com/users', user);

    request.then(response => {
      console.log(response.data);
      setLoading(false);
      navigate('/');
    }).catch(error => {
      setError('Failed to save user.');
      setLoading(false);
    });
  };

  return (
    <div className='container'>
      <h2>{id ? 'Edit User' : 'Create User'}</h2>
      {loading ? (
        <div className="spinner">Loading...</div> // Loading spinner
      ) : (
        <>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <form onSubmit={handleSubmit}>
            <input type="text" name="name" value={user.name} onChange={handleChange} placeholder="Name" required />
            <input type="email" name="email" value={user.email} onChange={handleChange} placeholder="Email" required />
            <input type="text" name="phone" value={user.phone} onChange={handleChange} placeholder="Phone" required />
            <button type="submit">{id ? 'Update' : 'Create'}</button>
          </form>
        </>
      )}
    </div>
  );
};

export default Form;
