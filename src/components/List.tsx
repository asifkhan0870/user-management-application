import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../Global.css';

type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
};

const List: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError('Failed to fetch users.');
        setLoading(false);
      });
  }, []);

  const handleDelete = (id: number) => {
    axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`)
      .then(() => setUsers(users.filter(user => user.id !== id)))
      .catch(error => setError('Failed to delete user.'));
  };

  return (
    <div className='container'>
      <h1>User List</h1>
      {loading ? (
        <div className="spinner">Loading...</div> // Loading spinner
      ) : (
        <>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          <Link to="/create" className="create-user-btn">Create User</Link>
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map(user => (
                <tr key={user.id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.phone}</td>
                  <td>
                    <Link to={`/edit/${user.id}`} className="edit-btn">Update</Link>
                    <button onClick={() => handleDelete(user.id)} className="delete-btn">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default List;
