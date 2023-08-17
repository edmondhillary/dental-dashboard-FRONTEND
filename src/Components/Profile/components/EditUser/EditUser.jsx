import React, { useState } from "react";
import { EditUserForm } from "./EditUserForm";
import { Button, Modal } from "antd";
import { SettingFilled } from "@ant-design/icons";
import './EditUser.scss'

export const EditUser = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button style={{backgroundColor:'#22344a', color: '#fff'} } onClick={() => setOpen(true)}>
        <SettingFilled spin={true} style={{backgroundColor: "transparent", }} />
      </Button>

      <Modal
      
        title={<h3 style={{ textAlign: 'center', background:'#22344afc' }}>EDITAR USUARIO</h3>}
        open={isOpen}
        onCancel={() => setOpen(false)}
        // footer={
        //   <Button onClick={() => setOpen(false)} style={{ background: 'tomato'}} type='secondary'>
        //     Cancelar
        //   </Button>
        // }
        footer={null}
        width={600}
      >
        <EditUserForm setModalOpen={setOpen} />
      </Modal>
    </>
  );
};
