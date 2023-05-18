import axios from 'axios';

export const createTreatment = async  (values) => {
const token = JSON.parse(localStorage.getItem('token'));
const res = await axios.post('http://localhost:4002/tratamientos', values,{
    headers: {
      Authorization: token
    }
  })
  console.log(res)
  return res.data;
}
export const updateTreatment = async  (values, id) => {
  const token = JSON.parse(localStorage.getItem('token'));
  const res = await axios.put(`http://localhost:4002/tratamientos/${id}`, values,{
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
            `http://localhost:4002/pacientes/${patientInfo?._id}`,
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
      const res = await axios.delete(`http://localhost:4002/tratamientos/${id}`,{
        headers: {
          Authorization: token
        }
      })
    getTreatmentsForPatient()
      console.log(res)
      return res.data;
    }