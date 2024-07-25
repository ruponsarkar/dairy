import './App.css';
import { useState, useEffect } from 'react';
import { Routes, Route } from "react-router-dom";
import Homepage from './PublicPages/homepage';
import RegisterPage from './PublicPages/registerpage';
import Application from './components/register/application';

import Certificate from './components/approvel/certificate';

import Login from './AdminPages/form/login';
import Dashboard from './AdminPages/dashboard/dashboard';
import DashboardPage from './AdminPages/pages/DashboardPage';

import NewRequest from './AdminPages/pages/newRequest';
import AdminCategory from './AdminPages/pages/category';
import AdminPublisher from './AdminPages/pages/publisher';
import JournalTable from './AdminPages/table/journalTable';
import ContactRequest from './AdminPages/pages/contactRequest';
import Youtubelink from './AdminPages/pages/youtubelink';
import api from './API/api';
import { createContext } from "react";

export const ColorContext = createContext({})


function App() {

  const [user, setUser] = useState('');

  const [colors, setColors] = useState();
  const [bio, setBio] = useState();

  useEffect(() => {
    if (sessionStorage.getItem('user')) {
      setUser('admin')
    } else {
      setUser('public')
    }

  }, [user]);

  // useEffect(() => {
  //   api.getHeadlineColor().then((res) => {
  //     setColors(res.data.headlineColor);
  //     setBio(res.data.bio);
  //     console.log("ffffffffff", res.data.headlineColor);
  //   })
  // }, [])

  return (
    <>
      {/* {user === 'public' &&  */}

      <ColorContext.Provider value={{ colors: colors, setColors: setColors, bio : bio }}>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="RegisterPage" element={<RegisterPage />} />
          {/* <Route path="/Application" element={<Application />} /> */}
          <Route path="Certificate" element={<Certificate />} />
          <Route path="login" element={<Login />} />
        </Routes>

        {/* }  */}
      </ColorContext.Provider>


      {/* {user === 'admin' && */}
        <Routes>
          {/* admin  */}
          <Route path='/admin' element={<Dashboard />}>
            <Route path='/admin' element={<DashboardPage />} />
            <Route path='newRequest' element={<NewRequest />} />
            <Route path='category' element={<AdminCategory />} />
            <Route path='publisher' element={<AdminPublisher />} />
            <Route path='JournalTable' element={<JournalTable />} />
            <Route path='contactRequest' element={<ContactRequest />} />
            <Route path='youtubelink' element={<Youtubelink />} />
            {/* <Route path='addProduct' element={<AddProduct />} /> */}
          </Route>

        </Routes>
      {/* } */}
    </>
  );
}

export default App;
