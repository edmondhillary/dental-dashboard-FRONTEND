import { useRoutes } from 'react-router-dom';
import Employees from '../Components/Employees/Employees';
import Patients from '../Components/Patients/Patients';
import Treatments from '../Components/Treatments/Treatments';
import Appointments from '../Components/Appointments/Appointments';
import Budgets from '../Components/Budgets/Budgets';
import { PrivateZone } from '../guards/PrivateZone';
import { Profile } from '../Components/Profile/Profile';
import PatientProfile from '../Components/Patients/PatientProfile';
import CitasChart from '../Components/Charts/CitasChart';
import Charts from '../Components/Charts/Charts';
import UnpaidPatientsTable from '../Components/Morosos/UnpaidPatients';

import { SuperAdminZone } from '../guards/SuperAdminZone';
import { AdminZone } from '../guards/AdminZone';
import { NotFoundPage } from '../Components/404/NotFoundPage';

export const Routes = () => {
  return useRoutes(

        [
            
              {
                 element:<PrivateZone><Profile/></PrivateZone> ,
                path: '/profile/:userId'
              },
              {
                element:<PrivateZone><Employees/></PrivateZone> ,
                path: '/empleados'
              },
              {
                element:<PrivateZone><Patients/></PrivateZone> ,
                path: '/pacientes'
              },
              {
                element:<PrivateZone><PatientProfile/></PrivateZone> ,
                path: '/pacientes/:patientId'
              },
              {
                element:<PrivateZone><Treatments/></PrivateZone> ,
                path: '/tratamientos'
              },
              {
                element:<PrivateZone><Appointments/></PrivateZone> ,
                path: '/citas'
              },
              {
                element:<PrivateZone><SuperAdminZone><Budgets/></SuperAdminZone></PrivateZone> ,
                path: '/presupuestos'
              },
              {
                element:<PrivateZone><SuperAdminZone><Charts/></SuperAdminZone></PrivateZone> ,
                path: '/charts'
              },
              {
                element:<PrivateZone><AdminZone><UnpaidPatientsTable/></AdminZone></PrivateZone> ,
                path: '/morosos'
              },
              {
                path: '*',
                element: <NotFoundPage subTitle={'La URL no EXISTE, pero TERUEL .... SÍ'} stats={'404'} />
              }
        ]
        );

}