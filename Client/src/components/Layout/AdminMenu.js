import React from "react";
import { NavLink } from "react-router-dom";
const AdminMenu = () => {
  const style = {
    height: 'calc(100vh - 87px)',
    width: '360px',
    position: 'fixed',
    zIndex: '1',
    top: '85px',
    left: '0',
    backgroundColor: 'black',
    color: 'white',
    overflowX: 'hidden',
    paddingTop: '30px',
  };

  const linkStyle = {
    display: 'flex',
    alignItems: 'center',
    color:'white',
    justifyContent: 'center',
    height: 'calc((100vh - 100px) / 7)', // Adjust based on the number of links
  };
  return (
    <>
      <div className="text-center">
        <div className="list-group" style={style} >
          <h4>ADMIN DASHBOARD</h4>
          <NavLink
            to="/dashboard/admin/create-product"
            style={linkStyle}
          >
            Add-Medicine
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            style={linkStyle}
          >
            Medicines
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            style={linkStyle}
          >
            All-Orders
          </NavLink>
          <NavLink
            to="/dashboard/admin/users"
            style={linkStyle}
          >
            USERS
          </NavLink>
          <NavLink
            to="/dashboard/admin/labreport"
            style={linkStyle}
          >
            LabReports
          </NavLink>
          <NavLink
            to="/dashboard/admin/doctorfeed"
            style={linkStyle}
          >
            Doctors
          </NavLink>
          <NavLink
            to="/dashboard/admin/chat"
            style={linkStyle}
          >
            Chat
          </NavLink>
        </div>
      </div>
    </>
  );
};

export default AdminMenu;