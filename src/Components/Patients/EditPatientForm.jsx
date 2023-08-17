import { Button, ConfigProvider, DatePicker, Form, Input, Modal, Select, message } from "antd";
import React, { useContext, useState } from "react";
import { updatePatient } from "../../service/patientService/patientsService";
import dayjs from "dayjs";
import "dayjs/locale/es";
import locale from "antd/locale/es_ES";
import { useNavigate } from "react-router-dom";
import { deletePatient } from "../../service/patientService/patientsService";
import { GlobalContext } from "../../context/UserContext/UsersState";
const { Option } = Select;

const EditPatientForm = ({ setModalOpen, patientData, setPatientData }) => {
  const { user } = useContext(GlobalContext)

  const navigate = useNavigate()
  const [form] = Form.useForm();

  const onDelete = (id) => {

    async function deletePatientById(id){
      console.log(user?.role)
      const res = await deletePatient(id)
      message.success('Se borro el puto paciente')
      navigate('/pacientes');
      setModalOpen(false)
    }
    Modal.confirm({
      title: "¿Está segur@ de eliminar al paciente?",
      content: "Vas a eliminar al paciente, no se puede revocar esta acción",
      okText: "SI",
      okType: "danger",
      cancelText: "NO",
      onOk() { deletePatientById(id) },
      onCancel() { setModalOpen(false) },
    });
    
  };
  const onFinish = (values) => {
    updatePatient(patientData.id, values)
      .then((res) => {
        console.log({ res });
        setModalOpen(false);
        setPatientData(res);
      })
      .catch((err) => {
        console.log(err);
      });

    // Implementar lógica de actualización aquí
    console.log({ values });
    setModalOpen(false);
  };

  return (
    <Form form={form} onFinish={onFinish} initialValues={patientData}>
      <Form.Item label='Nombre' name='firstName'>
        <Input placeholder='Editar nombre' />
      </Form.Item>
      <Form.Item label='Segundo nombre' name='secondName'>
        <Input placeholder='Editar segundo nombre' />
      </Form.Item>
      <Form.Item label='Apellidos' name='lastName'>
        <Input placeholder='Editar apellidos' />
      </Form.Item>
      <Form.Item label='Correo electrónico' name='email'>
        <Input placeholder='Editar correo electrónico' />
      </Form.Item>
      <Form.Item label='Teléfono' name='phone'>
        <Input placeholder='Editar teléfono' />
      </Form.Item>
      <Form.Item label='Fecha de nacimiento' name='dateOfBirth'>
        <Input type='date' placeholder='Editar fecha de nacimiento' />
      </Form.Item>
      <Form.Item label='Género' name='gender'>
        <Select placeholder='Seleccionar género'>
          <Option value='Masculino'>Masculino</Option>
          <Option value='Femenino'>Femenino</Option>
        </Select>
      </Form.Item>
      <Form.Item label='Dirección' name='address'>
        <Input placeholder='Editar dirección' />
      </Form.Item>
      <Form.Item label='DNI' name='dni'>
        <Input placeholder='Editar DNI' />
      </Form.Item>
      <Form.Item label='Profesión' name='profesion'>
        <Input placeholder='Editar profesión' />
      </Form.Item>
      <Form.Item
        label='Historial clínico - enfermedades'
        name='historialClinicoEnfermedades'
      >
        <Input.TextArea placeholder='Editar historial clínico - enfermedades' />
      </Form.Item>
      <Form.Item label='Historial Dental' name='historialDental'>
        <Input.TextArea placeholder='Editar historial dental' />
      </Form.Item>
      <Form.Item label='Alergias' name='alergias'>
        <Input.TextArea placeholder='Editar alergias' />
      </Form.Item>
      <Form.Item label='Otros campos médicos' name='otrosCamposMedicos'>
        <Input.TextArea placeholder='Editar otros campos médicos' />
      </Form.Item>
      <Form.Item label='email' name='email'>
        <Input placeholder='email' />
      </Form.Item>
      <Form.Item label='Nacimiento' name='dateOfBirth'>
        <ConfigProvider locale={locale}>
          <DatePicker defaultValue={dayjs("2015-01-01", "YYYY-MM-DD")} />
        </ConfigProvider>
      </Form.Item>
      
      <Form.Item label='Avatar' name='avatar'>
        <Input placeholder='Editar URL del avatar' />
      </Form.Item>
      <Form.Item>
      <span style={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>
      {user?.role === "superAdmin" || user?.role === "admin"  || user?.role === "superadmin"  ? (
          <Button type="primary" style={{ background: "#F23F42" }} onClick={onDelete}>
            Eliminar paciente
          </Button>
        ) : null}
        <Button type='primary' htmlType='submit'>
          Actualizar información
        </Button>
          </span>
      </Form.Item>
    </Form>
  );
};

export default EditPatientForm;
