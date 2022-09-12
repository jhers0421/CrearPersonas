import React from 'react';
import Grid from '@mui/material/Grid';
import { ContentCard } from '../components';

export const SelectionPanelPage = () => {


  return (
    <>
      <Grid
        container
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mt={5}
      >
        <ContentCard title='Personas' url='people' />
        {/* <ContentCard title='Pacientes' /> */}
     {/*    <ContentCard title='Maestros' /> */}
      </Grid>
    </>
  )
}
