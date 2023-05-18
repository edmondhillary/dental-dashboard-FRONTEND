import React, { useContext } from 'react';
import { PatientProfileContext } from './PatientProfile';
import { GlobalContext } from '../../context/UserContext/UsersState';
import { CheckCircleTwoTone, MailTwoTone } from '@ant-design/icons';
import { Avatar, Col, Descriptions, Divider, Row, Tag } from 'antd';
import EditPatient from './EditPatient';

const PatientCard = () => {
    const { user } = useContext(GlobalContext);
    const { patientData , setPatientData} = useContext(PatientProfileContext);
    const canEdit = user?._role === "admin"|| user?.role === "superAdmin";

    return (
      <>
        <Divider plain />
        <Row>
          <Col xs={0} lg={1}></Col>
          <Col xs={24} lg={6} className='left-avatar'>
            <Avatar size={180} src={ patientData?.avatar || "https://cdn.icon-icons.com/icons2/1378/PNG/512/avatardefault_92824.png" } />
          </Col>
          <Col xs={22} lg={14} className='right-info'>
            <Row justify='space-between'>
 
            </Row>
            <Row>
              <Descriptions title={
                  <span style={{display: 'flex', justifyContent: 'space-between'}}>
                {patientData.displayName}
                {"  "}
                {/* <CheckCircleTwoTone
                style={{ fontSize: "12px" }}
                twoToneColor={"#3797F0"}
            /> */}
            <EditPatient patientData={patientData} setPatientData={setPatientData} />
                </span>
              }
                >
              
                <Descriptions.Item label={"Genero"}>
                  { patientData?.gender }
                </Descriptions.Item>
                <Descriptions.Item label={"Profesion "}>
                  {patientData?.profesion}
                </Descriptions.Item>
                <Descriptions.Item label={"Edad "}>
                  { patientData?.edad }
                </Descriptions.Item>
            
                <Descriptions.Item label={"Telefono "}>
                  { patientData?.phone }
                </Descriptions.Item>
                <Descriptions.Item label={"DNI "}>
                  { patientData?.dni }
                </Descriptions.Item>
              
                <Descriptions.Item label={"Direccion "}>
                  { patientData?.address }
                </Descriptions.Item>
                
                <Descriptions.Item label={"Enfermedades "}>
                  { <Tag style={{color: 'darkorange'}}>{patientData?.historialClinicoEnfermedades}</Tag> }
                </Descriptions.Item>
            
                
              </Descriptions>
            </Row>
            <Row>
               <Descriptions >
               <Descriptions.Item label={"Alergias "}  >
                  {<Tag style={{color: 'red'}}>{patientData?.alergias}</Tag>
                  }
                </Descriptions.Item>
               </Descriptions>
                
            </Row>
            <Row>
               <Descriptions>
                
                  
               <Descriptions.Item label={"Historial dental  "}>
                  { <Tag style={{color: 'darkgreen'}}>{patientData?.historialDental}</Tag>}
                </Descriptions.Item>
                </Descriptions>
            </Row>
            <Row>
               <Descriptions>
                
                <Descriptions.Item label={"Email "}>
                  { patientData?.email }
                </Descriptions.Item>
               </Descriptions>
                
            </Row>
          </Col>
          <Col xs={2} lg={2}></Col>
        </Row>
  
      </>
    );
};

export default PatientCard;