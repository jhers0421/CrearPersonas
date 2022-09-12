import React from 'react'
import { useState } from 'react';
import { PatientsContext } from '../context/PatientsContext';
import { URL } from '../config/config';

export const PatientsProvider = ({ children }) => {

  const [patients, setPatients] = useState([]);
  const [patientDetail, setPatientDetail] = useState(
    {
      cddocumento: "",
      dsnombresYapellidos: "",
      fenacimiento: "",
      cdgenero: "",
      feregistroPersona: "",
      febajaPersona: "",
      cdusuarioPersona: "",
      dsdireccion: "",
      dsphoto: "",
      cdtelefonoFijo: "",
      cdtelefonoMovil: "",
      dsemail: "",
      dseps: "",
      dsarl: "",
      feregistroPaciente: "",
      febajaPaciente: "",
      cdusuarioPaciente: "",
      dscondicion: ""
    });

  const [openModalDetail, setOpenModalDetail] = React.useState(false);

  const handleClickOpenModalDetail = () => {
    setOpenModalDetail(true);
  };

  const handleCloseModalDetail = () => {
    setOpenModalDetail(false);
  };

  const getPatients = () => {
    fetch(`${URL}/Patients/indexpatients`)
      .then(response => response.json())
      .then(response => setPatients(response));
  }

  const getPatientDetail = (nmind) => {
    fetch(`${URL}/Patients/patientfullinfo/${nmind}`)
      .then(response => response.json())
      .then(response => {
        setPatientDetail(response[0])
        setTimeout(() => {
          handleClickOpenModalDetail();
        }, 200);
      });

  }

  return (
    <PatientsContext.Provider
      value={{
        patients,
        openModalDetail,
        patientDetail,
        getPatients,
        handleClickOpenModalDetail,
        handleCloseModalDetail,
        getPatientDetail
      }}
    >
      {children}
    </PatientsContext.Provider>
  )
}
