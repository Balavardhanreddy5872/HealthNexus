import { useAuth } from "../../context/auth";
import AdminMenu from "../../components/Layout/AdminMenu";
import Layout2 from "../../components/Layout/Layout2";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";


const Admindashboard = () => {
  const [auth] = useAuth();
  const [orderCount, setOrderCount] = useState(0);
  const [userCount, setUserCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const navigate = useNavigate();

  const handleClick = (redirectTo) => {
    navigate(redirectTo);
  };

  const CountDisplay = ({ icon, label, count, redirectTo }) => (

    <div className="count-display" style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      flexDirection: 'column', margin: '10px', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      height: '30vh', width: '500px', backgroundColor: '#191970', color: 'whitesmoke', cursor:'pointer'
    }} onClick={() => handleClick(redirectTo)}>
      <i className={icon} style={{ fontSize: '24px', marginBottom: '10px' }}></i>
      <strong>{count}</strong>
      <span>{label}</span>
    </div>
  );

  useEffect(() => {
    // Fetch order count
    axios.get('http://localhost:8081/api/auth/ordercount')
      .then(response => setOrderCount(response.data.totalCount))
      .catch(error => console.error('Error fetching order count', error));

    // Fetch user count
    axios.get('http://localhost:8081/api/auth/userscount')
      .then(response => setUserCount(response.data.totalCount))
      .catch(error => console.error('Error fetching user count', error));

    // Fetch product count
    axios.get('http://localhost:8081/api/product/productcount')
      .then(response => setProductCount(response.data.totalCount))
      .catch(error => console.error('Error fetching product count', error));
  }, []);

  return (
    <Layout2>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu />
          </div>
          <div className="col-md-9" style={{ minHeight: '90vh',fontFamily:'cursive' }}>
            <div style={{ display: 'flex', marginTop: '40px', justifyContent: 'space-between' }}>
              <CountDisplay icon="fas fa-users" label="Users" count={userCount} redirectTo="/dashboard/admin/users" />
              <CountDisplay icon="fas fa-shopping-cart" label="Orders" count={orderCount} redirectTo="/dashboard/admin/orders" />
              <CountDisplay icon="fas fa-box" label="Products" count={productCount} redirectTo="/dashboard/admin/products" />
              <CountDisplay icon="fas fa-user-md" label="Doctors" count={userCount} redirectTo="/dashboard/admin/orders" />
            </div>
            <br/>
            <br/>
            <div className="card w-75 p-3" style={{backgroundColor:'antiquewhite' , marginLeft:'120px'}}>
              <h3> Name : {auth?.user?.name}</h3>
              <h3> Email : {auth?.user?.email}</h3>
              <h3> contact : {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout2>
  );
};

export default Admindashboard;
