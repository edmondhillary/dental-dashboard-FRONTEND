import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { PatientContext } from "../../context/PatientContext/PatientState";
import { Button, Divider, Spin, Tooltip } from "antd";
import PatientCard from "./PatientCard";
import axios from "axios";
import PatientsTabs from "./PatientsTabs";
import CreateBudget from "../Budgets/CreateBudget";
import { TreatmentsContext } from "../../context/TreatmentsContext/TreatmentState";

export const PatientProfileContext = createContext();

const PatientProfile = () => {
  const { treatments, treatment, getTreatmentsByQuery, createTreatment } =
    useContext(TreatmentsContext);

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { patient } = useContext(PatientContext);
  const [patientData, setPatientData] = useState([]);
  const { patientId } = useParams();
  const [pointPosition, setPointPosition] = useState(null);
  const [createBudgetVisible, setCreateBudgetVisible] = useState(false);

  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("token"));
    const getPatientById = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get(
          `https://dental-dashboard-backend-production.up.railway.app/pacientes/${patientId}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log("holaaaaaaaa");
        setPatientData(res.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setIsLoading(false);
      }
    };

    if (!patientId) {
      navigate("/pacientes");
    } else {
      getPatientById(patientId);
      console.log("hola");
    }
  }, [navigate, patientId]);

  const showCreateBudgetModal = () => {
    const query = `patient=${patientData?._id}&completed=true&isAddedToBudget=false`;
    getTreatmentsByQuery(query);
    console.log("soy patient PROFILEEEEEEE", { treatments });
    setCreateBudgetVisible(true);
  };

  const handleCreateBudget = async (budgetData) => {
    const token = JSON.parse(localStorage.getItem("token"));
    const res = await axios.post(
      `https://dental-dashboard-backend-production.up.railway.app/presupuestos`,
      budgetData,
      {
        headers: {
          Authorization: token,
        },
      }
    );
    setCreateBudgetVisible(false);
  };

  const handleCancel = () => {
    setCreateBudgetVisible(false);
  };

  return (
    <PatientProfileContext.Provider
      value={{
        patientData,
        setPatientData,
        createBudgetVisible,
        setCreateBudgetVisible,
      }}
    >
      <Spin spinning={isLoading}>
        <div style={{ paddingBottom: "800px" }}>
          <PatientCard />
          <Divider />
          <PatientsTabs />
          {/* <Odontograma/> */}{" "}
          <>
          <Tooltip title='Crear Factura'>

            <Button
              type='primary'
              onClick={showCreateBudgetModal}
              style={{
                width: "3rem",
                height: "3rem",
                position: "fixed",
                right: "1rem",
                bottom: "1rem",
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                cursor: 'pointer',
                
              }}
              >
              <b style={{
                fontSize: '2rem'
              }}>&euro;</b>
            
            </Button>
            </Tooltip>
            <CreateBudget
              visible={createBudgetVisible}
              onCreate={handleCreateBudget}
              onCancel={handleCancel}
              />
          </>
        </div>
      </Spin>
    </PatientProfileContext.Provider>
  );
};
export default PatientProfile;
