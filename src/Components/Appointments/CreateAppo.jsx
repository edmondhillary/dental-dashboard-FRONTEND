import React from 'react';

const CreateAppo = () => {
    const handleCreateAppointment = async () => {
        try {
          const { fechaInicio, fechaFin, employee, comentarios } =
            await form.validateFields();
    
          // Crear cita
          const newAppointment = await createAppointment({
            fields: {
              fechaInicio,
              fechaFin,
              employee,
              patient: patientId,
              comentarios,
            },
          });
    
          // Actualizar lista de citas
          setAppointments([...appointments, newAppointment]);
    
          // Crear evento en el calendario
          const eventObj = createEventObject(newAppointment);
          scheduleObj.addEvent(eventObj);
    
          // Cerrar modal
          setShowModal(false);
    
          // Limpiar formulario
          form.resetFields();
        } catch (error) {
          console.log(error);
        }
      };
    const handleCancel = () => {
        setShowModal(false);
        form.resetFields();
      };
    return (
        <div>
                  <button
        className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'
        onClick={() => setShowModal(true)}
      >
        Crear nueva cita
      </button>

      <Modal
        open={showModal}
        onCancel={() => setShowModal(false)}
        footer={null}
      >
        <Form onFinish={handleCreateAppointment}>
          <Form.Item
            label='Fecha y hora de inicio'
            name='fechaInicio'
            rules={[
              {
                required: true,
                message: "Por favor seleccione una fecha y hora de inicio.",
              },
            ]}
          >
            <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' />
          </Form.Item>

          <Form.Item
            label='Fecha y hora de fin'
            name='fechaFin'
            rules={[
              {
                required: true,
                message: "Por favor seleccione una fecha y hora de fin.",
              },
            ]}
          >
            <DatePicker showTime format='YYYY-MM-DD HH:mm:ss' />
          </Form.Item>

          <Form.Item
            label='Odontólogo'
            name='employee'
            rules={[
              {
                required: true,
                message: "Por favor seleccione un odontólogo.",
              },
            ]}
          >
            <Select>
              {employees?.map((employee) => (
                <Option key={employee.id} value={employee.id}>
                  {employee.firstName} {employee.lastName}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item label='Comentarios' name='comentarios'>
            <Input.TextArea />
          </Form.Item>

          <Button htmlType='submit'>Crear cita</Button>
        </Form>
      </Modal>
        </div>
    );
};

export default CreateAppo;