import React from 'react';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import { useUserContext } from './UserContext';

const schema = yup.object().shape({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
});

const UserForm = () => {
  const { open, handleClose, selectedUser, handleCreateOrUpdate } = useUserContext();
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    if (selectedUser) {
      setValue('name', selectedUser.name);
      setValue('email', selectedUser.email);
    }
  }, [selectedUser, setValue]);

  const onSubmit = (data) => {
    handleCreateOrUpdate({ ...data, id: selectedUser ? selectedUser.id : Date.now() });
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{selectedUser ? 'Edit User' : 'Add User'}</DialogTitle>
      <DialogContent>
        <Paper style={{ padding: '16px' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Name"
                  {...register('name')}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  variant="outlined"
                  label="Email"
                  {...register('email')}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  {selectedUser ? 'Update' : 'Create'}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default UserForm;
