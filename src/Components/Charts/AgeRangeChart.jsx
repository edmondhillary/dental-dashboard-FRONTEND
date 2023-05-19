import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

const AgeRangeChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await axios.get(
          "https://dental-dashboard-backend-production.up.railway.app/pacientes/pacientes/ageRangeCount",
          {
            headers: {
              Authorization: token
            }
          }
        );
        const ageRangeData = response.data.ageRangeCount;
        setData(ageRangeData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#AF19FF", "#FF193B", "#7BFF19", "#19FFD4", "#FF19B4", "#1919FF"];

  return (
    <Card  style={{
        display: "flex",
justifyContent: "center",
alignItems: "center",
flexDirection: 'column ',
height: "70vh",
width: "100%",
backgroundColor: "transparent",
                
            }} >
      <h3>Edad por Rango de 10 años</h3>
      <PieChart width={1400} height={400}>
        <Pie
          data={data}
          dataKey="count"
          nameKey="_id"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </Card>
  );
};

export default AgeRangeChart;
