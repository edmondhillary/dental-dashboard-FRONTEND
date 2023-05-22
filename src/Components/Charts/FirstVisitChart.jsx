import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, Card, Row, Col, Tag } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const { Option } = Select;

const VisitsByMonth = () => {
  const monthNames = [
    "ENERO",
    "FEBRERO",
    "MARZO",
    "ABRIL",
    "MAYO",
    "JUNIO",
    "JULIO",
    "AGOSTO",
    "SEPTIEMBRE",
    "OCTUBRE",
    "NOVIEMBRE",
    "DICIEMBRE",
  ];

  const [year, setYear] = useState(new Date().getFullYear());
  const [monthlyData, setMonthlyData] = useState([]);
  const [totalYearData, setTotalYearData] = useState(0);

  const fetchData = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const monthlyData = [];

      for (let month = 1; month <= 12; month++) {
        const response = await axios.get(
          `https://dental-dashboard-backend-production.up.railway.app/pacientes/firstVisitCount/${year}/${month}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const count = response?.data?.firstVisitCount || 0;
        monthlyData?.push({ month: monthNames[month - 1], count });
      }

      // Rellenar meses faltantes con valor 0
      for (let month = 1; month <= 12; month++) {
        if (!monthlyData?.find((data) => data.month === monthNames[month - 1])) {
          monthlyData?.push({ month: monthNames[month - 1], count: 0 });
        }
      }

      // Ordenar los datos por mes
      monthlyData?.sort((a, b) => a.month - b.month);

      setMonthlyData(monthlyData);
      setTotalYearData(
        monthlyData?.reduce((total, { count }) => total + count, 0)
      );
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [year]);

  const handleYearChange = (value) => {
    setYear(value);
  };

  return (
    <div >
      <Card style={{  display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: 'column ',
        height: "70vh",
        width: "100%",
        backgroundColor: "transparent",}}>
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            margin: "1rem",
            backgroundColor: "transparent",
          
          }}
        >
          <h3>Nuevas Visitas por Mes </h3>

          <Select size='large' value={year} onChange={handleYearChange}>
            <Option value={2023}>2023</Option>{" "}
            <Option value={2024}>2024</Option>
            <Option value={2025}>2025</Option>
            <Option value={2026}>2026</Option>
            {/* Agrega más años según sea necesario */}
          </Select>
        </span>
        <BarChart width={1400} height={500} data={monthlyData}>
          <XAxis dataKey='month' tickFormatter={(month) => month} />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke='#ccc' />
          <Bar dataKey='count' fill='#8884d8' />
        </BarChart>
      </Card>
      <Card style={{  backgroundColor: "transparent"}}>
        <Row  justify='center'>
          <Col >
            <Tag color="seagreen"  >
              <h2>

              TOTAL NUEVAS VISITAS EN  {year} - {totalYearData}{" "}
              </h2>
            </Tag>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default VisitsByMonth;
