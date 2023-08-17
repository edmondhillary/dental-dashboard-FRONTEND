import { Button, Modal, Form, Input, Select, Row, Col } from "antd";
import { useContext, useEffect } from 'react';
import { ProfileContext } from '../../Profile';
import './EditUser.scss'

import { GlobalContext } from '../../../../context/UserContext/UsersState';


export function EditUserForm({ setModalOpen }) {
  const { logOut, editUser, deleteUser, getUserInfo, user } = useContext(GlobalContext);
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
      const res = await deleteUser(userData?._id);
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
    <Form form={form} onFinish={onFinish} style={{margin:'1rem', }}>
      <Row gutter={[16, 16]} style={{ display:'flex' , alignItems:'center', width:'1050px'}}>
        <Col xs={24} sm={24} md={12} lg={12} xl={12}>
          <Form.Item label='Nombre' name='firstName'>
            <Input placeholder='Edit your name' />
          </Form.Item>
          <Form.Item label='Apellidos' name='lastName'>
            <Input placeholder='Edita tus apellidos' />
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
        <span style={{display:'flex', justifyContent:'space-evenly', alignItems:'center'}}>

       {user?.role === "superAdmin" ?  (<Button
          className="button-edit"
          type='danger'
          style={{ background: 'tomato', margin:'1rem' }}
          onClick={() => onDelete(userData?._id)}
          >
      

          Borrar Empleado

        
        </Button>) : null

       }
        <Button
         style={{  margin:'1rem' }}
         type='primary'
         htmlType='submit'
         >
          Actualizar
        </Button>
          </span>
      </Form.Item>
    </Form>
  )
}