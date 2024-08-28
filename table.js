import { useState } from 'react';
import UserForm from './form';
import React from 'react';


const UserTable = ({ users, onEdit, onDelete }) => {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleEdit = (user) => {
    setCurrentUser(user);
    setIsFormVisible(true);
  };

  const handleDelete = (userId) => {
    if (confirm('Are you sure you want to delete this user?')) {
      onDelete(userId);
    }
  };

  const handleFormSubmit = (user) => {
    onEdit(user);
    setIsFormVisible(false);
    setCurrentUser(null);
  };

  return (
    <>
      <button onClick={() => { setCurrentUser(null); setIsFormVisible(true); }}>Add User</button>
      {isFormVisible && (
        <UserForm
          user={currentUser}
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormVisible(false)}
        />
      )}
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>LinkedIn URL</th>
            <th>Gender</th>
            <th>Address</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <React.Fragment key={user.id}>
              <tr>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.linkedin}</td>
                <td>{user.gender}</td>
                <td>
                  <button onClick={() => setExpandedIndex(expandedIndex === index ? null : index)}>
                    {expandedIndex === index ? 'Hide Address' : 'Show Address'}
                  </button>
                </td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                </td>
              </tr>
              {expandedIndex === index && (
                <tr>
                  <td colSpan="6">
                    <div>
                      <p>Line 1: {user.address.line1}</p>
                      <p>Line 2: {user.address.line2}</p>
                      <p>State: {user.address.state}</p>
                      <p>City: {user.address.city}</p>
                      <p>PIN: {user.address.pin}</p>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default UserTable;
