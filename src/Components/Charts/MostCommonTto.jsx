import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card } from "antd";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";


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
        
            }}>
        <h3>Tratamientos más Comunes</h3>
        <br />
        <BarChart width={1400} height={500} data={data}>
          <XAxis dataKey="_id" />
          <YAxis />
          <Tooltip />
          <CartesianGrid stroke="#ccc" />
          <Bar dataKey="count" fill="#945663" />
        </BarChart>
      </Card>
    );
  };
  
  export default MostCommonTreatmentsChart;
  