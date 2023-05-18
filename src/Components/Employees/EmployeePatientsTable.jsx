import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { Link } from "react-router-dom";

const EmployeePatientsTable = ({ employeeId }) => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchEmployeePatients = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await axios.get(
          `http://localhost:4002/pacientes/employee/${employeeId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        // Agregamos la propiedad key a cada paciente
        const treatedData = response?.data?.map((patient, index) => ({
          ...patient,
          key: patient._id + index, // Identificador único para cada paciente
        }));
        setPatients(treatedData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchEmployeePatients();
  }, [employeeId]);
  
    const columns = [
      {
        title: "Nombre",
        dataIndex: "displayName",
        key: "displayName",
        render: (name, record) => {
            console.log({record})
            return (
          <Link to={`/pacientes/${record?._id}`}>{name}</Link>
        )},
      },
      {
        title: "Correo electrónico",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Teléfono",
        dataIndex: "phone",
        key: "phone",
      },
      // Agrega más columnas según tus necesidades
    ];
  
    return <Table columns={columns} dataSource={patients} />;
  };
  
  export default EmployeePatientsTable;
  