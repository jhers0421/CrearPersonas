import React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';

export const ItemDetailPatient = ({title, dato}) => {
  return (
    <>
      <Grid item md={6}><Typography variant='h6'>{title}</Typography> </Grid>
      <Grid item md={6}><Typography variant='h6'>{dato}</Typography> </Grid>
      <Grid item md={12}><Divider /> </Grid>
    </>
  )
}
