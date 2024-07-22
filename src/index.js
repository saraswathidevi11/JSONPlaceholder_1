import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import store  from './redux/store'; // Adjust the path as needed
import { UserProvider } from './components/UserContext'; // Adjust the path as needed
import UserList from './components/UserList';
import UserForm from './components/UserForm';

ReactDOM.render(
  <Provider store={store}>
    <UserProvider>
      <UserList />
      <UserForm />
    </UserProvider>
  </Provider>,
  document.getElementById('root')
);
