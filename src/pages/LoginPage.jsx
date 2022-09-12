import React, { useContext } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LoginContext } from '../context/LoginContext';


export const LoginPage = () => {

  const { formState, onChangeFormState, postLogin } = useContext(LoginContext);

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar Sesión
        </Typography>
        <Box component="form" onSubmit={postLogin} noValidate sx={{ mt: 1 }}>
          <TextField
            value={formState.user}
            margin="normal"
            required
            fullWidth
            label="User"
            name="user"
            autoComplete="email"
            autoFocus
            onChange={onChangeFormState}
          />
          <TextField
            value={formState.password}
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            onChange={onChangeFormState}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>

        </Box>
      </Box>
    </Container>
  );
}
