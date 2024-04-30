import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Aboutus from "./pages/Aboutus";
import Pagenotfound from "./pages/Pagenotfound";
import Medicine from "./pages/Medicine";
import Doctor from "./pages/Doctor";
import Labtest from "./pages/Labtest";
import Contact from "./pages/Contactus";
import Register from "./pages/Auth/Register";
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/user/Dashboard";
import PrivateRoute from "./components/Routes/Private";
import AdminRoute from "./components/Routes/AdminRoute";
import Admindashboard from "./pages/Admin/Admindashboard";
import Addmedicine from "./pages/Admin/Addmedicine";
import Users from "./pages/Admin/User";
import Doctorlogin from "./pages/Doctorlogin";
import DoctorProfile from "./pages/DoctorProfile";
import DoctPatient from "./pages/DoctPatient";
import D2 from "./pages/d2";
import Doctorreg from "./pages/Doctorreg";
import Profile from "./pages/user/Profile";
import Orders from "./pages/user/Orders"
import Chat2 from "./pages/user/Chat"
import Doctorsapp from "./pages/user/Doctorsapp";
import LabTests from "./pages/user/LabTests";
import Products from "./pages/Admin/Product";
import UpdateProduct from "./pages/Admin/Updateproduct";
import Search from "./pages/Search";
import Productdetails from "./pages/Productdetails";
import Cart from "./pages/Cart";
import AdminOrders from "./pages/Admin/Adminorders";
import Labreport from "./pages/Admin/Labreport";
import Chat from "./pages/Admin/Chat";
import Doctorfeed from "./pages/Admin/doctorfeed";
import Dprofile from "./pages/Dprofile";


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/productdetails/:slug" element={<Productdetails />} />
        <Route path="/dashboard" element={<PrivateRoute />}>
          <Route path="user" element={<Dashboard />} />
          <Route path="user/orders" element={<Orders />} />
          <Route path="user/profile" element={<Profile />} />
          <Route path="user/app" element={<Doctorsapp />} />
          <Route path="user/lab" element={<LabTests />} />
          <Route path = "user/chat" element={ <Chat2 />} />
        </Route>
        <Route path="/dashboard" element={<AdminRoute />}>
          <Route path="admin" element={<Admindashboard />} />
          <Route path="admin/create-product" element={<Addmedicine />} />
          <Route path="admin/users" element={<Users />} />
          <Route path="admin/products" element={<Products />} />
          <Route path="admin/product/:slug" element={<UpdateProduct />} />
          <Route path="admin/orders" element={<AdminOrders />} />
          <Route path = "admin/labreport" element={<Labreport /> }/>
          <Route path="admin/chat" element={<Chat />} />
          <Route path="admin/doctorfeed" element={<Doctorfeed />} />
          <Route path="admin/chat" element={<Chat />} />

        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/aboutus" element={<Aboutus />} />
        <Route path="*" element={<Pagenotfound />} />
        <Route path="/medicine" element={<Medicine />} />
        <Route path="/search" element={<Search />} />
        <Route path="/doctor" element={<Doctor />} />
        <Route path="/labtests" element={<Labtest />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/doctorlogin" element={<Doctorlogin />} />
        <Route path="/doctorprofile" element={<DoctorProfile />} />
        <Route path="/doctorreg" element={<Doctorreg />} />
        <Route path="/doctorpatient" element={<DoctPatient />} />
        <Route path="/d2" element={<D2 />} />
        <Route path="/updateprofile" element={<Dprofile />} />
      </Routes>
    </>
  );
}

export default App;
