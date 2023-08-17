import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

const CustomizedAxisTick = props => {
  const { x, y, payload } = props;
  return (
    <g transform={`translate(${x},${y})`}>
      <text x={0} y={0} dy={16}  fill="white">
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

const MostCommonTreatmentsChart = () => {
  const [data, setData] = useState([]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get("https://dental-dashboard-backend-production.up.railway.app/tratamientos/treatments/mostCommon", {
          headers: {
            Authorization: token,
          },
        });
        const mostCommonData = response.data;
        setData(mostCommonData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <Card style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      flexDirection: 'column ',
      height: "70vh",
      width: "100%",
      backgroundColor: "transparent",
      color:'white'
    }}>
      <h3>Tratamientos más Comunes</h3>
      <br />
      <BarChart width={1400} height={500} data={data}>
        <XAxis dataKey="_id" stroke="white" tick={<CustomizedAxisTick />} height={70} />
        <YAxis stroke="white" tick={{fontSize: 12}} />
        <Tooltip content={<CustomTooltip />} />
        <CartesianGrid />
        <Bar dataKey="count" fill="#ff6200" barSize={70}  />
      </BarChart>
    </Card>
  );
};

export default MostCommonTreatmentsChart;
