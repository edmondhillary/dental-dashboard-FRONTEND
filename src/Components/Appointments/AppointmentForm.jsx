import React, { useState } from 'react';
import { Modal, Form, Input, DatePicker, message } from 'antd';

const AppointmentForm = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  return (
    <Modal
      open={visible}
      title="Crear nueva cita"
      okText="Crear"
      cancelText="Cancelar"
      onCancel={onCancel}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            onCreate(values);
          })
          .catch((info) => {
            message.error('Por favor, revisa los campos del formulario');
          });
      }}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="start"
          label="Fecha Inicio"
          rules={[{ required: true, message: 'Por favor, selecciona la fecha de inicio' }]}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item
          name="end"
          label="Fecha Fin"
          rules={[{ required: true, message: 'Por favor, selecciona la fecha de fin' }]}
        >
          <DatePicker showTime />
        </Form.Item>
        <Form.Item
          name="patient"
          label="Paciente"
          rules={[{ required: true, message: 'Por favor, selecciona un paciente' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="employee"
          label="Empleado"
          rules={[{ required: true, message: 'Por favor, selecciona un empleado' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="comments" label="Comentarios">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AppointmentForm;
