import axios from "axios";

const API_URL = "https://dental-dashboard-backend-production.up.railway.app";

export const getBudgetsByPatient = async (patientId) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const response = await axios.get(`${API_URL}/presupuestos/paciente/${patientId}`, {
    headers: {
      Authorization: token,
    },
  });
//   console.log('getBudgets',response.data)
  return response.data;
};

export const getBudgetsByEmployee = async (employeeId) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const response = await axios.get(`${API_URL}/presupuestos/empleado/${employeeId}`, {
      headers: {
        Authorization: token,
      },
    });
    return response.data;
  };


//   console.log('getBudgets',response.data)