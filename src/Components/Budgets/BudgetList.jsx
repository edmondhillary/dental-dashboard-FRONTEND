import React, { useContext, useEffect, useState } from "react";
import { Table, Tag, Switch, Modal, InputNumber, Select, Button, Typography } from "antd";
const { Text } = Typography;
import { getBudgetsByPatient } from "../../service/budgetsService/budgetService";
import { getBudgetsByEmployee } from "../../service/budgetsService/budgetService";
import { Link } from "react-router-dom";
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import axios from "axios";
import { GlobalContext } from "../../context/UserContext/UsersState";

const BudgetList = ({ id, isPatient, patientData, setPatientData }) => {
  const { user } = useContext(GlobalContext);
  const [budgets, setBudgets] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [editingBudget, setEditingBudget] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [treatments, setTreatments] = useState([]);

  useEffect(() => {
    const loadBudgets = async () => {
      try {
        let response;
        if (isPatient) {
          response = await getBudgetsByPatient(id);
        } else {
          if (id) {
            response = await getBudgetsByEmployee(id);
          }
        }
        console.log(response);
        const sortedBudgets = response?.budgets?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        setBudgets(sortedBudgets);
      } catch (error) {
        console.error(error);
      }
    };

    loadBudgets();
  }, [id, isPatient, patientData, modalVisible]);

  const handleChange = (pagination, filters, sorter) => {
    setSortedInfo(sorter);
    if (sorter.columnKey) {
      const { columnKey, order } = sorter;
      if (columnKey === "createdAt") {
        const compareFn = (a, b) =>
          new Date(a?.createdAt) - new Date(b?.createdAt);
        const sortedBudgets =
          order === "desc"
            ? budgets?.slice().sort(compareFn).reverse()
            : budgets?.slice().sort(compareFn);
        setBudgets(sortedBudgets);
      } else if (columnKey === "debt") {
        // Cambiar a "debt"
        const compareFn = (a, b) => a?.debt - b?.debt; // Cambiar a "debt"
        const sortedBudgets =
          order === "desc"
            ? budgets?.slice().sort(compareFn).reverse()
            : budgets?.slice().sort(compareFn);
        setBudgets(sortedBudgets);
      }
    }
  };

  const handleSwitchChange = async (
    checked,
    budgetId,
    costWithDiscount,
    recordIndex
  ) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const newPaid = checked ? costWithDiscount : 0;
      const response = await axios.put(
        `http://localhost:4002/presupuestos/${budgetId}`,
        { isPaidCompleted: checked, paid: newPaid },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);

      // Actualizar el presupuesto correspondiente en la lista de presupuestos en memoria
      const updatedBudget = {
        ...budgets[recordIndex],
        isPaidCompleted: checked,
        paid: newPaid,
      };
      setBudgets([
        ...budgets?.slice(0, recordIndex),
        updatedBudget,
        ...budgets?.slice(recordIndex + 1),
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchTreatments = async () => {
   if (isPatient){
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.get(
        `http://localhost:4002/tratamientos/budgets/filtros?patient=${patientData?._id}&completed=true&isAddedToBudget=false`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setTreatments(response.data.treatments);
    } catch (error) {
      console.error(error);
    }
  };
   }
  const getTotalPaid = () => {
    return budgets.reduce((total, budget) => total + budget.paid, 0);
  };

  const getTotalDebt = () => {
    return budgets.reduce(
      (total, budget) => total + (budget.costWithDiscount - budget.paid),
      0
    );
  };

  const getTotalCostWithDiscount = () => {
    return budgets.reduce(
      (total, budget) => total + budget.costWithDiscount,
      0
    );
  };

  useEffect(() => {
    fetchTreatments();
  }, [patientData]);
  const handleUpdateBudget = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.put(
        `http://localhost:4002/presupuestos/${editingBudget?._id}`,
        {
         ...editingBudget
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);

      // Actualizar el presupuesto correspondiente en la lista de presupuestos en memoria
      const updatedBudgets = budgets.map((budget) =>
        budget._id === editingBudget._id
          ? { ...budget, treatment: editingBudget.treatment, discount }
          : budget
      );
      setBudgets(updatedBudgets);
      setModalVisible(false);
    } catch (error) {
      console.error(error);
    }
    setSortedInfo({});
  };

  const handleDeleteBudget = (budgetId) => {
    Modal.confirm({
      title: "¿Está seguro de que desea eliminar este presupuesto?",
      onOk() {
        deleteBudget(budgetId);
      },
    });
  };
  const deleteBudget = async (budgetId) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.delete(
        `http://localhost:4002/presupuestos/${budgetId}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data);

      // Remover presupuesto eliminado de la lista de presupuestos en memoria
      const updatedBudgets = budgets.filter(
        (budget) => budget._id !== budgetId
      );
      setBudgets(updatedBudgets);
    } catch (error) {
      console.error(error);
    }
    setSortedInfo({});
    setModalVisible(false);
  };

  const handleEditBudget = (budget) => {
    setEditingBudget(budget);
    setModalVisible(true);
  };

  const columns = [
    {
      title: "Tipo de Tratamiento",
      dataIndex: "treatment",
      render: (text, record, index) => {
        return (
          <>
            {record?.treatment?.map((t, i) => (
              <Tag color='magenta' key={i}>
                {t.type}
              </Tag>
            ))}
          </>
        );
      },
    },

    isPatient
      ? {
          title: "Empleado",
          dataIndex: "employee",
          render: (text, record, index) => {
            return (
              <>
                {record?.employee?.map((e, i) => (
                  <Link to={`/profile/${e?._id}`} key={i}>
                    {` ${e?.firstName} ${e?.lastName},  `}
                  </Link>
                ))}
              </>
            );
          },
        }
      : {
          title: "Paciente",
          dataIndex: "patient",
          render: (patient) => {
            return (
              <Link to={`/pacientes/${patient?._id}`}>
                {`${patient?.firstName} ${patient?.lastName}`}
              </Link>
            );
          },
        },

    {
      title: "Costo con Descuento aplicado",
      dataIndex: "costWithDiscount",
      render: (cost) =><Tag >{cost?.toFixed(2)} €</Tag> 
    },

    {
      title: "Pagado",
      dataIndex: "paid",
      render: (paid) => {
        return <Tag color='purple'>{`$${paid?.toFixed(2)}`}</Tag>;
      },
    },

    {
      
      title: "Deuda",
      dataIndex: "deudaPaciente",
      render: (deuda, record) => {
        const debt = record.costWithDiscount - record.paid;
        const color = debt > 0 ? "red" : "green";
        return <Tag color={color}>{`$${debt?.toFixed(2)}`}</Tag>;
      },
      sorter: (a, b) =>
        a.costWithDiscount - a.paid - (b.costWithDiscount - b.paid),
    },

    {
      title: "Pago Completo",
      dataIndex: "isPaidCompleted",
      render: (isPaidCompleted, record) => {
        const color = isPaidCompleted ? "green" : "red";
        return (
          <Switch
            checkedChildren={<CheckCircleOutlined />}
            unCheckedChildren={<CloseCircleOutlined />}
            checked={isPaidCompleted}
            onChange={(checked) =>
              handleSwitchChange(
                checked,
                record._id,
                record.costWithDiscount,
                budgets.findIndex((b) => b._id === record._id)
              )
            }
            disabled={isPaidCompleted} // Agregar esta línea
            style={{ backgroundColor: color }}
          />
        );
      },
    },
    {
      title: "Fecha presupuesto",
      dataIndex: "createdAt",
      render: (fecha) => new Date(fecha).toLocaleDateString(),
      sorter: (a, b) => new Date(a?.createdAt) - new Date(b?.createdAt),
    },
    {
      title: "Acciones",
      dataIndex: "actions",
      render: (text, record, index) => (
        <>
          {user?.role === "superAdmin" && ( // verificar si el rol es "superAdmin"
            <Button
              type='secondary'
              size='small'
              onClick={() => handleEditBudget(record)}
            >
              <EditOutlined style={{ color: "purple" }} />
            </Button>
          )}
          {user?.role === "superAdmin" && ( // verificar si el rol es "superAdmin"
            <Button
              type='secondary'
              size='small'
              onClick={() => handleDeleteBudget(record._id)}
            >
              <DeleteOutlined style={{ color: "red" }} />
            </Button>
          )}
        </>
      ),
    }
  ];

  return (
    <>
      <Table
      style={{
        margin: '3rem'
      }}
        pagination={{ pageSize: 50 }}
        columns={columns}
        dataSource={budgets}
        onChange={handleChange}
        rowKey={(record) => record._id}
      
        summary={(pageData) => {
      
          let totalCostWithDiscount = 0;
          let totalPaid = 0;
          let totalDebt = 0;
  
          pageData.forEach(({ borrow, repayment, costWithDiscount, paid }) => {
            
            totalCostWithDiscount += costWithDiscount;
            totalPaid += paid;
            totalDebt += costWithDiscount - paid;
          });
  
          return (
            <>
              <Table.Summary.Row>
                <Table.Summary.Cell index={0}>TOTALES: </Table.Summary.Cell>
                <Table.Summary.Cell index={1}>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={2}>
                  <Tag>{totalCostWithDiscount} €</Tag>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={3}>
                  <Tag color="purple">{totalPaid} €</Tag>
                </Table.Summary.Cell>
                <Table.Summary.Cell index={4}>
                  <Tag  color="red">{totalDebt} €</Tag>
                </Table.Summary.Cell>
              </Table.Summary.Row>
            </>
          );
        }}
      />
      <Modal
        title='Editar Presupuesto'
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleUpdateBudget}
      >
        {editingBudget && (
          <>
            <p>
              <b>Tratamientos:</b>
            </p>
            <Select
              mode='multiple'
              style={{ width: "100%" }}
              placeholder='Seleccione los tratamientos'
              defaultValue={editingBudget?.treatment.map((t) => t.type)}
              onChange={(value) =>
                setEditingBudget({ ...editingBudget, treatment: value })
              }
            >
              {treatments?.map((t) => (
                <Option key={t._id} value={t._id}>
                  {t.type}
                  {console.log("soy tipo de tratmiento: ", t.type)}
                </Option>
              ))}
            </Select>
            <p>
              <b>Pagado:</b>
            </p>
            <InputNumber
              style={{ width: "100%" }}
              min={0}
           
              onChange={(value) =>
                setEditingBudget({ ...editingBudget, paid: value })
              }
            />
          </>
        )}
      </Modal>
    </>
  );
};

export default BudgetList;
