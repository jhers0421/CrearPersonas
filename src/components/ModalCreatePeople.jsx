import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { PeopleContext } from '../context/PeopleContext';
import { MasterContext } from '../context/MasterContext';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import ImageUploader from "react-images-upload";
import { useEffect } from 'react';
import { EPS, ARL } from '../config/config';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';

export const ModalCreatePeople = () => {

  const {
    openModalCreatePeople,
    handleCloseModalCreatePeople,
    formStatePeople,
    onChangeFormState,
    onChangeType,
    onChangeGender,
    onDrop,
    postPeople,
    isPaciente,
    dataPaciente,
    onChangeEps,
    onChangeArl,
    onChangeDataPaciente
  } = useContext(PeopleContext);

  const { masters, getMasters } = useContext(MasterContext);

  useEffect(() => {
    getMasters();
  }, []) // eslint-disable-next-line react-hooks/exhaustive-deps


  return (
    <Dialog
      open={openModalCreatePeople}
      onClose={handleCloseModalCreatePeople}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth='md'
    >
      <DialogTitle id="alert-dialog-title"><Typography variant='h5'>Registro de Personas</Typography></DialogTitle>
      <DialogContent style={{paddingTop:'10px'}}>
        <form onSubmit={(e) => {
          e.preventDefault();
          postPeople();
        }} >
          <TextField
            value={formStatePeople.document}
            variant="outlined"

            label='Documento'
            fullWidth
            size='small'
            name='document'
            onChange={onChangeFormState}
          />
          <TextField
            sx={{ marginTop: 2 }}
            value={formStatePeople.name}
            variant="outlined"

            label='Nombres'
            size='small'
            fullWidth
            name='name'
            onChange={onChangeFormState}
          />
          <TextField
            sx={{ marginTop: 2 }}
            value={formStatePeople.lastName}
            variant="outlined"

            label='Apellidos'
            size='small'
            fullWidth
            name='lastName'
            onChange={onChangeFormState}
          />
          <Typography sx={{ marginTop: 2 }}>Fecha de nacimiento</Typography>
          <TextField
            value={formStatePeople.birthDate}
            variant="outlined"
            type='date'

            size='small'
            fullWidth
            name='birthDate'
            onChange={onChangeFormState}
          />
          <Autocomplete
            value={formStatePeople.type}
            noOptionsText={'No hay opciones'}
            onChange={(event, value) => {
              onChangeType(value)
            }}
            options={masters}
            getOptionLabel={(option) => option.dsdato}
            renderInput={(params) =>
              <TextField
                {...params}
                autoComplete='off'
                size="small"
                margin="normal"
                variant="outlined"
                label="Tipo persona"
                fullWidth
              />
            }
          />
          <Typography align='center' mt={2}>
            <FormControl>
              <FormLabel id="demo-row-radio-buttons-group-label">Genero</FormLabel>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
                onChange={(e, value) => onChangeGender(value)}
              >
                <FormControlLabel value="femenino" control={<Radio />} label="Femenino" />
                <FormControlLabel value="masculino" control={<Radio />} label="Masculino" />
              </RadioGroup>
            </FormControl>
          </Typography>

          <TextField
            sx={{ marginTop: 2 }}
            value={formStatePeople.user}
            variant="outlined"
            label='Usuario'

            size='small'
            fullWidth
            name='user'
            onChange={onChangeFormState}
          />
          <TextField
            sx={{ marginTop: 2 }}
            value={formStatePeople.direction}
            variant="outlined"
            label='Dirección'

            size='small'
            fullWidth
            name='direction'
            onChange={onChangeFormState}
          />
          <TextField
            sx={{ marginTop: 2 }}
            value={formStatePeople.phone}
            variant="outlined"
            label='Teléfono'

            size='small'
            fullWidth
            name='phone'
            onChange={onChangeFormState}
          />
          <TextField
            sx={{ marginTop: 2 }}
            value={formStatePeople.MobilePhone}
            variant="outlined"
            label='Teléfono movil'

            size='small'
            fullWidth
            name='MobilePhone'
            onChange={onChangeFormState}
          />
          <TextField
            sx={{ marginTop: 2 }}
            value={formStatePeople.email}
            variant="outlined"
            label='Correo electrónico'
            size='small'

            fullWidth
            name='email'
            onChange={onChangeFormState}
          />

          <div style={{ marginRight: "15px" }}>
            <ImageUploader
              withIcon={false}
              withPreview={true}
              label=""
              buttonText="Subir foto"
              onChange={onDrop}
              imgExtension={[".jpg", ".gif", ".png", ".gif", ".svg"]}
              maxFileSize={1048576}
              fileSizeError=" file size is too big"
            />
          </div>

          {/* Información paciente */}

          <Grid hidden={!isPaciente}>
            <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
            <Autocomplete
              value={dataPaciente.eps}
              noOptionsText={'No hay opciones'}
              onChange={(event, value) => {
                onChangeEps(value)
              }}
              options={EPS}
              getOptionLabel={(option) => option.eps}
              renderInput={(params) =>
                <TextField
                  {...params}
                  autoComplete='off'
                  size="small"
                  margin="normal"
                  variant="outlined"
                  label="Eps"
                  fullWidth
                />
              }
            />
            <Autocomplete
              value={dataPaciente.arl}
              noOptionsText={'No hay opciones'}
              onChange={(event, value) => {
                onChangeArl(value);
              }}
              options={ARL}
              getOptionLabel={(option) => option.arl}
              renderInput={(params) =>
                <TextField

                  {...params}
                  autoComplete='off'
                  size="small"
                  margin="normal"
                  variant="outlined"
                  label="Arl"
                  fullWidth
                />
              }
            />
            <TextField
              sx={{ marginTop: 2 }}
              value={dataPaciente.user}
              variant="outlined"
              label='Usuario'
              size='small'
              fullWidth
              name='user'
              onChange={onChangeDataPaciente}
            />
            <TextField
              sx={{ marginTop: 2 }}
              value={dataPaciente.condition}
              variant="outlined"
              label='Condición'
              size='small'
              fullWidth
              name='condition'
              onChange={onChangeDataPaciente}
            />
          </Grid>
          <DialogActions>
            <Button onClick={handleCloseModalCreatePeople} variant="outlined">Cerrar</Button>
            <Button type='submit' variant="contained">
              Guardar
            </Button>
          </DialogActions>
        </form>
      </DialogContent>

    </Dialog>
  )
}
