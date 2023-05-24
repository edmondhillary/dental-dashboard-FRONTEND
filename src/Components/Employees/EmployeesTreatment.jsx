import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Switch, Spin, Divider } from "antd"; // Asegúrate de importar Spin
import { Link } from "react-router-dom";
import moment from "moment";
import { Pagination } from "antd";

const EmployeeTreatmentsTable = ({ employeeId }) => {
  const [treatments, setTreatments] = useState([]);
  const [loading, setLoading] = useState(true); // Agrega un estado para controlar el loading
  const [total, setTotal] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    const fetchEmployeeTreatments = async () => {
      if (employeeId) {
        try {
          setLoading(true);
          const token = JSON.parse(localStorage.getItem("token"));
          const response = await axios.get(
            `https://dental-dashboard-backend-production.up.railway.app/tratamientos/employees/${employeeId}/?page=${pageNumber}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          const treatedData = response?.data?.treatments?.map(
            (treatment, index) => ({
              ...treatment,
              key: treatment._id + index,
            })
          );
          setTreatments(treatedData);
          console.log(response?.data)
          setTotal(response?.data.totalPages );
          setLoading(false);
        } catch (error) {
          console.error(error);
          setLoading(false);
        }
      }
    };

    fetchEmployeeTreatments();
  }, [employeeId, pageNumber]);

  const columns = [
    {
      title: "Nombre del Paciente",
      dataIndex: "patientName",
      key: "patientName",
      render: (name, record) => {
        return (
          <Link to={`/pacientes/${record?.patient?._id}`}>
            {record?.patient?.firstName + " " + record?.patient?.lastName}
          </Link>
        );
      },
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
        <Switch
          checked={completed}
          disabled
          style={{ backgroundColor: "green" }}
        />
      ),
    },
  ];

  return (
    <div>
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Spin size='large' />
        </div>
      ) : (
        <>
          <Table columns={columns} dataSource={treatments} pagination={false} />
          <Divider />  {/* Añade el Divider aquí */}
          <div style={{ textAlign: "right" }}>  {/* Alinea la paginación a la derecha */}
            <Pagination
              current={pageNumber}
              onChange={(page) => setPageNumber(page)}
              total={total * 15}
              pageSize={15}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default EmployeeTreatmentsTable;
