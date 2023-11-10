import './App.css';
import Loginform from './components/Loginform';
import { Route, Routes } from 'react-router-dom';
import Profile from './components/Profile';
import UsersTable from './components/dashborad/UsersTable';
import AddUser from './components/dashborad/AddUser';
import SideNav from './components/dashborad/SideNav';
import NavBar from './components/dashborad/NavBar';
import ItemsTable from './components/dashborad/ItemsTable';
import AddItem from './components/dashborad/AddItem';

function App() {
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
          <Route path="/dashboard" element={<UsersTable />} />
          <Route path="/dashboard/items" element={<ItemsTable />} />
          <Route path="/dashboard/adduser" element={<AddUser />} />
          <Route path="/dashboard/additem" element={<AddItem />} />
        </Routes>
      </div>

    </>
  );
}

export default App;
