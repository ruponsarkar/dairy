import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Homepage from './PublicPages/homepage';
import RegisterPage from './PublicPages/registerpage';

import Certificate from './components/approvel/certificate';

import Login from './AdminPages/form/login';
import Dashboard from './AdminPages/dashboard/dashboard';
import DashboardPage from './AdminPages/pages/DashboardPage';

import NewRequest from './AdminPages/pages/newRequest';
import AdminManagement from './AdminPages/pages/adminManegement';
import PaymentPage from './AdminPages/payment/paymentPage';
import MasterTable from './AdminPages/pages/masterTable';

import UserDashboard from './userPage/userDashboard';
import UserCertificate from './userPage/userCertificate';





import ApplyForm from './userPage/applyForm';
import UserDashboardTable from './userPage/dashboardTable';
import Grievance from './userPage/grievance';




import { createContext } from "react";

export const ColorContext = createContext({})


function App() {

  const [user, setUser] = useState('');

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      setUser('admin')
    } else {
      setUser('public')
    }

  }, [user]);


  return (
    <>
      {/* {user === 'public' &&  */}

      <ColorContext.Provider value={{ data: ''}}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="RegisterPage" element={<RegisterPage />} />
          {/* <Route path="/Application" element={<Application />} /> */}
          <Route path="Certificate" element={<Certificate />} />
          <Route path="login" element={<Login />} />



          {/* <Route path='user-panel' element={<UserDashboard />} />
          <Route path='download-Certificate' element={<Certificate />} />
          <Route path='apply-certificate' element={<ApplyForm />} />
          <Route path='UserDashboardTable' element={<UserDashboardTable />} /> */}
        </Routes>

        {/* }  */}
      </ColorContext.Provider>

      {user === 'public' && 
      <Routes>
        <Route path="admin/*" element={<Login />} />
        
      </Routes>
      }


      {user === 'admin' &&
        <Routes>
          {/* admin  */}
          <Route path='/admin' element={<Dashboard />}>
            
            <Route path='/admin' element={<DashboardPage />} />
            <Route path='newRequest' element={<NewRequest />} />
            <Route path='AdminManagement' element={<AdminManagement />} />
            <Route path='PaymentPage' element={<PaymentPage />} />
            <Route path='MasterTable' element={<MasterTable />} />

          </Route>

        </Routes>
      }

        <Routes>
          {/* admin  */}
          <Route path='/user-panel' element={<UserDashboard />}>
            <Route path='/user-panel' element={<UserDashboard />} />
            <Route path='download-Certificate' element={<UserCertificate />} />
            <Route path='subsidy' element={<ApplyForm />} />
            <Route path='UserDashboardTable' element={<UserDashboardTable />} />
            <Route path='grievance' element={<Grievance />} />

          </Route>

        </Routes>
    </>
  );
}

export default App;
