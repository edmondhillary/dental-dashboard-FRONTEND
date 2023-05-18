import React, { useState } from "react";
import  EditPatientForm  from './EditPatientForm'
import { Button, Modal } from "antd";
import { MoreOutlined } from "@ant-design/icons";
import './EditPatient.scss'

const EditPatient = ({patientData, setPatientData }) => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button type='secondary' onClick={() => setOpen(true)}>
       <MoreOutlined style={{ fontWeight: 'bold',
    fontSize: '24px',
    transform: 'rotate(90deg)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'black'
    }}/>
      </Button>

      <Modal
        title={<h3 style={{ textAlign: 'center' }}>EDITAR PACIENTE</h3>}
        open={isOpen}
        onCancel={() => setOpen(false)}
        footer={
          <Button onClick={() => setOpen(false)} style={{ background: 'gray' }} type='primary'>
            Cancel
          </Button>
        }
        width={800}
      >
        <EditPatientForm  patientData={patientData} setPatientData={setPatientData} setModalOpen={setOpen}/>
      </Modal>
    </>
  );
};
export default EditPatient;
