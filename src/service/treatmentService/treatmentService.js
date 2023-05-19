import axios from 'axios';
const URL = 'https://dental-dashboard-backend-production.up.railway.app'



export const updateTreatment = async  (values, id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const res = await axios.put(`${URL}/tratamientos/${id}`, values,{
    headers: {
      Authorization: token
    }
  })
  console.log(res)
  return res.data;
}

 const getTreatmentsForPatient = async () => {

        try {
          const token = JSON.parse(localStorage.getItem("token"));
          const response = await axios.get(
            `${URL}/pacientes/${patientInfo?._id}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          console.log(response?.data.treatment);
        } catch (error) {
          console.log(error);
        }
      
    };
    export const deleteTreatment = async  (id) => {
      const token = JSON.parse(localStorage.getItem('token'));
      const res = await axios.delete(`${URL}/tratamientos/${id}`,{
        headers: {
          Authorization: token
        }
      })
    getTreatmentsForPatient()
      console.log(res)
      return res.data;
    }