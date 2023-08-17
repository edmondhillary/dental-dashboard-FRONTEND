import React, { useEffect, useState } from "react";
import axios from "axios";
import { Spin, Table } from "antd";
import { Link } from "react-router-dom";
import { LoadingOutlined } from "@ant-design/icons";

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
      dataIndex: "firstName",
      key: "displayName",
      render: (text, record) => (
        <Link to={`/pacientes/${record?.patientId}`}>{text}</Link>
      ),
    },
    {
      title: "Apellidos",
      dataIndex: "lastName",
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
  const loadingIcon = <LoadingOutlined style={{ fontSize: 44 }} spin />;

  return (
    loading 
      ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh', marginTop:'6rem' }}>
          <Spin indicator={loadingIcon} />
        </div>
      : <Table 
          pagination={{ pageSize: 25 }} 
          style={{ margin: "3rem" }} 
          columns={columns} 
          dataSource={patients} 
        />
  );
  
};

export default UnpaidPatientsTable;