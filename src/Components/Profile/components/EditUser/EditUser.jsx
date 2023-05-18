import React, { useState } from "react";
import { EditUserForm } from "./EditUserForm";
import { Button, Modal } from "antd";
import { SettingFilled } from "@ant-design/icons";
import './EditUser.scss'

export const EditUser = () => {
  const [isOpen, setOpen] = useState(false);

  return (
    <>
      <Button type='primary' onClick={() => setOpen(true)}>
        <SettingFilled />
      </Button>

      <Modal
        title={<h3 style={{ textAlign: 'center' }}>EDIT USER</h3>}
        open={isOpen}
        onCancel={() => setOpen(false)}
        footer={
          <Button onClick={() => setOpen(false)} style={{ background: 'gray' }} type='primary'>
            Cancel
          </Button>
        }
        width={800}
      >
        <EditUserForm setModalOpen={setOpen} />
      </Modal>
    </>
  );
};
