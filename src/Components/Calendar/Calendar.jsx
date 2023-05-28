import React, { useContext, useEffect, useState } from "react";
import {
  ScheduleComponent,
  ViewsDirective,
  ViewDirective,
  Day,
  WorkWeek,
  Month,
  Agenda,
  Inject,
  Resize,
} from "@syncfusion/ej2-react-schedule";
import { Link, useParams } from "react-router-dom";
import {
  createAppointment,
  deleteAppointment,
  getAppointmentsFromPatient,
  updateAppointment,
  getAppointmentsFromEmployee,
  getAllAppointments,
} from "../../service/appopintmentsService/appointmetnsService";
import { Modal, Button, Form, Select, DatePicker, Input, Tag } from "antd";
import { getEmployees } from "../../service/employeService/employeeService.js";
import dayjs from "dayjs";
import "dayjs/locale/es";
import locale from "antd/es/date-picker/locale/es_ES";
import { ConfigProvider } from "antd";
import "./Calendar.scss";
import moment from "moment";
import { searchByDisplayName } from "../../service/patientService/patientsService";
import { GlobalContext } from "../../context/UserContext/UsersState";
const { Option } = Select;

const Calendar = ({ userData, patientData, userType }) => {
  const { user } = useContext(GlobalContext);
  const [isInfoModalVisible, setIsInfoModalVisible] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [employees, setEmployees] = useState([]);
  const { id } = useParams();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [formData, setFormData] = useState({
    fechaInicio: null,
    fechaFin: null,
    patient: patientData ? patientData : null,
    employee: null,
    comentarios: "",
    patientDisplayName: "",
  });

  const [modalMode, setModalMode] = useState(""); // Agregar esta línea

  async function fetchAppointments() {
    console.log(user?.role)
    let appointments = [];

    if (userType === "patient") {
      appointments = await getAppointmentsFromPatient(patientData?._id);
    } else if (userType === "employee") {
      appointments = await getAppointmentsFromEmployee(userData?._id); // Asume que esta función existe en tu servicio
    } else if (userType === "global") {
      appointments = await getAllAppointments();
    }
    setAppointments(appointments);
  }
  useEffect(() => {
   
    fetchAppointments();
  }, [patientData, userData, userType, isModalVisible]);

  useEffect(() => {
    async function fetchEmployees() {
      const employees = await getEmployees();
      setEmployees(employees);
    }

    fetchEmployees();
  }, []);
  const createEventObject = (appointment) => {
    const employeeId = appointment?.employee?._id;
    console.log("SOY citaaaaaaaaaaaaaaaaaaaaAAA", appointment);
    return {
      Id: appointment?.id,
      Subject:
        appointment?.employee?.firstName +
        " " +
        appointment?.employee?.lastName,
      StartTime: new Date(appointment?.fechaInicio),
      EndTime: new Date(appointment?.fechaFin),
      IsAllDay: false,
      Location: "C/ Manuel Candela 5 pta 1, Valencia",
      Description: appointment?.comentarios,
      Tfno: "963608833",
      patient:
        appointment?.patient?.firstName + " " + appointment?.patient?.lastName,
      employeeId: employeeId,
      employee: appointment?.employee?.displayName,
      patientId: appointment?.patient?._id,
      patientPhone: appointment?.patient?.phone,
    };
  };
  const handlePopupOpen = (args) => {
    console.log({ formData }, args.type, { modalMode });
    if (args?.type === "Editor") {
      setIsModalVisible(true);
      setModalMode("edit");

      const eventData = args?.data;
      console.log("23333333333333", { eventData });
      console.log({ formData });
      console.log({ args });
      setFormData({
        ...formData,

        Id: eventData?.Id,
        employee: eventData?.employeeId,
        fechaInicio: eventData?.StartTime,
        fechaFin: eventData?.EndTime,
        comentarios: eventData?.Description,
        patient: eventData.patientId,
        patientDisplayName: eventData?.patient,
      });
    } else if (args?.type === "DeleteAlert") {
      setIsModalVisible(true);
      setModalMode("delete");

      const eventData = args?.data;

      setFormData({
        ...formData,
        Id: eventData?.Id,
        employee: eventData?.employeeId,
        fechaInicio: eventData?.StartTime,
        fechaFin: eventData?.EndTime,
        comentarios: eventData?.Description,
      });
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    await deleteAppointment(appointmentId);
    const updatedAppointments = await getAppointmentsFromPatient(
      patientData?._id
    );
    setAppointments(updatedAppointments);
  };

  const handleEditAppointment = async (appointmentId, updatedAppointment) => {
    console.log({ updatedAppointment });
    await updateAppointment(appointmentId, updatedAppointment);
    if (userType === "patient" ) {
      const updatedAppointments = await getAppointmentsFromPatient(
        patientData?._id
      );
      setAppointments(updatedAppointments);
    } else if (userType === "employee") {
      const updatedAppointments = await getAppointmentsFromEmployee(
        userData?._id
      );
      setAppointments(updatedAppointments);
    } else if (userType === "global") {
      const updatedAppointments = await getAllAppointments();
      setAppointments(updatedAppointments);
    }
  };

  const employeeColors = {
    "64353dce2bd6ac06de6df581": "#2E86C1",
    "64353dce2bd6ac06de6df583": "#28B463",
    "64353dce2bd6ac06de6df582": "#F39C12",
    "643e4b074bbfa1dd4e02a839": "#CB4335",
    "6440700ca9e03ec3bc234bdc": "#07DDB0",
    "64407057a9e03ec3bc234bde": "#D35400",
    "6440709aa9e03ec3bc234be0": "#72BFDE",
    "644070a8a9e03ec3bc234be2": "#880e4f",
    "644070ada9e03ec3bc234be4": "#7D3C98",
    "644070b0a9e03ec3bc234be6": "#8e24aa",
    "644070b5a9e03ec3bc234be8": "#f57f17",
    "644070b9a9e03ec3bc234bea": "#5D6D7E",
    "644070dda9e03ec3bc234bec": "#1a6491",
  };

  const getEmployeeColor = (employeeId) => {
    return employeeColors[employeeId];
  };
  const eventRendered = (args) => {
    console.log({ args });
    const employeeId = args?.data?.employeeId;
    const color = getEmployeeColor(employeeId);
    args.element.style.backgroundColor = color;
  };

  function eventTemplate(args) {
    console.log("soy args, ", args);
    const employeeId = args?.employeeId;
    const color = getEmployeeColor(employeeId);

    return (
      <div
        style={{
          backgroundColor: color,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // borderRadius: "4px",
          // wordWrap: 'break-word',
          margin: "2rem",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            wordWrap: "break-word",
            fontWeight: "bold", // Resalta el Subject con texto en negrita
            textAlign: "center",
          }}
        >
          {args?.Subject}
        </div>

        <div
          style={{
            wordWrap: "break-word",
            fontStyle: "italic", // Diferencia el horario con texto en cursiva
            textAlign: "center",
          }}
        >
          {dayjs(args?.StartTime).format("HH")} -{" "}
          {dayjs(args?.EndTime).format("HH")}H
        </div>

        <div
          style={{
            wordWrap: "break-word",
            fontWeight: "bold", // Resalta el nombre del paciente con texto en negrita
            textAlign: "center",
            letterSpacing: "0.1rem",
          }}
        >
          {args?.patient?.toUpperCase()}
        </div>
      </div>
    );
  }

  const isPastDate = (currentDate) => {
    return currentDate && currentDate.isBefore(dayjs().startOf("day"));
  };
  const getDisabledHours = (currentDate) => {
    if (!currentDate) return [];

    const isToday = currentDate.isSame(dayjs(), "day");
    if (!isToday) return [];

    const currentHour = dayjs().hour();
    const disabledHours = [];
    for (let hour = 0; hour < currentHour; hour++) {
      disabledHours.push(hour);
    }

    return disabledHours;
  };

  const appointmentEvents = appointments?.map(createEventObject);

  const onCellClick = (args) => {
    console.log("ojo", { args });

    if (userType === "employee" || user?.role === "Employee") {
      args.cancel = true;

      Modal.error({
        title: "No se puede crear cita desde el PERFIL  Empleado",
        content:
          "No está permitido crear una cita desde la vista de empleado. Por favor, dirígete a la sección de citas o al perfil del paciente  y dile al administrador/a para crear una cita.",
        // okText: "Entendido",
      });
      setIsModalVisible(false);
      return;
    }
    const cellDateTime = args?.startTime;

    // Comprueba si la celda está en el pasado.
    if (dayjs(cellDateTime).isBefore(dayjs(), "hour")) {
      args.cancel = true;
      return; // Si la celda está en el pasado, no hagas nada.
    }
    args.cancel = true;
    setIsModalVisible(true);
    setModalMode("create"); // Agrega esta línea
    setFormData({
      ...formData,
      comentarios: "",
      employee: null,

      patient: patientData?._id,
      fechaInicio: cellDateTime,
      fechaFin: new Date(cellDateTime.getTime() + 60 * 60 * 1000),
    });
  };
  const [patients, setPatients] = useState([]);
  const [selectedPatientId, setSelectedPatientId] = useState(null);

  const handleSearch = async (value) => {
    if (value) {
      const results = await searchByDisplayName(value); // Suponiendo que esta función busca pacientes basándose en el valor proporcionado
      setPatients(results);
    } else {
      setPatients([]);
    }
  };

  const handleChange = (value) => {
    setSelectedPatientId(value);
  };
  const handleCreateAppointment = async () => {
    try {
      let appointmentData = {
        fechaInicio: formData.fechaInicio.toISOString(),
        fechaFin: formData.fechaFin.toISOString(),
        patient: patientData?._id,
        employee: formData.employee,
        comentarios: formData.comentarios,
      };

      if (userType === "patient") {
        const newAppointment = await createAppointment(appointmentData);
        setAppointments([...appointments, newAppointment]);
        const updatedAppointments = await getAppointmentsFromPatient(
          patientData?._id
        );
        setAppointments(updatedAppointments);
      } else if (userType === "global" ) {
        appointmentData.patient = selectedPatientId;
        await createAppointment(appointmentData);
        const updatedAppointments = await getAllAppointments();
        setAppointments(updatedAppointments);
      }

      setIsModalVisible(false);
      setFormData({
        employee: "",
        fechaFin: null,
        fechaInicio: null,
        comentarios: "",
        patient: null,
      });
    } catch (error) {
      console.log('holaaaaaa la conchaaaaaaaa auuuusussusususuussu maammamamaammam'); // Muestra el objeto de error completo en la consola
      if (error.response && error.response.data && error.response.data.error) {
        Modal.error({
          title: "ERROR: " + error.response.data.error,
          content:
            "Error al crear la cita, el empleado no puede tener dos citas al mismo tiempo",
        });
      } else {
        // Manejo de otros errores
        Modal.info({
          title: "Error",
          content: "Error al crear la cita",
        });
      }
    }
    
  };

  const onActionBegin = (args) => {
    console.log("soy la mierda");
    if (
      args.requestType === "eventCreate" ||
      args.requestType === "eventChange"
    ) {
      const startDate = args.data[0].StartTime;
      if (dayjs(startDate).isBefore(dayjs())) {
        args.cancel = true;
      }
    }
  };
  const onPopupOpen = (args) => {
    if (args.type === "Editor" || args.type === "DeleteAlert") {
      args.cancel = true; // Cancela la apertura del cuadro de diálogo predeterminado
      handlePopupOpen(args);
    }
  };

  function handleEventClick(args) {
    if (userType === "employee" ||  user?.role === "Employee") {
      args.cancel = true;
      setIsInfoModalVisible(true);
      setSelectedAppointment(args.event);
    }
  }

  console.log(employees?.map((employee) => employee?._id));
  return (
    <div className='m-2 md:m-10 mt-24 p-2 md:p-10 bg-white rounded-3xl'>
      <ScheduleComponent
    
        onActionBegin={onActionBegin}
        style={{ margin: "2rem" }}
        height='950px'
        eventSettings={{
          template: eventTemplate,
          dataSource: appointmentEvents,
          allowEditing: true,
          allowDeleting: true,
          editFollowingEvents: false,
          popupOpen: handlePopupOpen,
          popupSettings: {
            // Estilos CSS personalizados para el pop-up
            cssClass: 'custom-popup',
            height: '300px', // Ajusta la altura según tus necesidades
            width: '300px', // Ajusta el ancho según tus necesidades
          },
        }}
        eventRendered={eventRendered}
        cssClass='custom-class'
        cellClick={onCellClick}
        eventClick={handleEventClick}
        popupOpen={onPopupOpen}
        readOnly={userType === "employee"}
      >
        <ViewsDirective>
          <ViewDirective option='Day' startHour='08:00' endHour='22:00' />
          <ViewDirective option='WorkWeek' startHour='08:00' endHour='22:00' />
          <ViewDirective option='Month' />
          <ViewDirective option='Agenda' />
        </ViewsDirective>
        <Inject services={[Day, WorkWeek, Month, Agenda, Resize]} />
      </ScheduleComponent>
      <Modal
        title='Información de la cita'
        open={isInfoModalVisible}
        onCancel={() => setIsInfoModalVisible(false)}
        footer={null}
      >
        <p>
          <Link to={`/pacientes/${selectedAppointment?.patientId}`}>
            <Tag color='green'>
              {`Paciente: ${selectedAppointment?.patient}`}
            </Tag>
          </Link>
        </p>
        <br />
        <p>
          <Tag color='magenta'>
            {`Telefono Paciente: ${selectedAppointment?.patientPhone}`}
          </Tag>
        </p>
        <br />
        <p>
          <Link to={`/profile/${selectedAppointment?.employeeId}`}>
            {console.log({ selectedAppointment })}
            <Tag color='blue'>
              {`Empleado/a: ${selectedAppointment?.Subject}`}
            </Tag>
          </Link>
        </p>
        <br />

        <p>
          <Tag color='blue'>{`Fecha y hora: ${moment(
            selectedAppointment?.StartTime
          )
            .locale("es")
            .format(" D/M/YY [a las] h:mm a")}`}</Tag>
        </p>
        <br />

        <p>
          <Tag color='tomato'>{`Comentarios : ${
            selectedAppointment?.Description || "Ninguno"
          }`}</Tag>
        </p>
      </Modal>

      <Modal
        title={
          modalMode === "edit"
            ? "Editar cita"
            : modalMode === "delete"
            ? "Eliminar cita"
            : "Crear cita"
        }
        open={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={[
          <Button key='cancel' onClick={() => setIsModalVisible(false)}>
            Cancelar
          </Button>,
          <Button
            key='submit'
            type={modalMode !== "delete" ? "primary" : "secondary"}
            onClick={async () => {
              if (modalMode === "create") {
                await handleCreateAppointment();
              } else if (modalMode === "edit") {
                console.log({ formData });
                await handleEditAppointment(formData?.Id, formData);
              } else if (modalMode === "delete") {
                await handleDeleteAppointment(formData?.Id);
              }
              setIsModalVisible(false);
            }}
          >
            {modalMode === "edit"
              ? "Guardar cambios"
              : modalMode === "delete"
              ? "Eliminar cita"
              : "Crear cita"}
          </Button>,
        ]}
      >
        <ConfigProvider locale={locale}>
          <Form layout='vertical'>
            {userType === "global" ? (
              <Form.Item rules={[{ required: true }]} label='ID del paciente'>
                <Select
                  showSearch
                  value={selectedPatientId}
                  style={{ width: 450 }}
                  placeholder='Busca y selecciona un paciente'
                  defaultActiveFirstOption={false}
                  showArrow={false}
                  filterOption={false}
                  onSearch={handleSearch}
                  onChange={handleChange}
                  notFoundContent={null}
                >
                  {patients?.map((patient) => (
                    <Option key={patient?.id} value={patient?._id}>
                      {patient?.displayName}
                    </Option> // Suponiendo que cada paciente tiene un id y un nombre
                  ))}
                </Select>
              </Form.Item>
            ) : (
              <Form.Item rules={[{ required: true , message: "Por favor, ingrese el paciente",}]} label='ID del paciente'>
                {console.log({ formData })}
                <Input
                  readOnly
                  value={
                    formData?.patientDisplayName || patientData?.displayName
                  }
                />
              </Form.Item>
            )}
            <Form.Item rules={[{ required: true , message: "Por favor, ingrese el EMPLEADO",}]} label='Empleado'>
              <Select
                value={formData?.employee}
                onChange={(value) =>
                  setFormData({ ...formData, employee: value })
                }
              >
                {employees?.map((employee) => (
                  <Option key={employee?._id} value={employee?._id}>
                    {employee?.firstName} {employee?.lastName}
                  </Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item rules={[{ required: true , message: "Por favor, ingrese la hora de inicio",}]} label='Fecha y hora de inicio'>
              <DatePicker
                showTime
                format='YYYY-MM-DD HH:mm'
                value={
                  formData?.fechaInicio ? dayjs(formData?.fechaInicio) : null
                }
                onChange={(date) =>
                  setFormData({ ...formData, fechaInicio: date.toDate() })
                }
                disabledDate={isPastDate}
                disabledTime={(currentDate) => ({
                  disabledHours: () => getDisabledHours(currentDate),
                })}
                locale={locale}
              />
            </Form.Item>
            <Form.Item rules={[{ required: true , message: "Por favor, ingrese la hora de fin de cita",}]} label='Fecha y hora de finalización'>
              <DatePicker
                showTime
                format='YYYY-MM-DD HH:mm'
                value={formData?.fechaFin ? dayjs(formData?.fechaFin) : null}
                onChange={(date) =>
                  setFormData({ ...formData, fechaFin: date.toDate() })
                }
                disabledDate={isPastDate}
                disabledTime={(currentDate) => ({
                  disabledHours: () => getDisabledHours(currentDate),
                })}
                locale={locale}
              />
            </Form.Item>
            <Form.Item label='Comentarios'>
              <Input.TextArea
                value={formData?.comentarios}
                onChange={(e) =>
                  setFormData({ ...formData, comentarios: e.target.value })
                }
              />
            </Form.Item>
          </Form>
        </ConfigProvider>
      </Modal>
    </div>
  );
};
export default Calendar;
