import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Layout from '../components/Layout/Layout';
import Doctorcard from './Doctorcard';
import "../styles/Doctorcard.css"
import { useAuth } from '../context/auth';

const Doctor = () => {
  const [doctorDetails, setDoctorDetails] = useState([]);
  const [auth] = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchall = async () => {
      try {
        const response = await fetch("http://localhost:8081/doctordet", {
          credentials: "include",
        });
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log(data);
        setDoctorDetails(data);
      } catch (error) {
        console.error('Fetch error:', error.message);
      }
    };
    fetchall();
  }, []);

  // useEffect(()=>{
  //   const response = await fetch(
  //     "http://localhost:8081/login",
  //     {
  //       method: "POST",
  //       body: JSON.stringify({ email, password }),
  //       headers: { "Content-Type": "application/json" },
  //     }
  //   );
  //   const data = await response.json();
  //   localStorage.id = data.id;
  //   if (response.status === 200) {
  //     navigate("/doctorprofile");
  //   } else {
  //     alert("wrong credientials");
  //   }
  // } catch (err) {
  //   console.log(err);
  // }
  // }, [])

  const filteredAppointments = [];
  for (let i = 0; i < doctorDetails.length; i++) {
    const appointment = doctorDetails[i];
    {appointment.status === "Accepted" && 
      filteredAppointments.push(
        <div className="col-md-3 mb-4">
          <Doctorcard name={appointment.name} spec={appointment.specialization} desc={appointment.description} img={`http://localhost:8081/uploads/${appointment.profileImage}`} />
        </div>
      );
    }
  }

  const emialll = auth?.user?.email;

  const handleClick = async () => {
    try {
      const response = await fetch(
          "http://localhost:8081/login",
          {
            method: "POST",
            body: JSON.stringify({ email: emialll }),
            headers: { "Content-Type": "application/json" },
          }
        );
        const data = await response.json();
        localStorage.id = data.id;
        if (response.status === 200) {
          navigate("/doctorprofile");
        } else {
          alert("wrong credientials");
        }
      } catch (err) {
        console.log(err);
      }
  };



  const renderLink = () => {
    const user = auth?.user;
    if (!user || user.email === "admin@gmail.com") {
      return <p></p>;
    }
    const { email } = user;
    for (let i = 0; i < doctorDetails.length; i++) {
      const appointment = doctorDetails[i];
      if (appointment.email === email && appointment.status === "Accepted") {
        return <Link className="button-three" to="../doctorprofile" onClick={handleClick}>Doctor Portal</Link>;
      }
    }
    return <Link className="button-three" to="../d2">Join Us</Link>;   
  };


  return (
    <Layout>
      <div>
        <br />
        <h1 style={{ textAlign: "center", textDecoration: "underline", color: "#32609e" }}>Our Doctors</h1>
        <p style={{ textAlign: "center", color: "#4fb5e6" }}>“Wherever the art of medicine is loved, there is also a love for humanity.”</p>
        <br />
        <div className="sub-main">
          {/* {auth?.user?.email && auth?.user?.email !== "admin@gmail.com" ? (
            <Link className="button-three" to="../d2">Join Us</Link>
          ) : (
            <p></p>
          )} */}
            {renderLink()}
        </div>

        <br />
        <hr />
        <br />
        <div className="row" style={{maxWidth:'98%'}}>
        {filteredAppointments.length > 0 ? (
          filteredAppointments
        ) : (
          <tr>
            <td colSpan="6" className="no-appointments">No appointments found</td>
          </tr>
        )}
        </div>

        <br /><br />
        <hr /><br />

        <br /><br /><br />

      </div>
    </Layout>
  );
};

export default Doctor;

