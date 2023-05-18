import { useNavigate } from "react-router-dom";

export const PrivateZone = ({ children }) => {
  const navigate = useNavigate()
  const token = localStorage.getItem("token");
  return token ? children : navigate('/profile');
}