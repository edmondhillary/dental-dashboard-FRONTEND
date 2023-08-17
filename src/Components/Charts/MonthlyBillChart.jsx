import React, { useEffect, useState } from "react";
import { Card, Progress, Tabs } from "antd";
import axios from "axios";

const { TabPane } = Tabs;

const MonthlyPaymentsChart = () => {
  const URL = "https://dental-dashboard-backend-production.up.railway.app/presupuestos";
  const [monthlyPayments, setMonthlyPayments] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const monthsInSpanish = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  useEffect(() => {
    fetchMonthlyPayments(selectedYear);
  }, [selectedYear]);

  const fetchMonthlyPayments = async (year) => {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      const response = await axios.get(
        `${URL}/totales/pagos-mensuales?year=${year}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log({ response });
      const sortedData = response?.data.sort((a, b) => b.mes - a.mes);
      setMonthlyPayments(sortedData);
    } catch (error) {
      console.error(error);
    }
  };


  const handleTabChange = (key) => {
    setSelectedYear(parseInt(key));
  };
  return (
    <div style={{ margin: "3rem" }}>
      <Tabs activeKey={selectedYear.toString()} onChange={handleTabChange}>
        <TabPane tab='2022' key='2022' />
        <TabPane tab='2023' key='2023' />
        {/* Agrega más pestañas para años adicionales */}
      </Tabs>

      {monthlyPayments?.map((payment, index) => (
        <Card
          key={payment.mes}
          title={`Mes: ${monthsInSpanish[payment.mes - 1]}`}
          style={{
            marginBottom: "1rem",
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div 
        //   style={{display: 'flex', flexDirection: 'row'}}
          >
            <strong>Total: {payment.total} €</strong>
            <p>Pagado: {payment.pagado} €</p>
            <Progress
              strokeColor={'#9FD040'}
              percent={Number(
                ((payment.pagado / payment.total) * 100).toFixed(1)
              )}
              strokeWidth={10}
            />
          </div>
          <div>
            <p>Pendiente: {payment.pendiente} € </p>
            <Progress
              
              percent={Number(
                ((payment.pendiente / payment.total) * 100).toFixed(1)
              )}
              status='exception'
              strokeWidth={10}
            />
          </div>
        </Card>
      ))}

      {/* Agrega el total de los meses por año */}
      <Card title={`Total por año: ${selectedYear}`}>
        <strong>
          Total:{" "}
          {monthlyPayments.reduce((sum, payment) => sum + payment.total, 0)} €
        </strong>
        <p>
          Pagado:{" "}
          {monthlyPayments.reduce((sum, payment) => sum + payment.pagado, 0)}  €
        </p>
        <Progress
         strokeWidth={10}
         strokeColor={'#9FD040'}
          percent={Number(
            (
              (monthlyPayments.reduce(
                (sum, payment) => sum + payment.pagado,
                0
              ) /
                monthlyPayments.reduce(
                  (sum, payment) => sum + payment.total,
                  0
                )) *
              100
            ).toFixed(1)
          )}
        />

        <p>
          Pendiente:{" "}
          {monthlyPayments.reduce((sum, payment) => sum + payment.pendiente, 0)} €
        </p>
        <Progress
         strokeWidth={10}
          
          percent={Number(
            (
              (monthlyPayments.reduce(
                (sum, payment) => sum + payment.pendiente,
                0
              ) /
                monthlyPayments.reduce(
                  (sum, payment) => sum + payment.total,
                  0
                )) *
              100
            ).toFixed(1)
          )}
          status='exception'
        />
      </Card>
    </div>
  );
};
export default MonthlyPaymentsChart;
