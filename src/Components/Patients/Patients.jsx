import React, { useContext, useEffect, useState } from "react";
import { getPatients } from "../../service/patientService/patientsService";
import { Table, Input, Button, Skeleton, Tag, Typography } from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "../../context/PatientContext/PatientState";

const { Search } = Input;
const { Title } = Typography;
const Patients = () => {
  const navigate = useNavigate();
  const { patient } = useContext(PatientContext);
  const [patients, setPatients] = useState([]);
  const { patientId } = useParams();
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getPatients("", searchText)
      .then((res) => {
        console.log("reeeeeeees REEEEEEEEEE", res);
        setPatients(res);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
  }, [searchText]);

  const columns = [
    { title: "Nombre", dataIndex: "displayName" , color: "blue"},
    { title: "Email", dataIndex: "email" , color: "blue"},
    { title: "Telefono", dataIndex: "phone", color: "magenta" },
    { title: "Direccion", dataIndex: "address" , color: "blue"},
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
         <Title level={3} style={{ textAlign: "center" }}>Lista de Pacientes</Title>
        <Table
          pagination={{ pageSize: 20 }}
          style={{ margin: "2rem" }}
          dataSource={patients}
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
              // setSelectedEmployee(record);
              navigate(`/pacientes/${record?._id}`);
            },
            style: { cursor: "pointer" },
          })}
          />
      </>
      )}
    </div>
  );
};

export default Patients;
