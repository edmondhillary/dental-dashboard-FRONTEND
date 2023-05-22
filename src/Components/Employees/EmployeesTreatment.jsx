import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Switch, Spin } from "antd"; // Asegúrate de importar Spin
import { Link } from "react-router-dom";
import moment from "moment";

const EmployeeTreatmentsTable = ({ employeeId }) => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true); // Agrega un estado para controlar el loading

  useEffect(() => {
    const fetchEmployeeTreatments = async () => {
      if(employeeId) {
        try {
          setLoading(true); // Muestra el spinner antes de hacer la petición
          const token = JSON.parse(localStorage.getItem("token"));
          const response = await axios.get(
            `https://dental-dashboard-backend-production.up.railway.app/tratamientos/employees/${employeeId}/`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          // Agregamos la propiedad key a cada tratamiento
          const treatedData = response?.data?.map((treatment, index) => ({
            ...treatment,
            key: treatment._id + index, // Identificador único para cada tratamiento
          }));
          setTreatments(treatedData);
          setLoading(false); // Oculta el spinner una vez los datos son obtenidos
        } catch (error) {
          console.error(error);
          setLoading(false); // Oculta el spinner si ocurre un error
        }
      }
    };

    fetchEmployeeTreatments();
  }, [employeeId]);
  const columns = [
    {
      title: "Nombre del Paciente",
      dataIndex: "patientName",
      key: "patientName",
      render: (name, record) =>
       {
        
        return (
        <Link to={`/pacientes/${record?.patient?._id}`}>{record?.patient?.firstName + ' ' +  record?.patient?.lastName}</Link>
      )},
    },
    {
        title: "Fecha",
        dataIndex: "date",
        key: "date",
        align: "center",
        render: (date, record) => (
          <span>{moment(record?.createdAt).format("DD/MM/YYYY")}</span>
        ),
      },
    {
      title: "Dientes",
      dataIndex: "teeth",
      key: "teeth",
      align: "center",
    },
    {
      title: "Tipo",
      dataIndex: "type", // Utiliza directamente "type"
      key: "type",
      align: "center",
    },
    {
      title: "Costo con Descuento",
      dataIndex: "cost",
      key: "cost",
      render: (cost) => `${cost.toFixed(2)} € `,
      align: "center",
    },
    {
      title: "Completado",
      align: "center",
      dataIndex: "completed",
      key: "completed",
      render: (completed) => (
        <Switch checked={completed} disabled style={{ backgroundColor: "green" }}/>
      ),
    },
  ];
  
  return (
    <div>
      {loading ? (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table columns={columns} dataSource={treatments} />
      )}
    </div>
  );
};

export default EmployeeTreatmentsTable;