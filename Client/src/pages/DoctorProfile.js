import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout2';
import '../styles/DoctorProfile.css';
import UserMenu2 from "../components/Layout/UserMenu2";


const Doctorlogin = ({ userId }) => {

    const [userInfo, setUserInfo] = useState({});
    const [userInfoo, setUserInfoo] = useState([]);
    const [doctorDetails, setDoctorDetails] = useState([]);
    const [count, setcount] = useState(0);

    const [acceptedAppointments, setAcceptedAppointments] = useState(() => {
        const storedData = localStorage.getItem('acceptedAppointments');
        return storedData ? JSON.parse(storedData) : [];
    });
    const [rejectedAppointments, setRejectedAppointments] = useState(() => {
        const storedData = localStorage.getItem('rejectedAppointments');
        return storedData ? JSON.parse(storedData) : [];
    });

    const handleAcceptAppointment = async (id, prescription) => {
        try {
            const response = await fetch(`http://localhost:8081/updateAppointmentStatus`, {
                method: 'POST',
                body: JSON.stringify({
                    appointmentId: id,
                    status: 'accepted',
                    prescription: prescription,
                }),
                headers: { "Content-type": "application/json" }
            });
            if (response.ok) {
                // Update local state
                setUserInfoo(prevAppointments =>
                    prevAppointments.map(appointment =>
                        appointment._id === id ? { ...appointment, status: 'accepted', prescription: prescription } : appointment
                    )

                );
                setcount(count + 1);
                // Update acceptedAppointments and localStorage
                setAcceptedAppointments(prevAcceptedAppointments => [...prevAcceptedAppointments, id]);
                localStorage.setItem('acceptedAppointments', JSON.stringify([...acceptedAppointments, id]));
                console.log(`Appointment with id ${id} accepted successfully`);
            } else {
                console.error(`Failed to accept appointment with id ${id}`);
            }
        } catch (err) {
            console.error('Failed to accept appointment:', err);
        }
    };


    const handleRejectAppointment = async (id) => {
        try {
            const response = await fetch(`http://localhost:8081/updateAppointmentStatus`, {
                method: 'POST',
                body: JSON.stringify({
                    appointmentId: id,
                    status: 'rejected',
                }),
                headers: { "Content-type": "application/json" }
            });
            if (response.ok) {
                setUserInfoo(prevAppointments =>
                    prevAppointments.map(appointment =>
                        appointment._id === id ? { ...appointment, status: 'rejected' } : appointment
                    )
                );
                setRejectedAppointments(prevRejectedAppointments => [...prevRejectedAppointments, id]);
                localStorage.setItem('rejectedAppointments', JSON.stringify([...rejectedAppointments, id]));

                console.log(`Appointment with id ${id} rejected successfully`);
            } else {
                console.error(`Failed to reject appointment with id ${id}`);
            }
        } catch (err) {
            console.error('Failed to reject appointment:', err);
        }
    };

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

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await fetch(`http://localhost:8081/doctprofile`, {
                    method: 'POST',
                    body: JSON.stringify({
                        id: localStorage.getItem('id'),
                    }),
                    headers: { "Content-type": "application/json" }
                });
                const data = await response.json();
                setUserInfo(data);
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        }
        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchall = async () => {
            try {
                const response = await fetch("http://localhost:8081/UserPat2", {
                    credentials: "include",
                    headers: {
                        "id": localStorage.getItem('id'),
                    }
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                const data = await response.json();

                console.log(data);
                setUserInfoo(data);
                let c = 0
                data.forEach(async (e) => {
                    if (e.status === "accepted") {
                        c++;
                    }
                })
                setcount(c)
            } catch (error) {
                console.error('Fetch error:', error.message);
            }
        };
        fetchall();

    }, []);



    if (!userInfo) {
        return <div>Loading...</div>;
    }

    const targetSpecialization = userInfo.name;

    const filteredAppointments = [];


    for (let i = 0; i < userInfoo.length; i++) {
        const appointment = userInfoo[i];
        const isAccepted = acceptedAppointments.includes(appointment._id);

        if (appointment.specialization === targetSpecialization) {
            filteredAppointments.push(
                <tr key={appointment.id}>
                    <td>{appointment.reason}</td>
                    <td>{appointment.patientEmail}</td>
                    <td>{appointment.patientName}</td>
                    <td>{appointment.appointmentDate}</td>
                    <td>{appointment.patientPhone}</td>
                    <td>
                        <div className="action-buttons">
                            {!isAccepted && appointment.status !== 'rejected' && (
                                <>
                                    <div style={{ display: 'flex' }}>
                                        <div>
                                            <button
                                                className='mx-3'
                                                style={{ backgroundColor: 'green' }}
                                                onClick={() => {
                                                    handleAcceptAppointment(appointment._id);
                                                }}
                                            >
                                                Accept
                                            </button>
                                        </div>
                                        <div>
                                            <button onClick={() => {
                                                handleRejectAppointment(appointment._id);
                                            }}>
                                                Reject
                                            </button>
                                        </div>
                                    </div>

                                </>
                            )}
                            {isAccepted && <span style={{ color: "green" }}>Accepted</span>}
                            {!isAccepted && appointment.status === 'rejected' && (
                                <span style={{ color: "red" }}>Rejected</span>
                            )}
                        </div>
                    </td>

                </tr>
            );
        }
    }


    const backgroundURL = 'url("https://img.freepik.com/free-photo/simple-blue-white-background-with-text-space_1017-46764.jpg?size=626&ext=jpg&ga=GA1.1.1583734797.1707733052&semt=ais")';

    const b2 = 'url("https://img.freepik.com/free-photo/top-view-stethoscope-heart-with-copy-space_23-2148488221.jpg?size=626&ext=jpg&ga=GA1.1.1583734797.1707733052&semt=ais")';


    const countLabel = (label, count) => (
        <>
            <strong>{count}</strong>
            <span>{label}</span>
        </>
    );

    const CountDisplay = ({ icon, label, count, redirectTo }) => (
        <div className="count-display" style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexDirection: 'column', margin: '10px', padding: '20px', borderRadius: '10px', boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
            height: '30vh', width: '500px', backgroundColor: '#191970', color: 'whitesmoke', cursor: 'pointer'
        }} onClick={() => handleClick(redirectTo)}>
            <i className={icon} style={{ fontSize: '24px', marginBottom: '10px' }}></i>
            {countLabel(label, count)}
        </div>
    );

    const handleClick = (redirectTo) => {
        // Handle click logic here
        console.log('Redirecting to:', redirectTo);
    };




    const userCount = count;
    const orderCount = filteredAppointments.length;
    const doctorCount = doctorDetails.length;

    return (
        <Layout>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu2 />
                    </div>
                    <div className="col-md-9">

                        <div className="doctor-banner" style={{ backgroundImage: b2, backgroundSize: 'cover', backgroundRepeat: 'no-repeat' }}>
                            <div className="doctor-banner-content">
                                <h1>Hello Dr.{userInfo.name}</h1>
                                <p>Here are your important tasks and reports.</p>
                                <p>Please check the next appointment.</p>
                            </div>
                        </div>

                        <div style={{ display: 'flex', marginTop: '40px', justifyContent: 'space-between' }}>
                            <CountDisplay icon="fas fa-user-injured float-start" label="Total Patients" count={userCount} />
                            <CountDisplay icon="fas fa-user-plus fa-2x" label="Total Appointments" count={orderCount} />
                            {/* <CountDisplay icon="fas fa-box" label="Products" count={productCount} redirectTo="/dashboard/admin/products" /> */}
                            <CountDisplay icon="fas fa-user-md" label="Available Doctors" count={doctorCount} />
                        </div>

                        <br />
                        <br />


                        <div className="appointments-container1">
                            <h3>Appointments</h3>
                            <table className="appointments-table1">
                                <thead>
                                    <tr>
                                        <th>Reason</th>
                                        <th>Email</th>
                                        <th>Patient Name</th>
                                        <th>Date</th>
                                        <th>Phone Number</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredAppointments.length > 0 ? (
                                        filteredAppointments
                                    ) : (
                                        <tr>
                                            <td colSpan="6" className="no-appointments">No appointments found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    );
};

export default Doctorlogin;


