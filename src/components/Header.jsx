import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate, NavLink } from 'react-router-dom';

export const Header = () => {

  const navigate = useNavigate();

  const styleInactivo = {
    textDecoration: 'none',
    marginRight: '40px',
    color: '#B6B6B6'
  }

  const style1Activo = {
    textDecoration: 'none',
    marginRight: '40px',
    color: '#B6B6B6',
    borderBottom: `1px solid white`
  }

  return (
    <Box sx={{ margin: -1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ border: '1px solid white', padding: 1, marginRight: 3 }}>
            Soft Caribbean
          </Typography>
          <NavLink to='/people' style={({ isActive }) => isActive ? style1Activo : styleInactivo} >
            <Typography variant="h6"> Personas</Typography>
          </NavLink>
          <NavLink to='/patient' style={({ isActive }) => isActive ? style1Activo : styleInactivo} >
            <Typography variant="h6"> Pacientes</Typography>
          </NavLink>
          <Typography sx={{ flexGrow: 1 }}></Typography>
          <Button onClick={() => navigate('/', { replace: true })} color="inherit">Cerrra sesión</Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
