import React, { useContext, useEffect, useState } from "react";
import { Table, Tag, Switch, Modal, InputNumber, Select, Button, Typography, Spin, Pagination } from "antd";
import { getBudgetsByPatient } from "../../service/budgetsService/budgetService";
import { getBudgetsByEmployee } from "../../service/budgetsService/budgetService";
import { Link } from "react-router-dom";
import { CheckCircleOutlined, CloseCircleOutlined, DeleteOutlined, EditOutlined, LoadingOutlined } from "@ant-design/icons";
import axios from "axios";
import { GlobalContext } from "../../context/UserContext/UsersState";

const { Text } = Typography;

const BudgetList = ({ id, isPatient, patientData, setPatientData , createBudgetVisible}) => {
  const { user } = useContext(GlobalContext);
  const [budgets, setBudgets] = useState([]);
  const [sortedInfo, setSortedInfo] = useState({});
  const [editingBudget, setEditingBudget] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [treatments, setTreatments] = useState([]);
  
  const [loading, setLoading] = useState(true);
  const [pageNumber, setPageNumber] = useState(1);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadBudgets = async () => {
      try {
        let response;
        if (isPatient) {
          response = await getBudgetsByPatient(id, pageNumber);
        } else {
          if (id) {
            response = await getBudgetsByEmployee(id, pageNumber);
          }
        }
        const sortedBudgets = response?.budgets?.sort(
          (a, b) => new Date(b?.createdAt) - new Date(a?.createdAt)
        );
        setBudgets(sortedBudgets);
        setTotal(response?.totalPages);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    loadBudgets();
  }, [id, isPatient, patientData, pageNumber, createBudgetVisible]);

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
        `https://dental-dashboard-backend-production.up.railway.app/presupuestos/${budgetId}`,
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
        `https://dental-dashboard-backend-production.up.railway.app/tratamientos/budgets/filtros?patient=${patientData?._id}&completed=true&isAddedToBudget=false`,
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
        `https://dental-dashboard-backend-production.up.railway.app/presupuestos/${editingBudget?._id}`,
        {
         ...editingBudget
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );

      const updatedBudgets = budgets?.map((budget) =>
        budget._id === editingBudget._id
          ? { ...budget, treatment: editingBudget.treatment, discount }
          : budget
      );
      setBudgets(updatedBudgets);
      setModalVisible(false);
    }  catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al crear la cita';
      Modal.error({
        title: 'Error',
        content: errorMessage,
      });
    }
    setSortedInfo({});
  };

  const handleDeleteBudget = (budgetId) => {
    Modal.confirm({
      title: "¿Está seguro de que desea eliminar esta factura? ¡No se puede revocar esta accion! ",
      onOk() {
        deleteBudget(budgetId);
      },
      cancelText: "Cancelar",
      okText: 'Aceptar',
      
    });
  };
  const deleteBudget = async (budgetId) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const response = await axios.delete(
        `https://dental-dashboard-backend-production.up.railway.app/presupuestos/${budgetId}`,
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
    }  catch (error) {
      const errorMessage = error.response?.data?.error || 'Error al crear la cita';
      Modal.error({
        title: 'Error',
        content: errorMessage,
      });
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
              <p>
                {t.type}
              </p>
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
      render: (cost) =><Tag color="white" style={{color:'black'}}  >{cost?.toFixed(2)} €</Tag> 
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
        const color = isPaidCompleted ? "#85ff89" : "red";
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
            style={{ color: "red", background:'tomato' }}
              // type='secondary'
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
      <Spin spinning={loading} indicator={<LoadingOutlined spin />}>
        {budgets.length > 0 ? (
          <Table
            style={{ margin: '3rem' }}
            pagination={false}
            columns={columns}
            dataSource={budgets}
            onChange={handleChange}
            rowKey={(record) => record._id}
            summary={(pageData) => {
              // Resto de la función summary...
            }}
          />
        ) : null}
        <Pagination
          style={{ textAlign: "right", margin: "2rem" }}
          current={pageNumber}
          total={total * 15}
          pageSize={15}
          onChange={(page) => {
            setLoading(true);
            setPageNumber(page);
          }}
        />
      </Spin>
      <Modal
        title="Editar Presupuesto"
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        onOk={handleUpdateBudget}
        cancelText="Cancelar"
        okText="Aceptar"
      >
        {editingBudget && (
          <>
            <p>
              <b>Tratamientos:</b>
            </p>
            <Select
              mode="multiple"
              style={{ width: "100%" }}
              placeholder="Seleccione los tratamientos"
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