import React, { useContext, useEffect, useState } from "react";
import { getPatients } from "../../service/patientService/patientsService";



import { Table , Input, Button} from "antd";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "../../context/PatientContext/PatientState";

const { Search } = Input;

const Patients = () => {
  const navigate = useNavigate();
  const { patient } = useContext(PatientContext);
  const [patients, setPatients] = useState([]);
  const { patientId } = useParams();
  const [searchText, setSearchText] = useState("");


  useEffect(() => {
    getPatients("", searchText).then((res) => {
      console.log("reeeeeeees REEEEEEEEEE", res);
      setPatients(res);
    });
  }, [searchText]);


  const columns = [
    { title: "Nombre", dataIndex: "displayName" },
    { title: "Email", dataIndex: "email" },
    { title: "Telefono", dataIndex: "phone" },
    { title: "Direccion", dataIndex: "address" },
  ];

  return (
    <div>
      <Table
        pagination={{ pageSize: 20 }}
        style={{ margin: "2rem" }}
        dataSource={patients}
        columns={columns}
        rowKey={(record) => record.id}
        onRow={(record) => ({
          onClick: () => {
            console.log(`click en ${record.firstName}`);
            // setSelectedEmployee(record);
            navigate(`/pacientes/${record._id}`);
          },
          style: { cursor: "pointer" },
        })}
      />
        
    </div>
  );
};

export default Patients;
