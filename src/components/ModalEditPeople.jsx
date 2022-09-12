import React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Typography from '@mui/material/Typography';
import { PeopleContext } from '../context/PeopleContext';
import { MasterContext } from '../context/MasterContext';
import { useContext } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import { useEffect } from 'react';
import { EPS, ARL } from '../config/config';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
import Checkbox from '@mui/material/Checkbox';

export const ModalEditPeople = () => {

    const {
        openModalEditPeople,
        handleCloseModalEditPeople,
        formStatePeople,
        onChangeFormState,
        onChangeType,
        onChangeGender,
        onDrop,
        postPeople,
        putPeople,
        dataPaciente,
        onChangeEps,
        onChangeArl,
        onChangeDataPaciente,
        isPatient,
        getTerminate
    } = useContext(PeopleContext);

    const { masters, getMasters } = useContext(MasterContext);

    useEffect(() => {
        getMasters();
    }, [])


    return (
        <Dialog
            open={openModalEditPeople}
            onClose={handleCloseModalEditPeople}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth='md'
        >
            <DialogTitle id="alert-dialog-title">
                <Typography variant='h5'>Editar Personas</Typography>
            </DialogTitle>

            <DialogContent style={{ paddingTop: '10px' }}>
                <form onSubmit={(e) => {
                    e.preventDefault();
                    putPeople();
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
                            onChangeType(value);
                            console.log(masters);
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
                                <FormControlLabel value="femenino" checked={formStatePeople.gender === 'FEMENINO' ? true : false} control={<Radio />} label="Femenino" />
                                <FormControlLabel value="masculino" checked={formStatePeople.gender === 'MASCULINO' ? true : false} control={<Radio />} label="Masculino" />
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

                    {formStatePeople.photo === null ?
                        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <Button variant="contained" component="label">
                                Subir foto
                                <input hidden accept="image/*" multiple type="file"
                                    onChange={(event) => onDrop(event.target.files[0])} />
                            </Button>
                        </Grid>
                        :
                        <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <Button variant="contained" component="label">
                                Repetir foto
                                <input hidden accept="image/*" multiple type="file"
                                    onChange={(event) => onDrop(event.target.files[0])} />
                            </Button>
                        </Grid>
                    }

                    <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ paddingTop: '1cm', paddingBottom: '1cm' }}>
                        {formStatePeople.photo === null ? <ImageNotSupportedIcon fontSize='large' /> : <img src={`data:image/jpeg;base64,${formStatePeople.photo}`} width='400' height='200' />}
                    </Grid>


                    {/* Información paciente */}

                    <Grid hidden={isPatient.dsdato === 'Paciente' ? false : true}>
                        <Divider sx={{ marginTop: 3, marginBottom: 3 }} />
                        <Autocomplete
                            value={dataPaciente.eps}
                            noOptionsText={'No hay opciones'}
                            onChange={(event, value) => {
                                onChangeEps(value);
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
                                console.log(value);
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

                    <Typography align='center' mt={2}>
                        <FormControlLabel
                            
                            control={<Checkbox
                            checked={formStatePeople.terminate ? true : false}
                                value={formStatePeople.terminate}
                                onChange={(event, value) => {
                                    getTerminate(value)}
                                }
                            />}
                            label="¿Dar de baja?"
                            labelPlacement="end"
                            

                        />
                    </Typography>

                    <DialogActions>
                        <Button onClick={handleCloseModalEditPeople} variant="outlined">Cerrar</Button>
                        <Button type='submit' variant="contained">
                            Actualizar
                        </Button>
                    </DialogActions>
                </form>
            </DialogContent>

        </Dialog>
    )
}
