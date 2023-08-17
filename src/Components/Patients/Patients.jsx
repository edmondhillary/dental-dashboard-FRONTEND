import React, { useContext, useEffect, useState } from "react";
import { Table, Input, Button, Skeleton, Tag, Typography, Pagination } from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "../../context/PatientContext/PatientState";
import axios from "axios";

const { Search } = Input;
const { Title } = Typography;

const Patients = () => {
  const navigate = useNavigate();
  const { patient } = useContext(PatientContext);
  const [patients, setPatients] = useState([]);
  const { patientId } = useParams();
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalCount, setTotalCount] = useState(0);

  const fetchData = async (page, size) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios.get(`https://dental-dashboard-backend-production.up.railway.app/pacientes/todos`, {
        params: {
          page: page,
          pageSize: size,
        },
        headers: {
          Authorization: token,
        },
      });
  
      // Formatear nombres y apellidos en mayúsculas
      const formattedPatients = res.data.patients.map(patient => {
        return {
          ...patient,
          firstName: patient.firstName.charAt(0).toUpperCase() + patient.firstName.slice(1),
          lastName: patient.lastName.charAt(0).toUpperCase() + patient.lastName.slice(1),
        };
      });
  
      console.log("soy el clg del SERVICE, ", formattedPatients);
      setPatients(formattedPatients);
      setTotalCount(res.data.totalCount);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    setLoading(true);
    fetchData(currentPage, pageSize);
  }, [searchText, currentPage, pageSize]);

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);
  };

  const handleSearch = (value) => {
    setSearchText(value);
  };

  const handlePageSizeChange = (current, size) => {
    setCurrentPage(1);
    setPageSize(size);
  };

  const capitalize = (text) => {
    if (typeof text !== "string") return "";
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const columns = [
    { 
      title: "Nombre", 
      dataIndex: "firstName", 
      color: "blue",
      render: (text) => <span style={{ 
        textTransform: "capitalize" }}>{text}</span>
    },
    { 
      title: "Apellidos", 
      dataIndex: "lastName" || "secondName", 
      color: "blue",
      render: (text) => <span style={{ textTransform: "capitalize" }}>{text}</span>
    },
    { title: "Email", dataIndex: "email", color: "blue" },
    { title: "Telefono", dataIndex: "phone", color: "magenta" },
    { title: "Direccion", dataIndex: "address", color: "blue" },
  ];

  return (
    <div>
      {loading ? (
        <>
          <div style={{ width: "100%", margin: "3rem" }}>
            <Skeleton active />
            <br />
            <br />
            <Skeleton active />
            <br />
            <br />
            <Skeleton active />
            <br />
            <br />
            <Skeleton active />
          </div>
        </>
      ) : (
        <>
          <Title level={3} style={{ textAlign: "center" , color:'white'}}>
            Lista de Pacientes
          </Title>
          <Table
            style={{ margin: "2rem" }}
            dataSource={patients}
            pagination={false}
            columns={columns?.map((column) => ({
              ...column,
              render: (text) => (
                <span>
                  <Tag color={column?.color}>{text}</Tag>
                </span>
              ),
            }))}
            rowKey={(record) => record?.id}
            onRow={(record) => ({
              onClick: () => {
                console.log(`click en ${record?.firstName}`);
                navigate(`/pacientes/${record?._id}`);
              },
              style: { cursor: "pointer" },
            })}
          />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginTop: "1rem",
            }}
          >
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalCount}
              onChange={handlePageChange}
              onShowSizeChange={handlePageSizeChange}
              showSizeChanger
              pageSizeOptions={["10", "20", "50", "100"]} // Opciones de tamaño de página disponibles
            />
            <br />
            <br />
          </div>
        </>
      )}
    </div>
  );
};

export default Patients;
