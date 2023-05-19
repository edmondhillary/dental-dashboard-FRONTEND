import axios from 'axios';
const URL = 'https://dental-dashboard-backend-production.up.railway.app';

export async function getEmployees(){
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.get(`${URL}/empleados`, {
        headers: { Authorization: token }
    });
    console.log(res.data)
    return res.data;

}
export async function getEmployeeByID(id){
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.get(`${URL}/empleados/id/${id}`, {
        headers: { Authorization: token }
    });
    console.log(res.data
        )
    return res.data;
}

export async function getEmployeesByDisplayName(displayName){
    const token = JSON.parse(localStorage.getItem('token'));
    const res = await axios.get(`${URL}/empleados/busqueda?displayName=${displayName}`, {
        headers: { Authorization: token }
    });
    console.log(res.data
        )
    return res.data;
}