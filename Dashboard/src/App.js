import './App.css';
import RegisterForm from './components/RegisterForm';
import Loginform from './components/Loginform';
import { Route, Routes } from 'react-router-dom';
import Profile from './components/Profile';
// import { useState } from 'react';
// import SideNav from './components/dashborad/SideNav';
import UsersTable from './components/dashborad/UsersTable';
// import Home from './components/dashborad/Home';
import AddUser from './components/dashborad/AddUser';
import SideNav from './components/dashborad/SideNav';
import NavBar from './components/dashborad/NavBar';
import ItemsTable from './components/dashborad/ItemsTable';
import OrdersTable from './components/dashborad/OrdersTable';
import AddItem from './components/dashborad/AddItem';

function App() {


  // const receivedData = (data) => {
  //   setId(data);
  // };

  return (
    <>
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/" element={<Loginform />} />

      </Routes>



      <NavBar />
      <div className="App" style={{ display: "flex" }}>
        <SideNav />
        <Routes>
          {/* <Route path="/allusers" element={<UsersTable />} /> */}
          <Route path="/dashboard" element={<UsersTable />} />
          <Route path="/dashboard/items" element={<ItemsTable />} />
          <Route path="/dashboard/odres" element={<OrdersTable />} />
          <Route path="/dashboard/adduser" element={<AddUser />} />
          <Route path="/dashboard/additem" element={<AddItem />} />
        </Routes>
      </div>

    </>
  );
}

export default App;
