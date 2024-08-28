import { useState, useEffect } from 'react';
import UserTable from '../components/table';

const Home = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setUsers([
        {
          id: '',
          name: '',
          email: '',
          linkedin: '',
          gender: '',
          address: {
            line1: '',
            line2: '',
            state: '',
            city: '',
            pin: '',
          },
        },
      ]);
      setIsLoading(false);
    }, 1000);
  }, []);

  const handleEdit = (updatedUser) => {
    setUsers((prev) => prev.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
  };

  const handleDelete = (userId) => {
    setUsers((prev) => prev.filter((user) => user.id !== userId));
  };

  const handleAddUser = (newUser) => {
    setUsers((prev) => [...prev, { ...newUser, id: Date.now().toString() }]);
  };

  return (
    <div>
      <h1>User Management</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <UserTable
          users={users}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onAdd={handleAddUser}
        />
      )}
    </div>
  );
};

export default Home;
