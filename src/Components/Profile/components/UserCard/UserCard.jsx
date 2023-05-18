import React, { useContext } from "react";

import { ProfileContext } from "../../Profile";
import { EditUser } from "../EditUser/EditUser";

import { Avatar,  Col, Descriptions, Divider, Row, Tag } from "antd";
import { CheckCircleTwoTone } from "@ant-design/icons";
import "./UserCard.scss";
import { GlobalContext } from "../../../../context/UserContext/UsersState";

export const UserCard = () => {
  const { user } = useContext(GlobalContext);
  const { userData } = useContext(ProfileContext);
  const canEdit = user?._id === userData?._id || user?.role === "superAdmin";
console.log(user
  )


  return (
    <>
      <Divider plain />
      <Row>
        <Col xs={0} lg={1}></Col>
        <Col xs={24} lg={6} className='left-avatar'>
          <Avatar style={{
            backgroundSize: "cover",
            
          }} size={190} src={userData?.avatar ? userData?.avatar : "https://i.pinimg.com/736x/5"
          } />
        </Col>
        <Col xs={22} lg={14} className='right-info'>
          <Row justify='space-between'>
            <h4>
              {userData?.displayName}{" "}
              <Tag  style={{ color: "tomato", margin: '0 .5rem' }}>
                {userData?.role === "superAdmin"? " Super Admin " : userData?.role}
              
              </Tag>
               
              
            </h4>
            {/* <button>Enviar mensaje Añadir contacto</button> */}
            {/* {!canEdit && <FollowButton />} */}
            {console.log(canEdit)}
            {canEdit && <EditUser />}
          </Row>

          <Row>
          </Row>

          <Row>
            <Descriptions title='Info'>
              <Descriptions.Item label={"DNI "}>
                {userData?.dni}
              </Descriptions.Item>
              <Descriptions.Item label={"Telefono "}>
                {userData?.phone}
              </Descriptions.Item>
              <Descriptions.Item label={"Especialidad "}>
                {userData?.speciality}
              </Descriptions.Item>
              <Descriptions.Item label={"genero "}>
                {userData?.gender}
              </Descriptions.Item>
              <Descriptions.Item label={"Nro Pacientes "}>
                {userData?.patients?.length}
              </Descriptions.Item>
              <Descriptions.Item label={"Numero Tratamientos "}>
                {userData?.treatments?.length}
              </Descriptions.Item>
            </Descriptions>
          </Row>
        </Col>
        <Col xs={2} lg={2}></Col>
      </Row>

    </>
  );
};

