import { useNavigate } from "react-router-dom";

export const PrivateZone = ({ children }) => {
  console.log('soyyyyy estoy yendo a empleados!')
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  console.log('soy token  en MALDIVAS, ', token)
  return token ? children : navigate("/empleados");

};
