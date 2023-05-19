import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, Card, Row, Col } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const { Option } = Select;

const CitasChart = () => {
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

  useEffect(() => {
    const fetchData = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await axios.get(
          `https://dental-dashboard-backend-production.up.railway.app/citas/citas/count/${year}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        const countPerMonth = response.data.countPerMonth;
        const chartData = countPerMonth.map((item) => ({
          month: `${item._id.month} / ${item._id.year}`,
          count: item.count,
        }));
        setMonthlyData(chartData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [year]);

  const handleYearChange = (value) => {
    setYear(value);
  };

  return (
    <div style={{ width: "100vw", display: 'flex', justifyContent: 'center', alignItems: 'center',   backgroundColor: "transparent", }}>
      <Card style={{
         backgroundColor: "transparent",
      }}>
      <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            margin: "1rem",
          }}
        >
        <h3>Citas por Mes</h3>
        <Select value={year} onChange={handleYearChange}>
          <Option value={2023}>2023</Option>
          {/* Ajusta los años según tus necesidades */}
          <Option value={2024}>2024</Option>
          {/* Agrega más años según sea necesario */}
        </Select>
        </span>
        <BarChart width={1400} height={400} data={monthlyData}>
          <XAxis
            dataKey='month'
            tickFormatter={(month) =>
              monthNames[parseInt(month.split(" / ")[0]) - 1]
            }
          />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke='#ccc' />
          <Bar dataKey='count' fill='rgba(198, 0, 108, 0.9)' />
        </BarChart>
      </Card>
    </div>
  );
};

export default CitasChart;
