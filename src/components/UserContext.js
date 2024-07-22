import React, { createContext, useContext, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, createUser, editUser, deleteUser } from '../redux/slices/userSlice';
import axios from 'axios';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.users);
  const [selectedUser, setSelectedUser] = useState(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  const handleEdit = (user) => {
    setSelectedUser(user);
    setOpen(true);
  };

  const handleDelete = (userId) => {
    dispatch(deleteUser(userId));
  };

  const handleCreateOrUpdate = async (user) => {
    if (selectedUser) {
      dispatch(editUser(user));
    } else {
      try {
        await axios.post('https://jsonplaceholder.typicode.com/users', user);
        dispatch(createUser(user));
      } catch (error) {
        console.error('Failed to create user:', error);
      }
    }
    setOpen(false);
    setSelectedUser(null);
  };

  const handleOpenModal = () => {
    setSelectedUser(null);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedUser(null);
  };

  return (
    <UserContext.Provider
      value={{
        users,
        loading,
        error,
        open,
        selectedUser,
        handleEdit,
        handleDelete,
        handleCreateOrUpdate,
        handleOpenModal,
        handleClose,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
