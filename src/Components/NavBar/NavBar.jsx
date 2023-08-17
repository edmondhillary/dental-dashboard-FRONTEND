import "./NavBar.scss";
import { Drawer, Button } from "antd";
import {
  UserOutlined,
  MenuOutlined,
  TeamOutlined,
  CalendarOutlined,
  EuroCircleOutlined,
  MedicineBoxOutlined,
  HomeOutlined,
  UnlockOutlined,
  BarChartOutlined,
  MoneyCollectTwoTone,
  MenuFoldOutlined,

} from "@ant-design/icons";

import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
// import SizeContext from "antd/es/config-provider/SizeContext";
import { GlobalContext } from "../../context/UserContext/UsersState";
import imgLogo from "../../../src/assets/LOGOCODIGOPNG.png";
export const NavBar = () => {
  const [visible, setVisible] = useState(false);

  const { reset, logOut, user } = useContext(GlobalContext);
  const navigate = useNavigate();
  const isSuperAdmin =
    user?.role === "superAdmin" || user?.role === "Super Admin";
  const isAdmin = user?.role === "admin";

  return (
    <div>
      <Button
        className='stickyButton'
        type='primary'
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width:'3rem',
          height:'3rem',
          cursor: "pointer ",
          borderRadius: "1rem",
          // margin: "2rem",
          background: " #FBC837",
          color: "#333232",
          top: "2rem",
          left: "2rem",
          position: "absolute",
          border: "1px solid lightgray",
     
        }}
        size='large'
        onClick={() => setVisible(true)}
      >
    

        <MenuFoldOutlined className="custom-icon"  style={{ fontSize: '26px', color: '#333232' }} />
        
      </Button>
      <Drawer
        title={
        <>
          <div
            style={{
              margin: "2rem",
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "row",
            }}
          >
            <p style={{color: '#fff'}}>{"CLINICA DENTAL LORENZO"}</p>
            {/* <img src={imgLogo} alt='logo' style={{position: 'fixed', width: "15%", left: '10rem' }} /> */}
          </div>
         
        </>
        }
        style={{ background: "#35445a", cursor: "pointer",
        }}
        placement='left'
        onClose={() => setVisible(false)}
        open={visible}
        breakpoint='md'
        drawerStyle={{ width: "100%", maxWidth: "500px", maxHeight: '100vh'}}
      >
        <h4 style={{ color: "gray" }}>
          {` ${new Date().toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          })}`}
        </h4>
        <div className='navbar' style={{ cursor: "pointer" }}>
          <div className='container-nav'>
            <div
              className='home'
              onClick={() => {
                setVisible(false);
                console.log(user);
                navigate(`/profile/${user._id}`);
              }}
            >
              <HomeOutlined className='iconHome' />
              <div className='divHome'>Mi Perfil</div>{" "}
            </div>
            <div
              className='profile'
              onClick={() => {
                setVisible(false);
                navigate("/empleados");
              }}
            >
              <UserOutlined className='iconProfile' />
              <div className='divProfile'>Empleados</div>
            </div>
            <div
              className='create'
              onClick={() => {
                setVisible(false);
                navigate("/pacientes");
              }}
            >
              <TeamOutlined className='iconCreate' />
              <div className='divCreate'>Pacientes</div>
            </div>
            <div
              className='logout'
              onClick={() => {
                setVisible(false);
                navigate("/citas");
              }}
            >
              <CalendarOutlined className='iconlogout' />{" "}
              <div className='divLogout'>Citas</div>
            </div>
            <div
              className='logout'
              onClick={() => {
                setVisible(false);
                navigate("/tratamientos");
              }}
            >
              <MedicineBoxOutlined className='iconlogout' />{" "}
              <div className='divLogout'>Tratamientos</div>
            </div>
            {isSuperAdmin && (
              <>
                <div
                  className='logout'
                  onClick={() => {
                    setVisible(false);
                    navigate("/presupuestos");
                  }}
                >
                  <EuroCircleOutlined className='iconlogout' />{" "}
                  <div className='divLogout'>Facturación</div>
                </div>

                <div
                  className='logout'
                  onClick={() => {
                    setVisible(false);
                    navigate("/charts");
                  }}
                >
                  <BarChartOutlined className='iconlogout' />{" "}
                  <div className='divLogout'>Graficas</div>
                </div>
              </>
            )}

            {isAdmin ||
              (isSuperAdmin && (
                <div
                  className='logout'
                  onClick={() => {
                    setVisible(false);
                    navigate("/morosos");
                  }}
                >
                  <MoneyCollectTwoTone
                    twoToneColor={"tomato"}
                    className='iconlogout'
                  />{" "}
                  <div className='divLogout' style={{ color: "#fff" }}>
                    Morosos
                  </div>
                </div>
              ))}
            <div
              className='logout'
              onClick={() => {
                logOut(), navigate(`/login`);
                reset();
              }}
            >
              <UnlockOutlined className='iconlogout' />
              <div className='divLogout'>Cerrar Sesion</div>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};
