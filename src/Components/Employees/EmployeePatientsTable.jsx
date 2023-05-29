import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table, Spin, Select, Pagination } from "antd";
import { Link } from "react-router-dom";

const EmployeePatientsTable = ({ employeeId }) => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  useEffect(() => {
    const fetchEmployeePatients = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await axios.get(
          `https://dental-dashboard-backend-production.up.railway.app/pacientes/employee/${employeeId}`,
          {
            params: {
              page: pagination.current,
              pageSize: pagination.pageSize,
            },
            headers: {
              Authorization: token,
            },
          }
        );

        setPatients(response.data.patients);
        setPagination({
          ...pagination,
          total: response.data.totalCount,
        });
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchEmployeePatients();
  }, [employeeId, pagination.current, pagination.pageSize]);

  const columns = [
    {
      title: "Nombre",
      dataIndex: "displayName",
      key: "displayName",
      render: (name, record) => {
        return <Link to={`/pacientes/${record?._id}`}>{name}</Link>;
      },
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
  ];

  const handleTableChange = (pagination) => {
    setPagination(pagination);
  };

  const handlePaginationChange =  (page, pageSize) => {
     setLoading(true)
     setPagination({
      current: page,
      pageSize: pageSize,
      total: pagination?.total,
    });
   
  };

  const pageSizeOptions = ["10", "20", "50"];

  return (
    <Spin spinning={loading}>
      <Table
        columns={columns}
        dataSource={patients}
        pagination={false}
        onChange={handleTableChange}
      />
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div style={{marginTop: "1rem", marginRight: '12rem'}}>
          <span
          //   style={{ marginRight: 8 }}
          >
            Pacientes por página:
          </span>
          <Select
            value={pagination.pageSize.toString()}
            onChange={(value) =>
              handlePaginationChange(pagination.current, parseInt(value))
            }
          >
            {pageSizeOptions?.map((option) => (
              <Select.Option key={option} value={option}>
                {option}
              </Select.Option>
            ))}
          </Select>
        </div>

        <Pagination
          style={{ textAlign: "right", marginTop: "1rem" }}
          current={pagination?.current}
          pageSize={pagination?.pageSize}
          total={pagination?.total}
          onChange={handlePaginationChange}
          //   showTotal={(total) => `Total ${total} pacientes`}
          showSizeChanger={false}
        />
        <br />
      </div>
    </Spin>
  );
};

export default EmployeePatientsTable;
