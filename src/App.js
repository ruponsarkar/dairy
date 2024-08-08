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
    </>
  );
}

export default App;
