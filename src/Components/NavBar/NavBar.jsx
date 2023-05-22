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
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
// import SizeContext from "antd/es/config-provider/SizeContext";
import { GlobalContext } from "../../context/UserContext/UsersState";

export const NavBar = () => {
  const [visible, setVisible] = useState(false);

  const { reset, logOut, user } = useContext(GlobalContext);
  const navigate = useNavigate();
  const isSuperAdmin = user?.role === "superAdmin" || user?.role === "Super Admin";
  const isAdmin = user?.role === "admin";

  return (
    <>
      <Button
        className='stickyButton'
        type='secondary'
        style={{
          cursor: "pointer ",
          borderRadius: "33.3%",
          margin: "2rem",
          background: " #91b5b3",
          color: "white",
          top: "0rem",
          left: "2rem",
          position: "absolute",
          border: "1px solid lightgray",
          backgroundColor: "#lightgray",
          WebkitBoxShadow: "8px 4px 20px -1px rgba(156,126,158,0.63)",
          boxShadow: " 8px 4px 20px -1px rgba(156,126,158,0.63)",
        }}
        size='large'
        onClick={() => setVisible(true)}
      >
        <MenuOutlined style={{ color: "white", fontWeight: "700" }} />
      </Button>
      <Drawer
        title={`Clinica Dental Lorenzo Gonzalez `}
        style={{ background: "#fff", cursor: "pointer" }}
        placement='left'
        onClose={() => setVisible(false)}
        open={visible}
        breakpoint='md'
        drawerStyle={{ width: "80%", maxWidth: "300px" }}
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
            { isSuperAdmin && (
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
              
              { isAdmin || isSuperAdmin && (  <div
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
                  <div className='divLogout' style={{ color: "tomato" }}>
                    Morosos
                  </div>
                </div>)}
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
    </>
  );
};
