import { Modal } from "antd";
import axios from "axios";

const URL = "https://dental-dashboard-backend-production.up.railway.app";

export const getPatients = async (firstName, lastName) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.get(
    `${URL}/pacientes?firstName=${firstName}&lastName=${lastName}`,
    {
      headers: {
        Authorization: token,
      },
    }
  );
  console.log("soy el clg del SERVICE, ", res.data);
  return res.data;
};

export const createPatient = async (patient) => {
  try {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.post(URL + "/pacientes/", patient, {
      headers: {
        Authorization: token,
      },
    });
    return res.data;
  } catch (error) {
    const errorMessage = error.response.data
    if (error.response.data) {
      Modal.error({
        title: "Error: ",
        content: errorMessage,
      });

      // Aquí puedes mostrar el mensaje de error en un modal o realizar cualquier otra acción
      console.error(errorMessage);
    } else {
      console.error("Error al crear el paciente:", error);
    }
    throw error;
  }
};

export const getPatientById = (id) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = axios.get(`${URL}/pacientes/${id}`, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};
export const updatePatient = async (id, patient) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.put(`${URL}/pacientes/${id}`, patient, {
    headers: {
      Authorization: token,
    },
  });
  return res.data;
};
export const searchByDisplayName = async (displayName) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const res = await axios.get(`${URL}/pacientes?displayName=${displayName}`, {
    headers: {
      Authorization: token,
    },
  });
  console.log(res.data);
  return res.data;
};
