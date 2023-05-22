import { Divider } from 'antd';
import { useContext, useEffect, useState, createContext } from 'react';
import { useParams, useNavigate } from 'react-router';
import { UserCard } from './components/UserCard/UserCard';
import { Spin } from 'antd';
import './Profile.scss';
import { GlobalContext } from '../../context/UserContext/UsersState';
import { getEmployeeByID } from '../../service/employeService/employeeService';
import MyTabs from '../MyTabs/MyTabs';

export const ProfileContext = createContext();

export const Profile = () => {
  const { user ,getUserInfo} = useContext(GlobalContext);
  const { userId } = useParams();
  const [userData, setUserData] = useState();
  const [isLoading, setLoading] = useState(false);
  const navigate = useNavigate();
useEffect(()=>{
  getUserInfo(1,1,1,1)
},[])

  useEffect(() => {
    async function getData() {
    
      console.log('soy el user',user?._id)
      setLoading(true);
      if (!userId) return navigate('/profile/' + user?._id);
      const response = await getEmployeeByID(user?._id);
      if (!response) return navigate('/empleados');
      setUserData(response);
      setLoading(false);
    };
    getData();
  }, [userId])

  return (
    <ProfileContext.Provider value={{ userData, setUserData }}>
      <Spin spinning={isLoading}>
        <div className='profile-container'>
          <UserCard />
          <Divider plain />
         <MyTabs/>
        </div>
      </Spin>
    </ProfileContext.Provider>
  );
};
