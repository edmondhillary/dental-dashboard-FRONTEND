import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";
import AgeRangeChart from "./AgeRangeChart";

const GenderChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token = JSON.parse(localStorage.getItem("token"));
      try {
        const response = await axios.get(
          "http://localhost:4002/pacientes/pacientes/genderCount",
          {
            headers: {
              Authorization: token
            }
          }
        );
        const genderData = response?.data.genderCount;
        setData(genderData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const COLORS = ["#EA4336", "#7F00B1"];

  return (
    <Card style={{
display: "flex",
justifyContent: "center",
alignItems: "center",
flexDirection: 'column ',
height: "70vh",
width: "100%",
backgroundColor: "transparent",

    }} >
        {/* <AgeRangeChart/> */}
      <h3  >Género de Pacientes</h3>
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
          {data?.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend 
        formatter={(value) => value.toUpperCase()}
        iconType="square"
        wrapperStyle={{ marginRight: "3rem" }}
        />
      </PieChart>
    </Card>
  );
};

export default GenderChart;
