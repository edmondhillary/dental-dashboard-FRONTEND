import { Divider, Spin } from "antd";
import { useContext, useEffect, useState, createContext } from "react";
import { useParams, useNavigate } from "react-router";
import { UserCard } from "./components/UserCard/UserCard";
import "./Profile.scss";
import { GlobalContext } from "../../context/UserContext/UsersState";
import { getEmployeeByID } from "../../service/employeService/employeeService";
import MyTabs from "../MyTabs/MyTabs";
import { LoadingOutlined } from '@ant-design/icons';

export const ProfileContext = createContext();

const loadingIcon = <LoadingOutlined style={{ fontSize: 54 , fontWeight:'700'}} spin />;

export const Profile = () => {
  const { user, getUserInfo } = useContext(GlobalContext);
  const { userId } = useParams();
  const [userData, setUserData] = useState();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    getUserInfo(1, 1, 1, 1);
  }, []);

  useEffect(() => {
    async function getData() {
      console.log("soy el user", user?._id);
      setLoading(true);
      if (!userId) return navigate("/profile/" + user?._id);
      const response = await getEmployeeByID(userId);
      if (!response) return navigate("/empleados");
      setUserData(response);
      setLoading(false);
    }
    getData();
  }, [userId]);

  return (
    isLoading
    ? <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', height: '100vh' , margin:'12rem'}}>
        <Spin indicator={loadingIcon} />
      </div>
    : <ProfileContext.Provider value={{ userData, setUserData }}>
        <div className='profile-container'>
          <UserCard />
          <Divider plain />
          <MyTabs />
        </div>
      </ProfileContext.Provider>
  );
};
