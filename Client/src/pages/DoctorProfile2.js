import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout/Layout2';
import '../styles/DoctorProfile2.css';
import UserMenu2 from "../components/Layout/UserMenu2";


const Doctorlogin = ({ userId }) => {
    const [userInfo, setUserInfo] = useState({});

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



    if (!userInfo) {
        return <div>Loading...</div>;
    }

    const backgroundURL = 'url("https://img.freepik.com/free-photo/simple-blue-white-background-with-text-space_1017-46764.jpg?size=626&ext=jpg&ga=GA1.1.1583734797.1707733052&semt=ais")';

    return (
        <Layout>
            <div className="container-fluid p-3">
                <div className="row">
                    <div className="col-md-3">
                        <UserMenu2 />
                    </div>
                    <div className="col-md-9">
                        <div className="doctor-profile-page1">
                            <div className="doctor-profile-page1">
              
                                <div className="doctor-profile-container1" style={{ backgroundImage: backgroundURL, backgroundSize: 'cover', backgroundPosition: 'center' }}>
                                    <h2 >Doctor Profile</h2>
                                    <div className="doctor-info1">
                                        <div className="profile-image1" >
                                            {userInfo.profileImage && (
                                                <img
                                                    src={`http://localhost:8081/uploads/${userInfo.profileImage}`}
                                                    alt=""
                                                    className="img-fluid"
                                                />
                                            )}
                                        </div>
                                        <div className="text-content1">
                                            <div className="info-line">
                                                <p><strong>Name:</strong>{userInfo.name}</p>
                                                <p><strong>Email:</strong> {userInfo.email}</p>
                                            </div>
                                            <div className="info-line">
                                                <p><strong>Specialization:</strong> {userInfo.specialization}</p>
                                                <p><strong>Phone Number:</strong> {userInfo.phoneNumber}</p>
                                            </div>
                                            <div className="info-line">
                                                <p><strong>Address:</strong> {userInfo.address}</p>
                                                <p><strong>Experience:</strong> {userInfo.experience}</p>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default Doctorlogin;



