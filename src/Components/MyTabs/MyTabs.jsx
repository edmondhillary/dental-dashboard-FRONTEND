import { Button, Tabs } from "antd";
import CreateTreatmentModal from "../Treatments/CreateTreatmentModal";
import { useContext, useState } from "react";
import CreateTreatmentButton from "../Treatments/CreateTreatmentButton";
import "./MyTabs.scss";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../../context/UserContext/UsersState";
import BudgetList from "../Budgets/BudgetList";
import { ProfileContext } from "../Profile/Profile";
import Calendar from "../Calendar/Calendar";
import EmployeeTreatmentsTable from "../Employees/EmployeesTreatment";
import EmployeePatientsTable from "../Employees/EmployeePatientsTable";

const { Items } = Tabs;

function MyTabs() {
  const { userData } = useContext(ProfileContext);
  const navigate = useNavigate();

  const [modalVisible, setModalVisible] = useState(false);

  const handleModalVisible = (visible) => {
    setModalVisible(visible);
  };

  return (
    <Tabs
      defaultActiveKey='1'
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      items={[
        {
          label: "TRATAMIENTOS",
          key: "1",
          children: (
            <>
            < EmployeeTreatmentsTable employeeId={userData?._id} />
          </>
        ),
      },
        {
          label: "CITAS",
          key: "2",
          children: (
            <Calendar
            userData={userData}
            patientData={userData}
            userType='employee'
            />
            ),
          },
        {
          label: "FACTURAS",
          key: "3",
          children: <BudgetList id={userData?._id} userData={userData} />,
        },
        {
          label: "PACIENTES",
          key: "4",
          children: <EmployeePatientsTable employeeId={userData?._id}/>
        },
      ]}
    ></Tabs>
  );
}
export default MyTabs;
