import { useState, useEffect, useContext } from "react";
import { Avatar, List, Table, Tag, Spin, Skeleton, Typography } from "antd";
import {
  getEmployeeByID,
  getEmployees,
} from "../../service/employeService/employeeService";
import { Link, useNavigate } from "react-router-dom";
import EmployeeCard from "../EmployeeCard/EmployeeCard";
import { UserCard } from "../Profile/components/UserCard/UserCard";
import Column from "antd/es/table/Column";
import { GlobalContext } from "../../context/UserContext/UsersState";
import './Employees.scss'
const { Title } = Typography;
function Employees() {
  const navigate = useNavigate();
  const { user } = useContext(GlobalContext);

  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [employeeDetails, setEmployeeDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getEmployees().then((response) => {
      setEmployees(response);
      setLoading(false);
    });
  }, []);

  const columns = [
    { title: "Nombre", dataIndex: "firstName" },
    { title: "Email", dataIndex: "email" },
    {
      title: "Rol",
      dataIndex: "role",
      render: (text, record) => {
        if (record.role === "admin") {
          return <Tag color='purple'>Administrador</Tag>;
        } else if (record.role === "employee" || record.role === "Employee") {
          return <Tag color='blue'>Empleado</Tag>;
        } else if (record.role === "superAdmin") {
          return (
            <Tag bordered color='green'>
              Super Administrador
            </Tag>
          );
        }
      },
    },
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
          <Title
            level={3}
            style={{
              textAlign: "center",
              background: "transparent",
              color: "#fff",
            }}
          >
            Lista de Empleados
          </Title>

          <Table
            pagination={{ pageSize: 8 }}
            style={{
              margin: "2rem",
              cursor: "pointer",
              backgroundColor: "transparent",
            }}
            className='custom-table'
            dataSource={employees}
            columns={columns}
            rowKey={(record) => record.id}
            onRow={(record) => ({
              onClick: () => {
                if (user?.role !== "Employee") {
                  setSelectedEmployee(record);
                  console.log(record._id);
                  navigate(`/profile/${record?._id}`);
                }
              },
            })}
          ></Table>
        </>
      )}
    </div>
  );
}

export default Employees;
