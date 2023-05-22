import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin, Table } from "antd";
import { Link } from "react-router-dom";

const UnpaidPatientsTable = () => {
  const [patients, setPatients] = useState([]);
    const [loading,setLoading] = useState(true);
  useEffect(() => {
    const fetchUnpaidPatients = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          "https://dental-dashboard-backend-production.up.railway.app/presupuestos/patients/unpaid",
          {
            headers: {
              Authorization: token,
            },
          }
        );
        setPatients(response?.data);
        setLoading(false)
      } catch (error) {
        console.error(error);
        setLoading(false);
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
    <Spin spinning={loading}>

    <Table pagination={{ pageSize: 25 }} style={{ margin: "3rem" }} columns={columns} dataSource={patients} />
    </Spin>
  );
};

export default UnpaidPatientsTable;
