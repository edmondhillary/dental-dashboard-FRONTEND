import { Tabs, Skeleton } from "antd";
import React, { useContext, useState } from "react";
import Odontograma from "../Odontograma/Odontograma";
import { PatientProfileContext } from "./PatientProfile";
import BudgetList from "../Budgets/BudgetList";

import AppointmentForm from "../Appointments/AppointmentForm";
import Calendar from "../Calendar/Calendar";
import { GlobalContext } from "../../context/UserContext/UsersState";

const PatientsTabs = () => {
  const [loading, setLoading] = useState(true);
  const { patientData, setPatientData, createBudgetVisible } = useContext(
    PatientProfileContext
  );

  const { user } = useContext(GlobalContext);

  const isEmployee = user?.role === "Employee";

  // Creando una lista condicional de items para las pestañas
  let tabItems = [
    {
      label: "ODONTOGRAMA",
      key: "1",
      children: (
        <Odontograma
          createBudgetVisible={createBudgetVisible}
          setPatientData={setPatientData}
          patientInfo={patientData}
          patientData={patientData}
        />
      ),
    },
  ];

  // Si el usuario no es un empleado, agregamos la pestaña de facturación
  if (!isEmployee) {
    tabItems.push({
      label: "FACTURACION",
      key: "2",
      children: (
        <BudgetList
          createBudgetVisible={createBudgetVisible}
          id={patientData?._id}
          isPatient={true}
          setPatientData={setPatientData}
          patientData={patientData}
        />
      ),
    });
  }

  // Agregamos la pestaña de citas para todos los usuarios
  tabItems.push({
    label: "CITAS",
    key: "3",
    children: (
      <>
        <Calendar patientData={patientData} userType='patient' />
      </>
    ),
  });

  return (
    <Tabs
      defaultActiveKey='1'
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      items={tabItems}
    />
  );
};

export default PatientsTabs;
