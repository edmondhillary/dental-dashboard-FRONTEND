import React, { useContext } from "react";
import { NotFoundPage } from "../Components/404/NotFoundPage";
import { GlobalContext } from "../context/UserContext/UsersState";


export const AdminZone = ({ children }) => {
    const { user } = useContext(GlobalContext);
  
    // Reemplaza "Admin" con el rol adecuado para los administradores
    if (user?.role === "Employee") {
      // Puedes redirigir al usuario o simplemente devolver un componente de error
      return (<NotFoundPage subTitle = {'Acceso DENEGADO'} stats={'401'}/>);
    }
    return children;
  };