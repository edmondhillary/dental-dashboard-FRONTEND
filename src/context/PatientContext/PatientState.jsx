import React, { createContext, useReducer } from 'react'
import PatientReducer from './PatientReducer.js'
import axios from 'axios'

export const URL = 'http://localhost:4002/pacientes'

const initialState = {

  patient:null,
  patients: []

};

export const PatientContext = createContext(initialState);

export const PatientsProvider = ({ children }) => {
  const [state, dispatch] = useReducer(PatientReducer, initialState);

  const addPatient = async (newPatient) => {
    const res = await axios.post(URL + '/', newPatient);
    dispatch({
      type: 'ADD_PATIENT',
      payload: res.data,
    });
  };



  const editPatient = async (patient, id) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.put(URL + `/${id}`, patient, {
      headers: {
        Authorization: token
      }
    });
    dispatch({
      type: 'EDIT_PATIENT',
      payload: res.data,
    });

    return res;
  }
  const getPatients = async () => {
  
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.get(URL + '/', {
      headers: {
        Authorization: token
      }
    });
    dispatch({
      type: 'GET_PATIENTS',
      payload: res.data,
    });

    return res;
  }
  const deletePatient = async (id) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.delete(URL + `/${id}`, {
      headers: {
        Authorization: token
      }
    });
    dispatch({
      type: 'DELETE_PATIENT',
      payload: res.data,
    });

    return res;
  }
  const getPatientById = async (id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const res = await axios.get(URL + `/${id}`, {
    headers: {
      Authorization: token
    }
  });
  dispatch({
    type: 'GET_PATIENT_BY_ID',
    payload: res.data,
  });
  }
  return (
    <PatientContext.Provider
      value={{
        patients: state.patients,
        patient: state.patient,   
        getPatients,     
        editPatient,
        deletePatient,
        getPatientById,
        addPatient
      }}
    >
      {children}
    </PatientContext.Provider>
  )
}
