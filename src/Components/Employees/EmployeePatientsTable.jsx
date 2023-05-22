import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spin } from "antd";
import { Link } from "react-router-dom";

const EmployeePatientsTable = ({ employeeId }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployeePatients = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await axios.get(
          `https://dental-dashboard-backend-production.up.railway.app/pacientes/employee/${employeeId}`,
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
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
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
        console.log({ record });
        return <Link to={`/pacientes/${record?._id}`}>{name}</Link>;
      },
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

  return (
    <Spin spinning={loading}>
      <Table columns={columns} dataSource={patients} />
    </Spin>
  );
};

export default EmployeePatientsTable;
