import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "antd";
import { Link } from "react-router-dom";

const UnpaidPatientsTable = () => {
  const [patients, setPatients] = useState([]);

  useEffect(() => {
    const fetchUnpaidPatients = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          "http://localhost:4002/presupuestos/patients/unpaid",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setPatients(response?.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchUnpaidPatients();
  }, []);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "displayName",
      key: "displayName",
      render: (text, record) => (
        <Link to={`/pacientes/${record?.patientId}`}>{text}</Link>
      ),
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
    {
      title: "Deuda",
      dataIndex: "totalDebt",
      key: "totalDebt",
      render: (debt) => `$${debt.toFixed(2)}`,
    },
  ];

  return (
    <Table style={{ margin: "3rem" }} columns={columns} dataSource={patients} />
  );
};

export default UnpaidPatientsTable;
