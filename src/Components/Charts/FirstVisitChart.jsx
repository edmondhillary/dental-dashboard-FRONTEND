import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, Card, Row, Col, Tag } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const { Option } = Select;

const VisitsByMonth = () => {

  const CustomizedAxisTick = props => {
    const { x, y, payload } = props;
    return (
      <g transform={`translate(${x},${y})`}>
        <text x={0} y={0} dy={16} textAnchor="end" fill="white">
          {payload.value}
        </text>
      </g>
    );
  };
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{backgroundColor: 'white', padding: '5px', border: '1px solid black'}}>
          <p className="label" style={{color: 'black'}}>{`${label} : ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };

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
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const monthlyData = [];
        const requests = [];

        for (let month = 1; month <= 12; month++) {
          const request = axios.get(
            `https://dental-dashboard-backend-production.up.railway.app/pacientes/firstVisitCount/${year}/${month}`,
            {
              headers: {
                Authorization: token,
              },
            }
          );
          requests.push(request);
        }

        const responses = await Promise.all(requests);
        const data = responses.map((response, index) => {
          const count = response?.data?.firstVisitCount || 0;
          return { month: monthNames[index], count };
        });

        // Rellenar meses faltantes con valor 0
        for (let month = 1; month <= 12; month++) {
          if (!data.find((item) => item.month === monthNames[month - 1])) {
            data.push({ month: monthNames[month - 1], count: 0 });
          }
        }

        // Ordenar los datos por mes
        data.sort((a, b) => a.month - b.month);

        setMonthlyData(data);
        setTotalYearData(data.reduce((total, { count }) => total + count, 0));
        setLoading(false);
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
    <div>
      <Card
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          height: "70vh",
          width: "100%",
          backgroundColor: "transparent",
          color:'white',
        }}
      >
        <span
          style={{
            display: "flex",
            justifyContent: "space-between",
            flexDirection: "row",
            margin: "1rem",
            backgroundColor: "transparent",
          }}
        >
          <h3>Nuevas Visitas por Mes</h3>
          <Select size='large' value={year} onChange={handleYearChange}>
            <Option value={2023}>2023</Option>
            <Option value={2024}>2024</Option>
          </Select>
        </span>
        {loading ? (
          <div>Loading...</div>
        ) : (
          <BarChart width={1400} height={500} data={monthlyData}>
          <XAxis dataKey='month' tick={<CustomizedAxisTick />} height={70} />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke='#ccc' />
          <Bar dataKey='count' fill='#8884d8' />
        </BarChart>
        )}
      </Card>
      <Card style={{ backgroundColor: "transparent" }}>
        <Row justify='center'>
          <Col>
          <br />
          <br />
                      <Tag color='seagreen'>
              <h2>
                TOTAL NUEVAS VISITAS EN {year} - {totalYearData}
              </h2>
            </Tag>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default VisitsByMonth;
