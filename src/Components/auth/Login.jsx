import { Form, Input, Button, notification } from "antd";
import React, { useContext, useEffect, useState } from "react";
import "./Login.scss";
import { GlobalContext } from "../../context/UserContext/UsersState";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const { login, isError, reset, user, getUserInfo } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [form] = Form.useForm(); // Obtiene la instancia del formulario para poder acceder a sus métodos

  const [loggedIn, setLoggedIn] = useState(false); // Agregar variable de estado

  const handleLogin = async (values) => {
    await login(values);
    setLoggedIn(true);
    await getUserInfo(1,1,1,1);
  };

  useEffect(() => {
    if (loggedIn) { // Redirigir solo si se ha iniciado sesión con éxitoclg
      console.log('navegandooooooooooooo al perfil!!!')
      navigate(`/profile/${user?._id}`);
    }
  }, [loggedIn, user, navigate]);

  useEffect(() => {
    if (isError) {
      notification.error({
        message: "Wrong email or password. Try Again!!"
      });
      reset()
    };
  }, [isError]);
  return (
    <div className="bodyy">
      <div className="container">
        <h2 className="login-title">Log in</h2>

        <Form
         autoComplete="off"
         initialValues={{ remember: false }}
         form={form} 
         onFinish={handleLogin}>
          <div>
            <label htmlFor="email">Email </label>
            <Form.Item name="email">
              <Input placeholder="me@example.com" />
            </Form.Item>
          </div>

          <div>
            <label htmlFor="password">Contraseña </label>
            <Form.Item name="password">
              <Input type="password" placeholder="password" />
            </Form.Item>
          </div>

          <button className="btn btn--form" type="submit" style={{width: '100%'
        }}>
            Log in
          </button>
        </Form>
      </div>
    </div>
  );
};

export default Login;
