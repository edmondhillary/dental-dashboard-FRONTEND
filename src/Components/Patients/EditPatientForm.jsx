import { Button, ConfigProvider, DatePicker, Form, Input, Select } from "antd";
import React, { useState } from "react";
import { updatePatient } from "../../service/patientService/patientsService";
import dayjs from "dayjs";
import "dayjs/locale/es";
import locale from "antd/locale/es_ES";

const { Option } = Select;

const EditPatientForm = ({ setModalOpen, patientData, setPatientData }) => {
  const [form] = Form.useForm();

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
        <Button
          type='primary'
          style={{ background: "#F23F42" }}
          onClick={() => onDelete(patientData?._id)}
        >
          Eliminar cuenta
        </Button>
        <Button type='primary' htmlType='submit'>
          Actualizar información
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditPatientForm;
