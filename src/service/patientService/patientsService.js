import axios from 'axios';

export const getPatients = async (firstName, lastName) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const res = await axios.get(`http://localhost:4002/pacientes?firstName=${firstName}&lastName=${lastName}`, {
    headers: {
      Authorization: token,
    },
  });
  console.log('soy el clg del SERVICE, ', res.data)
  return res.data;
};


  export const createPatient = async (patient) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.post('http://localhost:4002/pacientes/', patient, {
      headers: {
        Authorization: token
      }
    });
    return res.data;
  }
  export const getPatientById = (id)=>{
    const token = JSON.parse(localStorage.getItem('token'));
    const res = axios.get(`http://localhost:4002/pacientes/${id}`, {
      headers: {
        Authorization: token
      }
    });
    return res.data;
  }
  export const updatePatient = async (id, patient) => {

    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.put(`http://localhost:4002/pacientes/${id}`, patient, {
      headers: {
        Authorization: token
      }
    });
    return res.data;
  }
  export const searchByDisplayName = async (displayName) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.get(`http://localhost:4002/pacientes?displayName=${displayName}`, {
      headers: {
        Authorization: token
      }
    });
    console.log(res.data)
    return res.data;
  }