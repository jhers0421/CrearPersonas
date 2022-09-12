import React, { useState } from 'react'
import { PeopleContext } from '../context/PeopleContext';
import { URL } from '../config/config';

export const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState([])
  const [isPatient, setIsPatient] = useState([])
  const [isPaciente, setIsPaciente] = useState(false);
  const [openModalEditPeople, setOpenModalEditPeople] = React.useState(false);
  const [openModalCreatePeople, setOpenModalCreatePeople] = React.useState(false);
  const [formStatePeople, setformStatePeople] = useState({
    nmid: null,
    document: "",
    name: "",
    lastName: "",
    birthDate: null,
    type: null,
    gender: "",
    user: "",
    direction: "",
    photo: [],
    phone: "",
    MobilePhone: "",
    email: "",
    terminate: false
  });

  const [dataPaciente, setDataPaciente] = useState({
    nmindPersona: '',
    eps: null,
    arl: null,
    user: '',
    condition: ''
  });

  const searchpeople = (document) => {
    fetch(`${URL}/People/searchpeople/${document}`)
      .then(response => response.json())
      .then(response => {
        console.log(response[0].peopleDto[0].nmid);
        setIsPatient(response[0].masterdataDto[0])
        loadInformation(
          response[0].peopleDto[0].nmid,
          response[0].peopleDto[0].cddocumento,
          response[0].peopleDto[0].dsnombres,
          response[0].peopleDto[0].dsapellidos,
          response[0].peopleDto[0].fenacimiento,
          response[0].masterdataDto[0],
          response[0].peopleDto[0].cdgenero,
          response[0].peopleDto[0].cdusuario,
          response[0].peopleDto[0].dsdireccion,
          response[0].peopleDto[0].cdtelefonoFijo,
          response[0].peopleDto[0].cdtelefonoMovil,
          response[0].peopleDto[0].dsemail,
          response[0].peopleDto[0].dsphoto,
          response[0].peopleDto[0].darBaja,
        );
        if (response[0].patientsDto.length !== 0) {
          loadInformationPatients(response[0].patientsDto[0].cdusuario, response[0].patientsDto[0].dscondicion,
            response[0].patientsDto[0].dseps, response[0].patientsDto[0].dsarl
          );
        }
      });
  }

  const loadInformationPatients = (user, condition, dseps, dsarl) => {
    setDataPaciente({
      ...dataPaciente,
      eps: { eps: dseps },
      arl: { arl: dsarl },
      user,
      condition
    })
  }

  const getTerminate = (terminate) => {
    setformStatePeople({
      ...formStatePeople,
      terminate
    });
  }

  const loadInformation = (nmid, document, name, lastName, birthDate, type, gender, user, direction, phone, MobilePhone, email, photo, terminate) => {
    setformStatePeople({
      nmid, document, name, lastName, birthDate: birthDate.substring(0,10), type, gender, user, direction, phone, MobilePhone, email, photo, terminate
    });    
  }

  const handleClickOpenModalCreatePeople = () => {
    setOpenModalCreatePeople(true);
  };

  const handleCloseModalCreatePeople = () => {
    cleanFormState();
    setOpenModalCreatePeople(false);
  };

  const handleClickOpenModalEditPeople = () => {
    setOpenModalEditPeople(true);
  };

  const handleCloseModalEditPeople = () => {
    cleanFormState();
    setOpenModalEditPeople(false);
  };

  const cleanFormState = () => {
    setformStatePeople({
      document: "",
      name: "",
      lastName: "",
      birthDate: "",
      type: null,
      gender: "",
      user: "",
      direction: "",
      photo: [],
      phone: "",
      MobilePhone: "",
      email: ""
    });

    setDataPaciente({
      nmindPersona: '',
      eps: null,
      arl: null,
      user: '',
      condition: ''
    })
  }

  const onChangeFormState = ({ target }) => {
    const { name, value } = target;
    setformStatePeople({
      ...formStatePeople,
      [name]: value
    })
  }

  const getPeople = () => {
    fetch(`${URL}/people/indexpeople`)
      .then(response => response.json())
      .then(response => setPeople(response));
  }

  const onChangeGender = (gender) => {
    setformStatePeople({
      ...formStatePeople,
      gender
    })
  }

  const onDrop = (e) => {
    setFoto(e);
  }

  const setFoto = (x) => {
    var reader = new FileReader();
    reader.readAsDataURL(x);
    reader.onload = function () {
      var base64 = reader.result;
      var A = base64.split(",")[1];
      setformStatePeople({
        ...formStatePeople,
        photo: A
      });
    }
  }

  const onChangeEps = (eps) => {
    setDataPaciente({
      ...dataPaciente,
      eps
    })
  }

  const onChangeArl = (arl) => {
    setDataPaciente({
      ...dataPaciente,
      arl
    })
  }

  const onChangeInfoPaciente = (eps, arl, nmindPersona, cdusuario, dscondicion) => {
    setDataPaciente({
      ...dataPaciente,
      nmindPersona,
      eps: { eps: eps },
      arl: { arl: arl },
      user: cdusuario,
      condition: dscondicion,
      darBaja: false
    })
  }

  const onChangeType = (type) => {
    setformStatePeople({
      ...formStatePeople,
      type
    });

    let dato = type.dsdato.toUpperCase();
    if (dato.includes('PACI')) {
      setIsPaciente(true);
      fetch(`${URL}/Patients/searchpatients/${formStatePeople.document}`)
        .then(response => response.json())
        .then(response => {
          if (response.length !== 0) {
            onChangeInfoPaciente(
              response[0]['dseps'],
              response[0]['dsarl'],
              '',
              response[0]['cdusuario'],
              response[0]['dscondicion']
            );
          }
        });
    }
    else setIsPaciente(false)
  }

  const putPeople = () => {

    console.log(formStatePeople.nmid)
    const {
      nmid: nmid,
      document: cddocumento,
      name: dsnombres,
      lastName: dsapellidos,
      birthDate: fenacimiento,
      type,
      gender: cdgenero,
      user: cdusuario,
      direction: dsdireccion,
      photo: dsphoto,
      phone: cdtelefonoFijo,
      MobilePhone: cdtelefonoMovil,
      email: dsemail,
      terminate: darBaja
    } = formStatePeople;

    const data = {
      cddocumento,
      dsnombres,
      dsapellidos,
      fenacimiento,
      cdtipo: type.nmdato,
      cdgenero: cdgenero.toUpperCase(),
      feregistro: new Date(),
      febaja: null,
      cdusuario,
      dsdireccion,
      dsphoto: dsphoto,
      cdtelefonoFijo,
      cdtelefonoMovil,
      dsemail,
      darBaja 
    }
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };
    fetch(`${URL}/people?Nmid=${nmid}`, requestOptions)
    .then(response => response.json())
    .then(response => { 
      handleCloseModalEditPeople();
      if(response[0].respuesta === 'Actualización exitosa'){
        let dato = type.dsdato.toUpperCase()
        if(dato.includes('PACIENTE')){

          let data1 = {
            nmind: 0,
            nmindPersona: response[0].nmid,
            nimdMedicotra: null,
            dseps: dataPaciente.eps.eps,
            dsarl: dataPaciente.arl.arl,
            feregistro: new Date(),
            febaja: null,
            cdusuario: dataPaciente.user,
            dscondicion: dataPaciente.condition,
            darBaja: formStatePeople.terminate
          }
          const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data1)
          };
          fetch(`${URL}/Patients?nmind_persona=${response[0].nmid}`, requestOptions)
            .then(response => response.json())
            .then(response => {
              alert(response[0]['respuesta'])
            })
        } else {
          alert(response[0].respuesta)
        }
      }
    })
  }

  const postPeople = () => {
    const {
      document: cddocumento,
      name: dsnombres,
      lastName: dsapellidos,
      birthDate: fenacimiento,
      type,
      gender: cdgenero,
      user: cdusuario,
      direction: dsdireccion,
      photo: dsphoto,
      phone: cdtelefonoFijo,
      MobilePhone: cdtelefonoMovil,
      email: dsemail
    } = formStatePeople;

    const data = {
      cddocumento,
      dsnombres,
      dsapellidos,
      fenacimiento,
      cdtipo: type.nmdato,
      cdgenero: cdgenero.toUpperCase(),
      feregistro: new Date(),
      febaja: null,
      cdusuario,
      dsdireccion,
      dsphoto: dsphoto,
      cdtelefonoFijo,
      cdtelefonoMovil,
      dsemail,
      darBaja: null
    }

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    };

    fetch(`${URL}/people`, requestOptions)
      .then(response => response.json())
      .then(response => {
        handleCloseModalCreatePeople();
        if (!response[0].nmid) {
          alert(response[0].respuesta)
        } else {
          let dato = type.dsdato.toUpperCase();
          if (dato.includes('PACI')) {
            let data1 = {
              nmind: 0,
              nmindPersona: response[0]['nmid'],
              nimdMedicotra: null,
              dseps: dataPaciente.eps.eps,
              dsarl: dataPaciente.arl.arl,
              feregistro: new Date(),
              febaja: null,
              cdusuario: dataPaciente.user,
              dscondicion: dataPaciente.condition,
              darBaja: null
            }
            const requestOptions = {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(data1)
            };
            fetch(`${URL}/Patients`, requestOptions)
              .then(response => response.json())
              .then(response => {
                alert(response[0]['respuesta'])
              })
          } else {
            alert(response[0].respuesta)
          }
        }
        getPeople();
      });
  }

  const onChangeDataPaciente = ({ target }) => {
    const { name, value } = target;
    setDataPaciente({
      ...dataPaciente,
      [name]: value
    })
  }

  return (
    <PeopleContext.Provider
      value={{
        openModalCreatePeople,
        openModalEditPeople,
        formStatePeople,
        people,
        isPaciente,
        dataPaciente,
        isPatient,
        handleClickOpenModalCreatePeople,
        handleCloseModalCreatePeople,
        handleClickOpenModalEditPeople,
        handleCloseModalEditPeople,
        onChangeFormState,
        getPeople,
        onChangeType,
        onChangeGender,
        onDrop,
        postPeople,
        putPeople,
        onChangeEps,
        onChangeArl,
        onChangeDataPaciente,
        searchpeople,
        getTerminate
      }}
    >
      {children}
    </PeopleContext.Provider>
  )
}
