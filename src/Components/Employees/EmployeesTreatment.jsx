import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Switch } from "antd";
import { Link } from "react-router-dom";
import moment from "moment";

const EmployeeTreatmentsTable = ({ employeeId }) => {
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    const fetchEmployeeTreatments = async () => {
      if(employeeId) {
        try {
          const token = JSON.parse(localStorage.getItem("token"));
          const response = await axios.get(
            `http://localhost:4002/tratamientos/employees/${employeeId}/`,
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
        } catch (error) {
          console.error(error);
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
    <Table columns={columns} dataSource={treatments} />
  );
};

export default EmployeeTreatmentsTable;
