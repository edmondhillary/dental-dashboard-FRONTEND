import React, { useEffect, useState } from "react";
import axios from "axios";
import { Select, Card, Row, Col } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const { Option } = Select;

const CitasChart = () => {
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
         color:'white'
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
          <Option value={2024}>2024</Option>
        </Select>
        </span>
        <BarChart width={1400} height={400} data={monthlyData}>
          <XAxis
            dataKey='month'
            tickFormatter={(month) =>
              monthNames[parseInt(month.split(" / ")[0]) - 1]
            }
            tick={<CustomizedAxisTick />}
            height={70}
          />
          <YAxis />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke='#ccc' />
          <Bar dataKey='count' fill='rgba(198, 0, 108, 0.9)' barSize={90} />
        </BarChart>
      </Card>
    </div>
  );
};

export default CitasChart;