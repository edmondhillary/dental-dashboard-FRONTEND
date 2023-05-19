import { Modal } from 'antd';
import axios from 'axios';

const URL = 'https://dental-dashboard-backend-production.up.railway.app'


export const getAllAppointments = async () => {
    const token  = JSON.parse(localStorage.getItem('token'));

    try{
        const response = await axios.get(`${URL}/citas/citas/all`, {
            headers: {
                Authorization: token
            }
        })
        console.log('soy el clg del serviceDE TODAS LAS CITAAAAAAAAS', response.data);
        return response.data;
    }
    catch(error){
        console.log(error);
    }

}

export const getAppointmentsFromPatient = async (patientId) => {
    const token  = JSON.parse(localStorage.getItem('token'));

    try{
        const response = await axios.get(`${URL}/citas/pacientes/${patientId}/`, {
            headers: {
                Authorization: token
            }
        })
        console.log('soy el clg del service paciente, response', response.data);
        return response.data.consultas;
    }
    catch(error){
        console.log(error);
    }

}
export const getAppointmentsFromEmployee = async (employeeId) => {
    const token  = JSON.parse(localStorage.getItem('token'));

    try{
        const response = await axios.get(`${URL}/citas/empleados/${employeeId}/`, {
            headers: {
                Authorization: token
            }
        })
        console.log('soy el clg del service dell EMPLEADO , response', response.data);
        return response.data.consultas;
    }
    catch(error){
        console.log(error);
    }

}

export const createAppointment = async (appointment) => {
    const token  = JSON.parse(localStorage.getItem('token'));

    try{
        const response = await axios.post(`${URL}/citas`, appointment, {
            headers: {
                Authorization: token
            }
        })
        console.log('soy el clg del service, response', response.data);
        return response.data;
    }
    catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al crear la cita';
        Modal.error({
          title: 'Error',
          content: errorMessage,
        });
      }

}
export const updateAppointment = async (id, appointment) => {
    const token  = JSON.parse(localStorage.getItem('token'));

    try{
        const response = await axios.put(`${URL}/${id}`, appointment, {
            headers: {
                Authorization: token
            }
        })
        console.log('soy el clg del service, response en ACTUALIZACION:', response.data);
        return response.data;
    }
    catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al crear la cita';
        Modal.error({
          title: 'Error',
          content: errorMessage,
        });
      }

}
export const deleteAppointment = async (id) => {
    const token  = JSON.parse(localStorage.getItem('token'));

    try{
        const response = await axios.delete(`${URL}/${id}`, {
            headers: {
                Authorization: token
            }
        })
        console.log('soy el clg del service, response ELIMINADNO!', response.data);
        return response.data;
    }
    catch (error) {
        const errorMessage = error.response?.data?.error || 'Error al crear la cita';
        Modal.error({
          title: 'Error',
          content: errorMessage,
        });
      }

}
