import { Button, Modal, Form, Input, Select, Row, Col } from "antd";
import { useContext, useEffect } from 'react';
import { ProfileContext } from '../../Profile';


import { GlobalContext } from '../../../../context/UserContext/UsersState';


export function EditUserForm({ setModalOpen }) {
  const { logOut, editUser, deleteUser, getUserInfo } = useContext(GlobalContext);
  const { userData, setUserData } = useContext(ProfileContext);
  const [form] = Form.useForm();
  

  useEffect(() => {

    form.setFieldsValue(userData);
  }, [userData]);

  const onFinish = (values) => {
    async function updateUser() {
      console.log(values
        )
      const res = await editUser( values, userData._id);
     console.log('res soooooooy: ',res.data)
      setUserData(res.data);
    };
    updateUser();
    
    setModalOpen(false);
  };

  const onDelete = () => {
    async function deleteUserById() {
      const res = await deleteUser(userData._id);
      if (res) logOut();
    }
    Modal.confirm({
      title: "¿Are you sure you want to delete your account?",
      content: "This action cannot be reverted.",
      okText: "YES",
      okType: "danger",
      cancelText: "NO",
      onOk() { deleteUserById(userData._id) },
      onCancel() { setModalOpen(false) },
    });
  };

  return (
    <Form form={form} onFinish={onFinish}>
      <Row gutter={[16, 16]}>

        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item label='Name' name='firstName'>
            <Input placeholder='Edit your name' />
          </Form.Item>
          <Form.Item label='Last Name' name='lastName'>
            <Input placeholder='Edit your lastname' />
          </Form.Item>
          <Form.Item label='Genero' name='gender'>
            <Input placeholder='Genero' />
          </Form.Item>
          <Form.Item label='email' name='email'>
            <Input placeholder='Do you want to change your email?' />
          </Form.Item>
          <Form.Item label='DNI:' name='dni'>
            <Input placeholder='DNI / NIE' />
          </Form.Item>
          <Form.Item label='Telefono' name='phone'>
            <Input placeholder='Su tfno...' />
          </Form.Item>
          <Form.Item label='Avatar' name='avatar'>
            <Input placeholder='URL DEL AVATAR' />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button
          type='primary'
          style={{ background: '#F23F42' }}
          onClick={() => onDelete(userData?._id)}
        >
          Delete account
        </Button>
        <Button
          type='primary'
          htmlType='submit'
        >
          Update info
        </Button>
      </Form.Item>
    </Form>
  )
}