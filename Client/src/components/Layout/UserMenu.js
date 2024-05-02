import React from 'react'
import { NavLink } from "react-router-dom";

const UserMenu = () => {
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
    <div>
      <div className="text-center">
        <div className="list-group" style={style}>
          <h4>Dashboard</h4>
          <NavLink
            to="/dashboard/user/profile"
            style={linkStyle}           
          >
            Profile
          </NavLink>
          <NavLink
            to="/dashboard/user/orders"
            style={linkStyle}
          >
            Orders
          </NavLink>
          <NavLink
            to="/dashboard/user/lab"
            style={linkStyle}
          >
            LabTests
          </NavLink>
          <NavLink
            to="/dashboard/user/app"
            style={linkStyle}
          >
            Doctors-app
          </NavLink>
          <NavLink
            to="/dashboard/user/chat"
            style={linkStyle} 
          >
            chat
          </NavLink>
        </div>
      </div>
    </div>
  )
}

export default UserMenu
