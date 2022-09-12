import React from 'react'
import { useState } from 'react';
import { URL } from '../config/config';
import { MasterContext } from '../context/MasterContext';

export const MasterProvider = ({ children }) => {

  const [masters, setMasters] = useState([]);


  const getMasters = () => {
    fetch(`${URL}/Masterdata/selectdataMaster`)
      .then(response => response.json())
      .then(response => setMasters(response));
  }



  return (
    <MasterContext.Provider
      value={{
        masters,
        getMasters
      }}
    >
      {children}
    </MasterContext.Provider>
  )
}
