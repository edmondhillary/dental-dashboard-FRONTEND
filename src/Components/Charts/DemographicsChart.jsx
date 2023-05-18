import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
import axios from 'axios';

const Demographics = () => {
  const [data, setData] = useState([]);
  const token = JSON.parse(localStorage.getItem('token'));


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4002/pacientes/pacientes/demographics", {
          headers: {
           Authorization: token
          }
        });
        setData(response?.data.demographics);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]); // Actualiza el efecto si el token cambia

  return (
    <PieChart width={400} height={400}>
      <Pie
        dataKey="count"
        isAnimationActive={false}
        data={data}
        cx={200}
        cy={200}
        outerRadius={80}
        fill="#8884d8"
        label={(entry) => `${entry._id.gender}, ${entry._id?.age}`}
      >
        {data?.map((entry, index) => (
          <Cell key={`cell-${index}`} fill={getColor(index)} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  );
};

const getColor = (index) => {
  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"];
  return COLORS[index % COLORS.length];
};

export default Demographics;
