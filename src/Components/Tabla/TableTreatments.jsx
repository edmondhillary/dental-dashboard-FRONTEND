import {
  Button,
  Switch,
  Table,
  Tag,
  Modal,
  Input,
  Select,
  Form,
  Card,
  Spin,
} from "antd";
import Column from "antd/es/table/Column";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";
import {
  DeleteColumnOutlined,
  DeleteOutlined,
  EditFilled,
} from "@ant-design/icons";
import { deleteTreatment } from "../../service/treatmentService/treatmentService";
import { TreatmentsContext } from "../../context/TreatmentsContext/TreatmentState";
import { useMediaQuery } from "react-responsive";

const TableTreatments = ({
  patientInfo,
  isModalVisible,
  setPatientData,
  patientData,
  updatePatientData,
  createBudgetVisible,
}) => {


  const [tratamientos, setTratamientos] = useState([]);
  const navigate = useNavigate();
  const [editableTreatment, setEditableTreatment] = useState(null);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [currentTreatment, setCurrentTreatment] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get("https://dental-dashboard-backend-production.up.railway.app/empleados", {
          headers: {
            Authorization: token,
          },
        });
        setEmployees(response?.data);

      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, []);
  const getTreatmentsForPatient = async () => {
    if (patientInfo && patientInfo._id) {
      try {
        const token = JSON.parse(localStorage.getItem("token"));
        const response = await axios.get(
          `https://dental-dashboard-backend-production.up.railway.app/pacientes/${patientInfo?._id}`,
          {
            headers: {
              Authorization: token,
            },
          }
        );
        console.log(response?.data.treatment);
        // Asegurémonos de que cada tratamiento tenga una clave única
        const treatedData = response?.data.treatment.map((treatment, index) => ({
          ...treatment,
          key: treatment._id ? treatment._id : index, // Usa el _id del tratamiento si existe, de lo contrario, usa el índice
        }));
        setTratamientos(treatedData);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    }
  };
  useEffect(() => {
    getTreatmentsForPatient();
  }, [
    patientInfo,
    isModalVisible,
    isModalVisibleEdit,
    patientData,
    isDeleteModalVisible,
    createBudgetVisible,
  ]);
  const sortTratamientos = (a, b) => {
    if (a.completed && !b.completed) {
      return 1;
    } else if (!a.completed && b.completed) {
      return -1;
    } else if (a.teeth && b.teeth) {
      return a.teeth.toString().localeCompare(b.teeth.toString());
    } else {
      return 0;
    }
  };


  const handleTreatmentUpdate = async (treatmentId, updatedFields) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      const res = await axios.put(
        `https://dental-dashboard-backend-production.up.railway.app/tratamientos/${treatmentId}`,
        {
          ...editableTreatment,
          ...updatedFields,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      const updatedTreatment = res.data;
      // Buscar el tratamiento en la lista de tratamientos de patientData y actualizarlo
      const updatedPatientData = {
        ...patientData,
        treatment: patientData.treatment.map((t) =>
          t._id === updatedTreatment._id ? updatedTreatment : t
        ),
      };
      updatePatientData(updatedPatientData);
    } catch (error) {
      console.log(error);
    }
  };

  const handleTreatmentEdit = (treatment) => {
    setEditableTreatment(treatment);
    setIsModalVisibleEdit(true);
  };
  // const [forceUpdate, setForceUpdate] = useState(false);

  // Agregar esta función en el componente TableTreatments
  const removeTreatmentFromState = (treatmentId) => {
    setTratamientos((prevTratamientos) =>
      prevTratamientos.filter((treatment) => treatment._id !== treatmentId)
    );
  };

  // Actualizar la función handleDeleteTreatment
  async function handleDeleteTreatment(id) {
    const token = JSON.parse(localStorage.getItem("token"));
    try {
      // Asegúrate de que la URL y los encabezados sean correctos
      const response = await axios.delete(
        `https://dental-dashboard-backend-production.up.railway.app/tratamientos/${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      // Comprueba el estado de la respuesta y realiza acciones según sea necesario
      if (response.status === 200) {
        // Elimina el tratamiento de la lista en el estado del componente
        // y actualiza la interfaz de usuario
        removeTreatmentFromState(id);
      } else {
        // Muestra un mensaje de error si la respuesta no tiene éxito
        console.error(
          `Error al eliminar el tratamiento: ${response.statusText}`
        );
      }
    } catch (error) {
      console.error(`Error al eliminar el tratamiento: ${error}`);
    }
  }

  //   useEffect(() => {
  //   if (forceUpdate) {
  //     getTreatmentsForPatient();
  //     setForceUpdate(false);
  //   }
  // }, [forceUpdate]);

  const showDeleteModal = (record) => {
    setCurrentTreatment(record);
    setIsDeleteModalVisible(true);
  };

  const handleDeleteModalCancel = () => {
    setCurrentTreatment(null);
    setIsDeleteModalVisible(false);
  };
  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 1224px)" });

  if (isTabletOrMobile) {
    return (
      <>
        {tratamientos?.sort(sortTratamientos).map((tratamiento) => (
          <Card title={tratamiento?.teeth} key={tratamiento?._id}>
            {/* Aquí puedes colocar el contenido de cada tarjeta */}
            <p>Tratamiento: {tratamiento?.type}</p>
            <p>Empleado: {tratamiento?.employee?.firstName} {tratamiento?.employee.lastName}</p>
            <p>Completado: {tratamiento?.completed ? "Sí" : "No"}</p>
            <p>Fecha de Creación: {new Date(tratamiento?.createdAt).toLocaleDateString("es-ES")}</p>
            <p>¿Está facturado?: {tratamiento?.isAddedToBudget ? "Sí" : "No"}</p>
            {/* Para las acciones, validamos si el tratamiento está facturado o no */}
            {!tratamiento?.isAddedToBudget && (
              <div>
                <Button type='secondary' onClick={() => handleTreatmentEdit(tratamiento)}>
                  <EditFilled style={{ color: "purple" }} /> Editar
                </Button>
                <Button type='danger' onClick={() => showDeleteModal(tratamiento)}>
                  <DeleteOutlined style={{ color: "red" }} /> Eliminar
                </Button>
              </div>
            )}
          </Card>
        ))}
      </>
    );
    
  }
  
  return (
    <>
  <Spin spinning={loading}>
  <Table
        dataSource={tratamientos?.sort(sortTratamientos)}
        pagination={false}
        style={{ marginTop: "30px", margin: "3rem" }}
        scroll={{ x: 1000 }}
      >
        {/* {tratamientos.map((trat) => console.log(trat))} */}

        <Column title='Diente' dataIndex='teeth' key='teeth' />
        <Column
          title='Tratamiento'
          dataIndex='type'
          key='tratamientos'
          render={(text, record) => (
            <>
              <Button type='link' onClick={() => handleTreatmentEdit(record)}>
                {record?.type.toUpperCase()}
              </Button>
            </>
          )}
          sorter={(a, b) => a.type.localeCompare(b.type)}
        />

        <Column
          title='Empleado'
          dataIndex={["employee", `firstName`]}
          key='employee'
          render={(text, record) => (
            <Link to={"/profile/" + record?.employee._id}>
              {record.employee.firstName} {record.employee.lastName}
            </Link>
          )}
          sorter={(a, b) =>
            a.employee.lastName.localeCompare(b.employee.lastName)
          }
        />

        <Column
          align='center'
          title='Completado'
          dataIndex='completed'
          key='completed'
          disable
          render={(text, record) => (
            <Switch
              checked={record?.completed}
              disabled={record?.completed}
              checkedChildren='Sí'
              unCheckedChildren='No'
              style={
                record?.completed
                  ? { backgroundColor: "#6ABC3B" }
                  : { backgroundColor: "tomato" }
              }
              onChange={async (checked) => {
                const updatedTreatment = {
                  ...record,
                  completed: checked,
                };
                await handleTreatmentUpdate(record?._id, updatedTreatment);
              }}
            />
          )}
          sorter={(a, b) => a.completed - b.completed}
        />

        <Column
          title='Fecha de creación'
          dataIndex='createdAt'
          key='createdAt'
          render={(createdAt) =>
            new Date(createdAt).toLocaleDateString("es-ES")
          }
          sorter={(a, b) => new Date(b.createdAt) - new Date(a.createdAt)}
        />

        <Column
          title='Última actualización'
          dataIndex='updatedAt'
          key='updatedAt'
          render={(updatedAt) =>
            new Date(updatedAt).toLocaleDateString("es-ES")
          }
        />
        <Column
          align='center'
          title='¿Esta facturado?'
          dataIndex='isAddedToBudget'
          key='isAddedToBudget'
          sorter={(a, b) => a.isAddedToBudget - b.isAddedToBudget}
          render={(text, record) => (
            <Switch
              disabled
              checked={record?.isAddedToBudget}
              checkedChildren='Sí'
              unCheckedChildren='No'
              style={
                record?.isAddedToBudget
                  ? { backgroundColor: "#6ABC3B" }
                  : { backgroundColor: "tomato" }
              }
              onChange={async (checked) => {
                const updatedTreatment = {
                  ...record,
                  isAddedToBudget: checked,
                };
                await handleTreatmentUpdate(record?._id, updatedTreatment);
              }}
            />
          )}
        />
        <Column
          title='Acciones'
          key='actions'
          render={(text, record) => (
            <span style={{ display: "flex", justifyContent: "space-evenly" }}>
              {!record.isAddedToBudget && (
                <Button
                  type='secondary'
                  onClick={() => handleTreatmentEdit(record)}
                >
                  <EditFilled style={{ color: "purple" }} />
                </Button>
              )}
              {!record.isAddedToBudget && (
                <Button type='danger' onClick={() => showDeleteModal(record)}>
                  <DeleteOutlined style={{ color: "red" }} />
                </Button>
              )}
              <Modal
                title='¿Estás seguro de que quieres eliminar este tratamiento?'
                open={isDeleteModalVisible}
                onCancel={handleDeleteModalCancel}
                footer={[
                  <Button key='cancel' onClick={handleDeleteModalCancel}>
                    Cancelar
                  </Button>,
                  <Button
                    key='delete'
                    type='danger'
                    onClick={() => {
                      handleDeleteTreatment(currentTreatment?._id);
                      handleDeleteModalCancel();
                    }}
                  >
                    <p style={{ color: "red" }}> Eliminar</p>
                  </Button>,
                ]}
              >
                <p>Confirma si deseas eliminar este tratamiento.</p>
              </Modal>
            </span>
          )}
        />
      </Table>
  </Spin>
      <Modal
        title='Editar tratamiento'
        open={isModalVisibleEdit}
        onCancel={() => setIsModalVisibleEdit(false)}
        footer={[
          <Button key='cancel' onClick={() => setIsModalVisibleEdit(false)}>
            Cancelar
          </Button>,
          <Button
            key='save'
            type='primary'
            onClick={async () => {
              try {
                const token = JSON.parse(localStorage.getItem("token"));
                const res = await axios.put(
                  `https://dental-dashboard-backend-production.up.railway.app/tratamientos/${editableTreatment?._id}`,
                  {
                    ...editableTreatment,
                  },
                  {
                    headers: {
                      Authorization: token,
                    },
                  }
                );
                const updatedTreatment = res.data;
                const updatedTratamientos = tratamientos.map((t) =>
                  t._id === updatedTreatment._id ? updatedTreatment : t
                );
                setTratamientos(updatedTratamientos);
                setIsModalVisibleEdit(false);
              } catch (error) {
                console.log(error);
              }
            }}
          >
            Guardar cambios
          </Button>,
        ]}
      >
        <Form layout='vertical'>
          <Form.Item label='Diente:'>
            <Input
              disabled
              value={editableTreatment?.teeth}
              onChange={(e) =>
                setEditableTreatment({
                  ...editableTreatment,
                  teeth: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label='Descripción:'>
            <Input.TextArea
              value={editableTreatment?.description}
              onChange={(e) =>
                setEditableTreatment({
                  ...editableTreatment,
                  description: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label='Tipo de tratamiento:'>
            <Input
              disabled
              value={editableTreatment?.type}
              onChange={(e) => {
                console.log(editableTreatment?.type);
                setEditableTreatment({
                  ...editableTreatment,
                  type: e.target.value,
                });
              }}
            />
          </Form.Item>
          <Form.Item label='Costo:'>
            <Input
              disabled
              type='number'
              value={editableTreatment?.cost}
              onChange={(e) =>
                setEditableTreatment({
                  ...editableTreatment,
                  cost: e.target.value,
                })
              }
            />
          </Form.Item>
          <Form.Item label='Descuento:'>
            <Input
              type='number'
              value={editableTreatment?.discount}
              onChange={(e) =>
                setEditableTreatment({
                  ...editableTreatment,
                  discount: e.target.value,
                })
              }
            />
          </Form.Item>

          <Form.Item label='¿Añadido a Facturación?'>
            <Switch
              checked={editableTreatment?.isAddedToBudget}
              disabled={true}
            />
          </Form.Item>
          <Form.Item label='Empleado:'>
            <Select
              style={{ width: "100%" }}
              value={editableTreatment?.employee?._id}
              onChange={(value) =>
                setEditableTreatment({
                  ...editableTreatment,
                  employee: value,
                })
              }
              options={employees?.map((emp) => ({
                label: `${emp.firstName} ${emp.lastName}`,
                value: emp._id,
              }))}
            />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default TableTreatments;
