import React, { useContext } from 'react';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { PatientsContext } from '../context/PatientsContext';
import { ItemDetailPatient } from './ItemDetailPatient';


export const ModalDetailPatient = () => {

  const { openModalDetail, handleCloseModalDetail, patientDetail } = useContext(PatientsContext)

  const { cddocumento, dsnombresYapellidos, fenacimiento, cdgenero, feregistroPersona, febajaPersona,
    cdusuarioPersona, dsdireccion, dsphoto, cdtelefonoFijo, cdtelefonoMovil, dsemail,
    dseps, dsarl, feregistroPaciente, febajaPaciente, cdusuarioPaciente, dscondicion } = patientDetail;

  return (
    <Dialog
      open={openModalDetail}
      onClose={handleCloseModalDetail}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth='sm'
    >
      <DialogTitle id="alert-dialog-title"><Typography variant='h5'>Detalle de pacientes</Typography></DialogTitle>
      <DialogContent>
        <Grid container >
          <ItemDetailPatient title='Documento' dato={cddocumento} />
          <ItemDetailPatient title='Nombres y apellidos' dato={dsnombresYapellidos} />
          <ItemDetailPatient title='Fecha nacimiento' dato={fenacimiento.substring(0, 10)} />
          <ItemDetailPatient title='Genero' dato={cdgenero} />
          <ItemDetailPatient title='Fecha registro' dato={feregistroPersona.substring(0, 10)} />
          <ItemDetailPatient title='Fecha baja persona' dato={febajaPersona.substring(0, 10)} />
          <ItemDetailPatient title='Usuario' dato={cdusuarioPersona} />
          <ItemDetailPatient title='Dirección' dato={dsdireccion} />
          <ItemDetailPatient title='Teléfono fijo' dato={cdtelefonoFijo} />
          <ItemDetailPatient title='teléfono movil' dato={cdtelefonoMovil} />
          <ItemDetailPatient title='Correo electrónico' dato={dsemail} />
          <ItemDetailPatient title='Eps' dato={dseps} />
          <ItemDetailPatient title='Arl' dato={dsarl} />
          <ItemDetailPatient title='Fecha registro paciente' dato={feregistroPaciente.substring(0, 10)} />
          <ItemDetailPatient title='Fecha baja paciente' dato={febajaPaciente.substring(0, 10)} />
          <ItemDetailPatient title='Usuario paciente' dato={cdusuarioPaciente} />
          <ItemDetailPatient title='Condición' dato={dscondicion} />
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModalDetail} variant="outlined">Cerrar</Button>
      </DialogActions>
    </Dialog>
  )
}
