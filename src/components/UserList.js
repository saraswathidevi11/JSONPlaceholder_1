import React from 'react';
import { useUserContext } from './UserContext';
import {
  Container,
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
  Paper,
  Button,
  Grid,
  Box,
} from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Pagination from '@mui/material/Pagination';
import UserForm from './UserForm'; // Ensure UserForm is imported

const UserList = () => {
  const { users, loading, error, handleEdit, handleDelete, handleOpenModal } = useUserContext();
  const [page, setPage] = React.useState(1);
  const itemsPerPage = 5;

  const handleChangePage = (event, value) => {
    setPage(value);
  };

  const paginatedUsers = users.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <Container>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4">
          User List
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleOpenModal}
        >
          Add User
        </Button>
      </Box>
      {loading && <CircularProgress />}
      {error && <Typography color="error" mb={2}>{error}</Typography>}
      <Paper style={{ padding: '16px' }}>
        <List>
          {paginatedUsers.map((user) => (
            <ListItem key={user.id} divider>
              <ListItemText primary={user.name} secondary={user.email} />
              <ListItemSecondaryAction>
                <IconButton edge="end" onClick={() => handleEdit(user)}>
                  <Edit />
                </IconButton>
                <IconButton edge="end" onClick={() => handleDelete(user.id)}>
                  <Delete />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      </Paper>
      <Box mt={2} display="flex" justifyContent="center">
        <Pagination
          count={Math.ceil(users.length / itemsPerPage)}
          page={page}
          onChange={handleChangePage}
        />
      </Box>
      <UserForm /> {/* Add UserForm component here */}
    </Container>
  );
};

export default UserList;
