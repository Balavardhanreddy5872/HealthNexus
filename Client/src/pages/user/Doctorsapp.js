import React, { useState, useEffect } from 'react';
import UserMenu from '../../components/Layout/UserMenu';
import Layout2 from '../../components/Layout/Layout2';
import './doct.css';
import { useAuth } from '../../context/auth';


const Doctorsapp = () => {
  const [userInfoo, setUserInfoo] = useState([]);
  const [auth] = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8081/UserPat3', {
          credentials: 'include',
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log('Data from API:', data);

        // Check if data is an array before filtering
        if (Array.isArray(data)) {
          const filteredAppointments = data.filter(
            (user) => auth?.user?.email === user.patientEmail
          );
          setUserInfoo(filteredAppointments);
        } else {
          console.error('Data is not an array:', data);
          // Handle unexpected data format
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle fetch error
      }
    };
    fetchData();
  }, [auth?.user?.email]);

  const handleStatusDisplay = (status) => {
    switch (status) {
      case 'accepted':
        return <span style={{ color: 'green' }}>Accepted</span>;
      case 'rejected':
        return <span style={{ color: 'red' }}>Rejected</span>;
      default:
        return 'Pending';
    }
  };

  return (
    <Layout2>
      <div className="container-fluid p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className="user-account-page">
              <div className="user-appointments-container">
                <h2>My Appointments</h2>
                <table className="user-appointments-table">
                  <thead>
                    <tr>
                      <th>Email</th>
                      <th>Patient Name</th>
                      <th>Doctor</th>
                      <th>Date</th>
                      <th>Phone number</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {userInfoo.map((user, index) => (
                      <tr key={index}>
                        <td>{user.patientEmail}</td>
                        <td>{user.patientName}</td>
                        <td>{user.specialization}</td>
                        <td>{user.appointmentDate}</td>
                        <td>{user.patientPhone}</td>
                        <td>{handleStatusDisplay(user.status)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout2>
  );
};

export default Doctorsapp;
