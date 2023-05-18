import { UserAddOutlined } from "@ant-design/icons";
import { Button, Modal, Form, Input, Select, Row, Col, Checkbox } from "antd";
import React, { useState, useContext } from "react";
import { PatientContext } from "../../context/PatientContext/PatientState";
import axios from "axios";
import { createPatient } from "../../service/patientService/patientsService";

const { Option } = Select;

const AddPatient = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [isFirstVisit, setIsFirstVisit] = useState(true);
  const [form] = Form.useForm();

  const handleModal = () => {
    setModalVisible(!modalVisible);
  };

  const handleCheckboxChange = (e) => {
    setIsFirstVisit(e.target.checked);
  };
  const handleOk = () => {
    form.validateFields().then((values) => {
      console.log(values);
      createPatient(values).then(() => {
        form.resetFields();
        setModalVisible(false);
      });
    });
  };

  return (
    <>
      <Button
        type='primary'
        size='large'
        onClick={handleModal}
        style={{
          top: "2rem",
          right: "2rem",
          position: "absolute",
        }}
      >
        <UserAddOutlined
          style={{
            fontSize: "1.5rem",
            color: "white",
          }}
        />
      </Button>
      <Modal
        title='Nuevo paciente'
        open={modalVisible}
        onCancel={handleModal}
        onOk={handleOk}
        okText='Guardar'
        cancelText='Cancelar'
        width='70%'
        style={{
          maxHeight: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Form form={form}>
              <Form.Item
                label='Nombre'
                name='firstName'
                rules={[
                  { required: true, message: "Por favor, ingrese el nombre" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label='Segundo nombre' name='secondName'>
                <Input />
              </Form.Item>
              <Form.Item
                label='Apellidos'
                name='lastName'
                rules={[
                  { required: true, message: "Por favor, ingrese el apellido" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label='Correo electrónico' name='email'>
                <Input />
              </Form.Item>
              <Form.Item
                label='Teléfono'
                name='phone'
                rules={[
                  { required: true, message: "Por favor, ingrese el teléfono" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item label='Fecha de nacimiento' name='dateOfBirth'>
                <Input type='date' />
              </Form.Item>
            </Form>
          </Col>
          <Col xs={24} md={12}>
            <Form form={form}>
              <Form.Item label='Género' name='gender'>
                <Select>
                  <Option value='Masculino'>Masculino</Option>
                  <Option value='Femenino'>Femenino</Option>
                </Select>
              </Form.Item>
              <Form.Item label='Dirección' name='address'>
                <Input />
              </Form.Item>
              <Form.Item label='DNI' name='dni'>
                <Input />
              </Form.Item>
              <Form.Item label='Profesión' name='profesion'>
                <Input />
              </Form.Item>
              <Form.Item
                label='Historial clínico - enfermedades'
                name='historialClinicoEnfermedades'
              >
                <Input.TextArea />
              </Form.Item>
            </Form>
          </Col>
          <Col xs={24} md={12}>
            <Form form={form}>
              <Form.Item name='historialDental' label='Historial Dental'>
                <Input.TextArea />
              </Form.Item>
              <Form.Item name='alergias' label='Alergias'>
                <Input.TextArea />
              </Form.Item>
              <Form.Item name='otrosCamposMedicos' label='Otros Campos Medicos'>
                <Input.TextArea />
              </Form.Item>
              <Form.Item name='avatar' label='Avatar'>
                <Input />
              </Form.Item>
              <Form.Item label='¿Primera Visita?'>
                <Checkbox
                  checked={isFirstVisit}
                  onChange={handleCheckboxChange}
                >
                  {isFirstVisit ? "Sí" : "No"}
                </Checkbox>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </Modal>
    </>
  );
};
export default AddPatient;
