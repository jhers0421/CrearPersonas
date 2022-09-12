import React, { useContext } from 'react';
import { Header, ModalCreatePeople, ModalEditPeople } from '../components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Container from '@mui/material/Container';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import { PeopleContext } from '../context/PeopleContext';
import { useEffect } from 'react';
import EditIcon from '@mui/icons-material/Edit';


export const PeoplePage = () => {

  const { handleClickOpenModalCreatePeople, handleClickOpenModalEditPeople, people, getPeople, searchpeople } = useContext(PeopleContext);


  useEffect(() => {
    getPeople();
  }, []) // eslint-disable-next-line react-hooks/exhaustive-deps


  return (
    <>
      <Header />
      <Typography mt={5} variant='h5' align='center'> Listado de Personas</Typography>

      <Container maxWidth='xl' component={Paper} sx={{ marginTop: 5 }}>
        <Grid container spacing={2} direction='row' justifyContent='flex-end' alignItems='center' >
          <Grid item>
            <Button onClick={handleClickOpenModalCreatePeople}>
              Agregar
            </Button>
          </Grid>
        </Grid>

        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Documento</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Tipo persona</TableCell>
              <TableCell>Genero</TableCell>
              <TableCell>Fecha registro</TableCell>
              <TableCell>Accion</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {people.map(({ cddocumento, dsnombresYapellidos, tipoPersona, cdgenero, feregistro }) => (
              <TableRow key={cddocumento}>
                <TableCell>{cddocumento}</TableCell>
                <TableCell>{dsnombresYapellidos}</TableCell>
                <TableCell>{tipoPersona}</TableCell>
                <TableCell>{cdgenero}</TableCell>
                <TableCell>{feregistro.substring(0, 10)}</TableCell>
                <TableCell>
                  <Button onClick={() => {
                    searchpeople(cddocumento);
                    handleClickOpenModalEditPeople();
                  }}
                  >
                    <EditIcon color="action" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container >

      <ModalCreatePeople />
      <ModalEditPeople />

    </>
  )
}
