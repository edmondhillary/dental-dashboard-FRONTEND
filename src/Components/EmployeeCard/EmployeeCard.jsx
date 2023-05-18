import { Card } from "antd";
import React from "react";

function EmployeeCard({ employee }) {
  return (
    <Card style={{margin: '2rem',
    marginBottom: '2rem',
    }} title={`${employee?.displayName}`}>
      <p>Email: {employee?.email}</p>
      <p>Teléfono: {employee?.phone}</p>
      <p>Dirección: {employee?.address}</p>
      {/* <p>Proxima cita: {employee?.appo}</p> */}
      <p>Telefono: {employee?.phone}</p>
      <p>Especialidad: {employee?.speciality}</p>
      <p>Tratamientos:{employee?.treatments.length}</p>
      {/* <ul>
        {employee?.treatments.map((treatment) => (
          <li key={treatment?._id}>
            Nombre: {treatment?.type}, Costo:{" "}
            {treatment?.cost}
          </li>
        ))}
      </ul> */}

      <p>Pacientes: {employee?.patients.length}</p>
      {/* <ul>
        {employee?.patients.map((patient) => (
          <li key={patient?._id}>
            Nombre: {patient?.firstName}, Edad: {patient?.edad}, Teléfono:{" "}
            {patient?.phone}
          </li>
        ))} */}
      {/* </ul> */}
    </Card>
  );
}

export default EmployeeCard;
