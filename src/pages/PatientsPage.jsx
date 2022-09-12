import React, { useContext } from 'react';
import { Header, ModalDetailPatient } from '../components';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import Container from '@mui/material/Container';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { PatientsContext } from '../context/PatientsContext';
import { useEffect } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';

export const PatientsPage = () => {

  const { patients, getPatients, handleClickOpenModalDetail, getPatientDetail } = useContext(PatientsContext);

  useEffect(() => {
    getPatients();
  }, []) // eslint-disable-next-line react-hooks/exhaustive-deps

  return (
    <>
      <Header />

      <Typography mt={5} variant='h5' align='center'> Listado de Pacientes</Typography>

      <Container maxWidth='xl' component={Paper} sx={{ marginTop: 5 }}>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Documento</TableCell>
              <TableCell>Nombre</TableCell>
              <TableCell>Eps</TableCell>
              <TableCell>Arl</TableCell>
              <TableCell>Detalle</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {patients.map(({ nmind, cddocumento, dsnombresYapellidos, dseps, dsarl }) => (
              <TableRow key={cddocumento}>
                <TableCell>{cddocumento}</TableCell>
                <TableCell>{dsnombresYapellidos}</TableCell>
                <TableCell>{dseps}</TableCell>
                <TableCell>{dsarl}</TableCell>
                <TableCell onClick={() => getPatientDetail(nmind)}><RemoveRedEyeIcon /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Container >

      <ModalDetailPatient />

    </>
  )
}
